"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TbPigMoney } from "react-icons/tb";
import { Button } from "../components/Form/Button";
import { SendCodeForm } from "../components/Login/SendCodeForm";
import { VerificationCodeForm } from "../components/Login/VerificationCodeForm";
import { Toast } from "../components/Toast";
import { useAuth } from "../hooks/useAuthContext";
import * as S from './style';

interface MessageProps {
    text: string
    severity: MessageSeverity
}


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [isCodeSent, setIsCodeSent] = useState(false);

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

    const handleBackToEmail = () => {
        setIsCodeSent(false);
        setCode("");
        setMessage({ text: '', severity: 'info' });
    };

    return (
        <S.StyledBox>
            <S.StyledTypography>
                <TbPigMoney size={32} />
                Login
            </S.StyledTypography>

            {!isCodeSent ? (
                <S.FormBox>
                    <S.StyledFormContainer>
                        <SendCodeForm
                            email={email}
                            isLoading={isLoading}
                            setEmail={setEmail}
                            setIsLoading={setIsLoading}
                            setIsCodeSent={setIsCodeSent}
                            setMessage={setMessage}
                        />
                    </S.StyledFormContainer>

                    {message && (<Toast message={message.text} severity={message.severity} />

                    )}
                </S.FormBox>
            ) : (
                <S.FormBox>
                    <S.StyledFormContainer>
                        <VerificationCodeForm
                            code={code}
                            email={email}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            setMessage={setMessage}
                            setCode={setCode}
                        />
                    </S.StyledFormContainer>

                    {message && (
                        <>

                            <Toast message={message.text} severity={message.severity} />


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