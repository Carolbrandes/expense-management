"use client";

import { useState } from "react";
import { Form } from "../components/Form";
import { useUserQuery } from "../hooks/useUserQuery";

export default function NewTransaction() {
    const [formNewCategory, setFormNewCategory] = useState({
        description: '',
        category: '',
        amount: '',
        date: new Date,
        type: 'expense'
    } as INewTransaction)

    const { user, updateUser } = useUserQuery();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
        console.log(`New value of ${field}:`, event.target.value); // Debugging
        const updateObj = { ...formNewCategory, [field]: event.target.value }
        setFormNewCategory(updateObj)
    };

    const validateTransaction = (transaction: INewTransaction): boolean => {
        // Check if all required fields are filled
        return (
            transaction.description.trim() !== '' &&
            transaction.category.trim() !== '' &&
            transaction.amount.trim() !== '' &&
            transaction.date !== null &&
            transaction.type !== null
        );
    };

    const handleSave = (newTransaction: ITransaction) => {
        console.log("🚀 ~ handleSave ~ newTransaction:", newTransaction)
        // implement here the verification if all props are filled
        if (!validateTransaction(newTransaction)) {
            alert('Please fill out all required fields.');
            return; // Stop execution if validation fails
        }

        const updatedTransactions = [...user.transactions, { ...newTransaction, userId: user.id }];

        console.log("🚀 ~ updateUserMutation called with:", { transactions: updatedTransactions });

        updateUser({ transactions: updatedTransactions });
    }


    const fields: Field[] = [
        {
            type: 'text' as const,
            label: 'description',
            value: formNewCategory.description,
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleChange(event, "description"),
        },
        {
            type: 'select' as const,
            label: 'category',
            value: formNewCategory.category,
            selectOptions: user.categories.map((category) => ({
                value: category.name.normalize("NFD") // Normalize accents
                    .replace(/[\u0300-\u036f]/g, "") // Remove accents
                    .replace(/[^a-zA-Z0-9]/g, "") // Remove special characters
                    .replace(/\s+/g, ""), // Remove spaces

                label: category.name
            })),
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleChange(event, "category"),
        },
        {
            type: 'text' as const,
            label: 'amount',
            value: formNewCategory.amount,
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleChange(event, "amount"),
        },
        {
            type: 'date' as const,
            label: 'date',
            value: formNewCategory.date,
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleChange(event, "date"),
        },
        {
            type: 'select' as const,
            label: 'type',
            value: formNewCategory.type,
            selectOptions: [
                { value: 'expense', label: 'Expense' },
                { value: 'Income', label: 'Income' },
            ],
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleChange(event, "type"),
        },
    ];

    const buttons = [
        {
            label: 'Save',
            onClick: () => handleSave(formNewCategory),
        }
    ];

    return (
        <Form
            title="Register new transaction"
            fields={fields}
            buttons={buttons}
        />
    );
}