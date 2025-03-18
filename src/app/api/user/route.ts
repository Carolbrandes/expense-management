import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        // Extract filter parameters
        const description = searchParams.get('description');
        const category = searchParams.get('category');
        const type = searchParams.get('type');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const sortBy = searchParams.get('sortBy');
        const sortOrder = searchParams.get('sortOrder');

        // Extract selectedTheme from query parameters
        const selectedTheme = searchParams.get('selectedTheme');

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        // Convert userId to number
        const userIdNumber = Number(userId);
        if (isNaN(userIdNumber)) {
            return NextResponse.json({ error: 'Invalid User ID' }, { status: 400 });
        }

        // Build the filter object
        const filter = {} as IFilter;
        if (description) filter.description = description;
        if (category) filter.category = category;
        if (type) filter.type = type;
        if (startDate) filter.startDate = startDate;
        if (endDate) filter.endDate = endDate;

        // Build the sorting object
        const orderBy = sortBy ? { [sortBy]: sortOrder || 'asc' } : undefined;

        // Fetch user data with filtered transactions
        const user = await prisma.user.findUnique({
            where: { id: userIdNumber },
            select: {
                id: true,
                email: true,
                currency: true,
                createdAt: true,
                categories: true,
                selectedTheme: true, // Now recognized by TypeScript
                transactions: {
                    where: {
                        ...(filter.description && { description: { contains: filter.description } }),
                        ...(filter.category && { category: filter.category }),
                        ...(filter.type && { type: filter.type }),
                        ...(filter.startDate &&
                            filter.endDate && {
                            date: {
                                gte: new Date(filter.startDate),
                                lte: new Date(filter.endDate),
                            },
                        }),
                    },
                    orderBy: orderBy,
                },
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // If selectedTheme is provided in query params, update the user's selectedTheme
        if (selectedTheme) {
            await prisma.user.update({
                where: { id: userIdNumber },
                data: { selectedTheme }, // Now recognized by TypeScript
            });

            // Fetch the updated user data
            const updatedUser = await prisma.user.findUnique({
                where: { id: userIdNumber },
                select: {
                    id: true,
                    email: true,
                    currency: true,
                    createdAt: true,
                    categories: true,
                    selectedTheme: true, // Now recognized by TypeScript
                    transactions: {
                        where: {
                            ...(filter.description && { description: { contains: filter.description } }),
                            ...(filter.category && { category: filter.category }),
                            ...(filter.type && { type: filter.type }),
                            ...(filter.startDate &&
                                filter.endDate && {
                                date: {
                                    gte: new Date(filter.startDate),
                                    lte: new Date(filter.endDate),
                                },
                            }),
                        },
                        orderBy: orderBy,
                    },
                },
            });

            return NextResponse.json(updatedUser);
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('🚀 ~ GET /api/user error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// * create or update
export async function PUT(req: Request) {
    try {
        const body = await req.json();
        console.log("🚀 ~ PUT request received with body:", body);

        const { id, transactions, categories, currency, selectedTheme } = body;

        // Validate userId
        if (!id) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        const userIdNumber = Number(id);
        if (isNaN(userIdNumber)) {
            return NextResponse.json({ error: 'Invalid User ID' }, { status: 400 });
        }

        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { id: userIdNumber },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Update or create transactions
        if (transactions) {
            for (const transaction of transactions) {
                if (transaction.id) {
                    // Update existing transaction
                    await prisma.transaction.update({
                        where: { id: transaction.id },
                        data: transaction,
                    });
                } else {
                    // Create new transaction
                    await prisma.transaction.create({
                        data: {
                            ...transaction,
                            userId: userIdNumber, // Associate with the user
                        },
                    });
                }
            }
        }

        // Update or create categories
        if (categories) {
            for (const category of categories) {
                if (category.id) {
                    // Update existing category
                    await prisma.category.update({
                        where: { id: category.id },
                        data: category,
                    });
                } else {
                    // Create new category
                    await prisma.category.create({
                        data: {
                            name: category.name, // Make sure "name" exists
                            userId: userIdNumber, // Associate with user
                        },
                    });
                }
            }
        }

        // Update currency if provided
        if (currency) {
            const updatedCurrency = await prisma.currency.update({
                where: { id: currency.id },
                data: currency,
            });
            console.log("🚀 ~ PUT ~ updatedCurrency:", updatedCurrency);
        }

        // Update selectedTheme if provided
        if (selectedTheme) {
            await prisma.user.update({
                where: { id: userIdNumber },
                data: { selectedTheme },
            });
        }

        // Fetch the updated user data
        const updatedUser = await prisma.user.findUnique({
            where: { id: userIdNumber },
            include: {
                transactions: true,
                categories: true,
                currency: true,
            },
        });

        return NextResponse.json({
            message: 'User updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        console.error('🚀 ~ PUT ~ error:', error);
        return NextResponse.json({ error: 'Error updating user data' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const { id, categoryId, transactionId, deleteAllCategories, deleteAllTransactions } = body;

        // Validate userId
        if (!id) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        const userIdNumber = Number(id);
        if (isNaN(userIdNumber)) {
            return NextResponse.json({ error: 'Invalid User ID' }, { status: 400 });
        }

        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { id: userIdNumber },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Delete specific category
        if (categoryId) {
            await prisma.category.delete({
                where: { id: categoryId, userId: userIdNumber },
            });
            return NextResponse.json({
                message: 'Category deleted successfully',
            });
        }

        // Delete all categories
        if (deleteAllCategories) {
            await prisma.category.deleteMany({
                where: { userId: userIdNumber },
            });
            return NextResponse.json({
                message: 'All categories deleted successfully',
            });
        }

        // Delete specific transaction
        if (transactionId) {
            await prisma.transaction.delete({
                where: { id: transactionId, userId: userIdNumber },
            });
            return NextResponse.json({
                message: 'Transaction deleted successfully',
            });
        }

        // Delete all transactions
        if (deleteAllTransactions) {
            await prisma.transaction.deleteMany({
                where: { userId: userIdNumber },
            });
            return NextResponse.json({
                message: 'All transactions deleted successfully',
            });
        }

        // If no valid deletion option is provided
        return NextResponse.json({ error: 'No valid deletion option provided' }, { status: 400 });
    } catch (error) {
        console.error('🚀 ~ DELETE ~ error:', error);
        return NextResponse.json({ error: 'Error deleting user data' }, { status: 500 });
    }
}