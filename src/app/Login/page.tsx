"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TbPigMoney } from "react-icons/tb";
import { Button } from "../components/Form/Button";
import { Input } from "../components/Form/Input";
import { Toast } from "../components/Toast";
import { useAuth } from "../hooks/useAuthContext";
import * as S from './style';

interface MessageProps {
    text: string
    severity: MessageSeverity
}


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [code, setCode] = useState("");
    const [message, setMessage] = useState<MessageProps>({ text: '', severity: 'info' });
    const [isLoading, setIsLoading] = useState(false)
    const { updateAuthenticated, updateUserId } = useAuth();
    const router = useRouter();



    const isTokenValid = (token) => {
        try {
            const decoded = jwtDecode(token);
            return decoded.exp * 1000 > Date.now();
        } catch (error) {
            console.error("Invalid token:", error);
            return false;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (token && isTokenValid(token)) {
            updateAuthenticated(true);
            updateUserId(jwtDecode(token).userId);
            router.push("/");
        } else {
            localStorage.removeItem("auth_token");
            updateAuthenticated(false);
        }
    }, []);



    const sendCode = async () => {
        try {
            setIsLoading(true)
            const response = await fetch("/api/send-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
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
    };

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

    const handleBackToEmail = () => {
        setIsCodeSent(false);
        setCode("");
        setMessage({ text: '', severity: 'info' });
    };

    return (
        <S.StyledBox>
            {!isCodeSent ? (
                <S.FormBox>
                    <S.StyledTypography>
                        <TbPigMoney size={32} />
                        Login
                    </S.StyledTypography>


                    <S.StyledFormContainer>
                        <Input
                            value={email}
                            onchange={setEmail}
                            type="email"
                            placeholder="Enter your email"
                        />
                        <Button onclick={sendCode} isLoading={isLoading} widthButton="14rem">
                            Send the code
                        </Button>
                    </S.StyledFormContainer>

                    {message && (<Toast message={message.text} severity={message.severity} />

                    )}
                </S.FormBox>
            ) : (
                <S.FormBox>
                    <S.StyledTypography>Código</S.StyledTypography>

                    <S.StyledFormContainer>
                        <Input
                            placeholder="Verification code"
                            value={code}
                            onchange={setCode}
                        />

                        <Button onclick={verifyCode} isLoading={isLoading} widthButton="14rem">
                            Check code
                        </Button>
                    </S.StyledFormContainer>

                    {message && (
                        <>

                            (<Toast message={message.text} severity={message.severity} />

                            )


                            {message.text === "Invalid code." && (
                                <Button onclick={handleBackToEmail} isLoading={isLoading}>
                                    Return to login
                                </Button>
                            )}
                        </>
                    )}
                </S.FormBox>
            )}
        </S.StyledBox>
    );
}