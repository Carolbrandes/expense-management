'use client';

import { jwtDecode } from 'jwt-decode';
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';

interface AuthProviderProps {
    readonly children: ReactNode;
}

interface AuthContextProps {
    isAuthenticated: boolean;
    isLoading: boolean; // <-- NEW
    updateAuthenticated: (isAuth: boolean) => void;
    userId: string | null;
    updateUserId: (userId: string | null) => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // <-- NEW: Track loading state
    const [userId, setUserId] = useState<string | null>(null);

    const updateAuthenticated = (isAuth: boolean) => setIsAuthenticated(isAuth);
    const updateUserId = (userId: string | null) => setUserId(userId);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');

        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log("🚀 ~ Decoded Token:", decoded);

                if (decoded.exp * 1000 > Date.now()) {
                    setIsAuthenticated(true);
                    updateUserId(decoded.userId);
                } else {
                    localStorage.removeItem('auth_token');
                    setIsAuthenticated(false);
                    updateUserId(null);
                }
            } catch (error) {
                console.error('Invalid token:', error);
                localStorage.removeItem('auth_token');
                setIsAuthenticated(false);
                updateUserId(null);
            }
        } else {
            setIsAuthenticated(false);
            updateUserId(null);
        }

        setIsLoading(false); // <-- AUTH CHECK COMPLETE
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, updateAuthenticated, userId, updateUserId }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}