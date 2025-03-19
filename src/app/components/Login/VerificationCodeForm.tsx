'use client'

import { useAuth } from "@/app/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import { Button } from "../Form/Button";
import { Input } from "../Form/Input";
import { Spinner } from "../Spinner";

interface VerificationCodeFormProps {
    code: string
    email: string
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    setMessage: (value: { text: string, severity: MessageSeverity }) => void
    setCode: (value: string) => void
}

export const VerificationCodeForm = ({ code, email, isLoading, setIsLoading, setMessage, setCode }: VerificationCodeFormProps) => {
    const router = useRouter();
    const { updateAuthenticated, updateUserId } = useAuth();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setCode(event.target.value)

    const verifyCode = async () => {
        try {
            setIsLoading(true)
            const response = await fetch("/api/verify-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code }),
            });

            const data = await response.json();
            if (response.ok) {
                const token = data.token;

                if (token) {
                    localStorage.setItem("auth_token", token);
                    updateUserId(data.userId);
                    updateAuthenticated(true);
                    setMessage({ text: 'Login successful!', severity: 'success' });
                    router.push("/");
                } else {
                    console.error("Token is missing in the response.");
                    setMessage({ text: 'Login error', severity: 'error' });
                }
            } else {
                setMessage({ text: 'Invalid code', severity: 'error' });
            }
        } catch (error) {
            console.error("Error verifying code:", error);
            setMessage({ text: 'An error has occurred. Please try again', severity: 'error' });
        } finally {
            setIsLoading(false)
        }
    };


    return (
        <>
            <Input
                type='text'
                value={code}
                onChange={handleChange}
                placeholder='Enter the code'
            />

            <Button widthButton='16rem' onclick={verifyCode}>
                {
                    isLoading ? <Spinner color="#fff" /> : 'Verify the code'
                }

            </Button>
        </>
    );
};
