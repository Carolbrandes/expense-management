'use client'

import { useState } from "react";
import { useTheme } from "styled-components";
import { EmptyStateMessage } from "../components/EmptyStateMessage";
import { Form } from "../components/Form";
import { Title } from "../components/Title";
import { useUserQuery } from "../hooks/useUserQuery";

import * as S from './style';

export default function AddCategory() {
    const [newCategory, setNewCategory] = useState("");
    const { user, updateUser } = useUserQuery();
    const theme = useTheme();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setNewCategory(event.target.value);


    const handleSave = async (newCategory: string) => {

        if (!newCategory) {
            alert('Please fill out all required fields.');
            return;
        }

        if (user.categories.some(cat => cat.name === newCategory)) {
            alert('Category already exists.');
            return;
        }

        const updatedCategories = [...user.categories, { name: newCategory, userId: user.id }];

        updateUser({ categories: updatedCategories });

        setNewCategory("");
    };

    const fields: Field[] = [
        {
            type: 'text',
            label: 'new category',
            value: newCategory,
            placeholder: '',
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleChange(event),
        },
    ];

    const buttons = [
        {
            label: 'Save',
            onClick: () => handleSave(newCategory),
        }
    ];


    return (
        <S.AddCategoryContainer>
            <Form
                title="Register new category"
                fields={fields}
                buttons={buttons}
            />

            <Title tag="h2" text="Categorie's List" color={theme.colors.text} width="32rem" fontSize="1.5rem" margin="3.5rem 0 0 0" />

            {user?.categories?.length > 0 ? (
                <ol>
                    {user.categories.map((category) => (
                        <li key={category.id}>{category.name}</li>
                    ))}
                </ol>
            ) : (
                <EmptyStateMessage message="There is no registered category" />
            )}
        </S.AddCategoryContainer>
    );
}
