// *** user-related types ***

type TTransactionDelete = Pick<ITransaction, 'id' | 'description'>

enum ETransactionType {
    Income = 'income',
    Expense = 'expense',
}


interface IUser {
    id: number;
    email: string;
    createdAt: Date;
    verificationCodes: VerificationCode[];
    transactions: Transaction[];
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

interface ITransactionResponse {
    data: ITransaction[] | []
    meta: {
        totalCount: number
        totalPages: number
        currentPage: number
        pageSize: number
    } | null
}

interface ITransaction {
    id: number;
    description: string;
    category: string;
    amount: string;
    date: Date;
    type: ETransactionType;
    userId: number;
    user: User;
}

type INewTransaction = Omit<ITransaction, 'id', 'userId', 'user'>;

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

// *** form types ***
type TypeInput = 'text' | 'select' | 'date';
type Severity = 'error' | 'success';

interface BaseField {
    type: TypeInput;
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // Updated to accept event
}

interface TextField extends BaseField {
    type: 'text';
}

interface DateField extends BaseField {
    type: 'date';
}

interface SelectField extends BaseField {
    type: 'select';
    selectOptions: { value: string; label: string }[];
}

type Field = TextField | DateField | SelectField;

// *** styles types ***
type labelPosition = 'top' | 'left'
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type direction = 'column' | 'row'
type position = 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around'