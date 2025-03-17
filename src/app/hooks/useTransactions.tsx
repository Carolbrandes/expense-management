'use client';

import {
    ReactNode,
    createContext,
    useContext,
    useState
} from 'react';
interface TransactionProviderProps {
    readonly children: ReactNode
}


interface TransactionContextProps {
    newTransaction: INewTransaction
    addNewTransactionOnState: (newTransaction: INewTransaction) => void
}

const TransactionContext = createContext<TransactionContextProps>(
    {} as TransactionContextProps
)


export function TransactionProvider({ children }: TransactionProviderProps) {
    const [newTransaction, setNewTransaction] = useState({} as INewTransaction)

    const addNewTransactionOnState = (newTransaction: INewTransaction) => setNewTransaction(newTransaction)


    const contextValue: TransactionContextProps = {
        newTransaction,
        addNewTransactionOnState
    };

    return (
        <TransactionContext.Provider value={contextValue}>
            {children}
        </TransactionContext.Provider>
    );
}

export function useTransaction() {
    const context = useContext(TransactionContext)

    return context
}
