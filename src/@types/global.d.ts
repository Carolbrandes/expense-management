// *** user-related types ***

type TTransactionDelete = Pick<ITransaction, 'id' | 'description'>

type TransactionType = 'income' | 'expense'

type Theme = 'light' | 'dark'

interface IUser {
    id: number;
    email: string;
    createdAt: Date;
    verificationCodes: VerificationCode[];
    transactions: Transaction[];
    categories: Category[];
    currency?: Currency;
    currencyId?: number;
    selectedTheme: Theme
}

type INewUser = Pick<IUser, 'email', 'selectedTheme', 'currency'>;

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
    type: TransactionType;
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
    selectedTheme?: Theme
}

// *** form types ***
type TypeInput = 'text' | 'select' | 'date' | 'email';
type Severity = 'error' | 'success';

interface BaseField extends React.InputHTMLAttributes<HTMLInputElement> {
    type: TypeInput;
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // Updated to accept event
}

interface TextField extends BaseField {
    type: 'text';
}

interface EmailField extends BaseField {
    type: 'email';
}

interface DateField extends BaseField {
    type: 'date';
}

interface SelectField extends BaseField {
    type: 'select';
    selectOptions: { value: string; label: string }[];
}

type Field = TextField | DateField | SelectField | EmailField;

type MessageSeverity = 'error' | 'success' | 'info'


// *** styles types ***
type labelPosition = 'top' | 'left'
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type direction = 'column' | 'row'
type position = 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around'