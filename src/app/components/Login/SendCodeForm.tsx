'use client'

import { Button } from '../Form/Button';
import { Input } from '../Form/Input';
import { Spinner } from '../Spinner';


interface SendCodeFormProps {
    email: string
    isLoading: boolean
    setEmail: (value: string) => void
    setIsLoading: (value: boolean) => void
    setMessage: (value: { text: string, severity: MessageSeverity }) => void
    setIsCodeSent: (value: boolean) => void
}

export const SendCodeForm = ({ isLoading, setIsLoading, setMessage, setIsCodeSent, email, setEmail }: SendCodeFormProps) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setEmail(event.target.value)

    const sendCode = async () => {
        try {
            setIsLoading(true)
            const response = await fetch("/api/send-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            await response.json();

            if (response.ok) {
                setIsCodeSent(true);
                setMessage({ text: 'Verification code sent to your email.', severity: 'success' });
            } else {
                setMessage({ text: 'failed to send code.', severity: 'error' });
            }
        } catch (error) {
            console.error("Error sending code:", error);
            setMessage({ text: 'failed to send code.', severity: 'error' });
        } finally {
            setIsLoading(false)
            setTimeout(() => setMessage({ text: '', severity: 'info' }), 20000)
        }
    }

    return (

        <>
            <Input
                type='email'
                value={email}
                onChange={handleChange}
                placeholder='Enter your email'
            />

            <Button widthButton='13rem' onclick={sendCode}>
                {isLoading ? <Spinner color="#fff" /> : 'Send the code'}
            </Button>
        </>


    );
};
