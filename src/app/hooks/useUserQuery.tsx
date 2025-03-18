'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from './useAuthContext';

// Fetch user data with filters
const fetchUser = async (userId: string, filters: IFilter): Promise<IUser> => {
    // Build the query string with filters
    const queryParams = new URLSearchParams();
    if (filters.description) queryParams.set('description', filters.description);
    if (filters.category) queryParams.set('category', filters.category);
    if (filters.type) queryParams.set('type', filters.type);
    if (filters.startDate) queryParams.set('startDate', filters.startDate);
    if (filters.endDate) queryParams.set('endDate', filters.endDate);
    if (filters.sortBy) queryParams.set('sortBy', filters.sortBy);
    if (filters.sortOrder) queryParams.set('sortOrder', filters.sortOrder);

    const response = await fetch(`/api/user?userId=${userId}&${queryParams.toString()}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }
    const respJson = await response.json();

    return respJson;
};

// Update user data (transactions, categories, currency)
const updateUser = async (updates: Partial<IUser>) => {
    try {
        const response = await fetch(`/api/user`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updates), // Send only the updated fields
        });

        if (!response.ok) {
            throw new Error("Failed to update user");
        }

        const data = await response.json();
        console.log("Updated user from API:", data);
        return data; // Return the updated user data
    } catch (error) {
        console.error("Error updating user:", error);
    }
};

// Delete user transactions and categories
const deleteUserData = async (
    userId: string,
    options: {
        categoryId?: number;
        transactionId?: number;
        deleteAllCategories?: boolean;
        deleteAllTransactions?: boolean;
    }
): Promise<void> => {
    const response = await fetch('/api/user', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: userId,
            ...options,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to delete user data');
    }
};

export const useUserQuery = () => {
    const { userId } = useAuth();
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const router = useRouter();

    // Extract filters from the URL
    const filters = {
        description: searchParams.get('description') || undefined,
        category: searchParams.get('category') || undefined,
        type: searchParams.get('type') || undefined,
        startDate: searchParams.get('startDate') || undefined,
        endDate: searchParams.get('endDate') || undefined,
        sortBy: searchParams.get('sortBy') || undefined,
        sortOrder: searchParams.get('sortOrder') || undefined,
    };

    // Fetch user data with filters
    const {
        data: user = {
            id: 0,
            email: '',
            currency: { name: 'Dólar Americano', acronym: 'USD' },
            categories: [],
            transactions: [],
            createdAt: new Date,
            verificationCodes: [
                {
                    id: 0,
                    expiresAt: new Date,
                    userId: 0,
                    code: "",
                    createdAt: Date,
                    expired: false,
                    user: {} as IUser,
                }
            ],
            selectedTheme: 'light'
        },
        isLoading: isUserLoading,
        error: userError,
    } = useQuery({
        queryKey: ['user', userId, filters], // Include filters in the query key
        queryFn: () => (userId ? fetchUser(userId, filters) : Promise.reject(new Error('User ID is required'))),
        enabled: !!userId,
    });

    // Update user mutation
    const {
        mutate: updateUserMutation,
        status: updateUserStatus,
        error: updateUserError,
    } = useMutation({
        mutationFn: async (updates: Partial<IUser>) => {
            if (!userId) {
                return Promise.resolve(null);
            }
            return updateUser({ id: +userId, ...updates }); // Ensure userId is always included
        },
        onMutate: async (updates) => {
            await queryClient.cancelQueries({ queryKey: ['user', userId] });

            const previousUserData = queryClient.getQueryData(['user', userId]);

            queryClient.setQueryData(['user', userId], (old: IUser) => ({
                ...old,
                ...updates, // Merge only updated fields
            }));

            return { previousUserData };
        },
        onError: (err, updates, context) => {
            queryClient.setQueryData(['user', userId], context?.previousUserData);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['user', userId] });
        },
    });

    // Delete user data mutation
    const {
        mutate: deleteUserDataMutation,
        status: deleteUserDataStatus,
        error: deleteUserDataError,
    } = useMutation({
        mutationFn: (options: {
            categoryId?: number;
            transactionId?: number;
            deleteAllCategories?: boolean;
            deleteAllTransactions?: boolean;
        }) => {
            if (!userId) {
                return Promise.resolve(null);
            }
            return deleteUserData(userId, options);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user', userId] });
        },
    });

    // Function to update filters in the URL
    const updateFilters = (newFilters: IFilter) => {
        const queryParams = new URLSearchParams();
        if (newFilters.description) queryParams.set('description', newFilters.description);
        if (newFilters.category) queryParams.set('category', newFilters.category);
        if (newFilters.type) queryParams.set('type', newFilters.type);
        if (newFilters.startDate) queryParams.set('startDate', newFilters.startDate);
        if (newFilters.endDate) queryParams.set('endDate', newFilters.endDate);
        if (newFilters.sortBy) queryParams.set('sortBy', newFilters.sortBy);
        if (newFilters.sortOrder) queryParams.set('sortOrder', newFilters.sortOrder);
        if (newFilters.selectedTheme) queryParams.set('selectedTheme', newFilters.selectedTheme);

        // Update the URL with the new filters
        router.push(`?${queryParams.toString()}`);
    };

    const isUserUpdating = updateUserStatus === 'pending';
    const isUserDeleting = deleteUserDataStatus === 'pending';

    return {
        user,
        isUserLoading,
        userError,
        updateUser: updateUserMutation,
        isUserUpdating,
        updateUserError,
        deleteUserData: deleteUserDataMutation,
        isUserDeleting,
        deleteUserDataError,
        filters,
        updateFilters,
    };
};