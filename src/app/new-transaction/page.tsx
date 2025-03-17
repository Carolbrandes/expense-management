"use client";

import { Form } from "../components/Form";
import { useTransaction } from "../hooks/useTransactions";
import { useUserQuery } from "../hooks/useUserQuery";

export default function NewTransaction() {

    const { user, updateUser } = useUserQuery();
    const { newTransaction, addNewTransactionOnState } = useTransaction()

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
        // implement here the verification if all props are filled
        if (!validateTransaction(newTransaction)) {
            alert('Please fill out all required fields.');
            return; // Stop execution if validation fails
        }

        updateUser({
            ...user,
            transactions: [...user.transactions, newTransaction]
        });
    }


    const fields: Field[] = [
        {
            type: 'text' as const,
            label: 'description',
            value: '',
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
                addNewTransactionOnState({ ...newTransaction, description: event.target.value }),
        },
        {
            type: 'select' as const,
            label: 'category',
            value: '',
            selectOptions: [
                { value: 'category1', label: 'Category 1' },
                { value: 'category2', label: 'Category 2' },
            ],
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
                addNewTransactionOnState({ ...newTransaction, category: event.target.value }),
        },
        {
            type: 'text' as const,
            label: 'amount',
            value: '',
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
                addNewTransactionOnState({ ...newTransaction, amount: event.target.value }),
        },
        {
            type: 'date' as const,
            label: 'date',
            value: '',
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
                addNewTransactionOnState({ ...newTransaction, date: new Date(event.target.value) }),
        },
        {
            type: 'select' as const,
            label: 'type',
            value: '',
            selectOptions: [
                { value: 'type1', label: 'Type 1' },
                { value: 'type2', label: 'Type 2' },
            ],
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
                addNewTransactionOnState({ ...newTransaction, type: event.target.value == ETransactionType.Income ? ETransactionType.Income : ETransactionType.Expense }),
        },
    ];

    const buttons = [
        {
            label: 'Save',
            onClick: () => handleSave,
        }
    ];

    return (
        <>
            <Form
                title="Register new transaction"
                fields={fields}
                buttons={buttons}
            />
        </>
    );
}