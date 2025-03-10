type TExpenseDelete = Pick<IExpense, 'id' | 'description'>

enum ETransactionType {
    Income = 'income',
    Expense = 'expense',
}


interface IUser {
    id: number;
    email: string;
    createdAt: Date;
    verificationCodes: VerificationCode[];
    expenses: Expense[];
    categories: Category[];
    currency?: Currency;
    currencyId?: number;
}

interface ICurrency {
    name: string;
    acronym: string;
}

interface IVerificationCode {
    id: number;
    expiresAt: Date;
    userId: number;
    code: string;
    createdAt: Date;
    expired: boolean;
    user: User;
}

interface IExpenseResponse {
    data: IExpense[] | []
    meta: {
        totalCount: number
        totalPages: number
        currentPage: number
        pageSize: number
    } | null
}

interface IExpense {
    id: number;
    description: string;
    category: string;
    amount: number;
    date: Date;
    type: ETransactionType;
    userId: number;
    user: User;
}

interface ICategory {
    id: number;
    name: string;
    userId: number;
    user: User;
}

interface IFilter {
    description?: string
    category?: string
    type?: TransactionType | string
    startDate?: string
    endDate?: string
    sortBy?: string
    sortOrder?: string
}