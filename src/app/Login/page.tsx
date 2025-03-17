"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TbPigMoney } from "react-icons/tb";
import { Button } from "../components/Form/Button";
import { Input } from "../components/Form/Input";
import { useAuth } from "../hooks/useAuthContext";
import * as S from './style';


interface MessageSeverityProps {
    [key: string]: Severity
}

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const { updateAuthenticated, updateUserId } = useAuth();
    const router = useRouter();

    const MessagesSeverity = {
        "Invalid code.": "error",
        "Código de verificação enviado para o seu email.": "success",
        "Login realizado com sucesso!": "success",
    } as MessageSeverityProps;

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
                setMessage("Código de verificação enviado para o seu email.");
            } else {
                setMessage(data.error || "Falha ao enviar o código.");
            }
        } catch (error) {
            console.error("Error sending code:", error);
            setMessage("Ocorreu um erro. Tente novamente.");
        } finally {
            setIsLoading(false)
            setTimeout(() => setMessage(''), 20000)
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
                    setMessage("Login realizado com sucesso!");
                    router.push("/");
                } else {
                    console.error("Token is missing in the response.");
                    setMessage("Erro no login. Tente novamente.");
                }
            } else {
                setMessage(data.error || "Código inválido.");
            }
        } catch (error) {
            console.error("Error verifying code:", error);
            setMessage("Ocorreu um erro. Tente novamente.");
        } finally {
            setIsLoading(false)
        }
    };

    const handleBackToEmail = () => {
        setIsCodeSent(false);
        setCode("");
        setMessage("");
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
                        <Button onclick={sendCode} isLoading={isLoading}>
                            Send the code
                        </Button>
                    </S.StyledFormContainer>

                    {message && (
                        <S.StyledAlert severity={MessagesSeverity[message] || MessagesSeverity.default}>
                            {message}
                        </S.StyledAlert>
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

                        <Button onclick={verifyCode} isLoading={isLoading}>
                            Check code
                        </Button>
                    </S.StyledFormContainer>

                    {message && (
                        <>
                            <S.StyledAlert severity={MessagesSeverity[message] || MessagesSeverity.default}>
                                {message}
                            </S.StyledAlert>
                            {message === "Invalid code." && (
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