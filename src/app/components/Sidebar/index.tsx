import { useAuth } from '@/app/hooks/useAuthContext'
import { useRouter } from "next/navigation"
import { useEffect } from 'react'
import { Divider } from '../Divider'
import { Footer } from '../Footer'
import { Section } from '../Section'
import { Logo } from './components/Logo'
import { Nav } from './components/Nav'
import { UserSettings } from './components/UserSettings'
import * as S from './style'

export const Sidebar = () => {

    const { isAuthenticated } = useAuth();

    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    return (
        <S.SidebarContainer>

            <div>
                <Logo />
                <Divider />

                <Section>
                    <Nav />
                </Section>


                <Divider />

                <Section>
                    <UserSettings />
                </Section>
            </div>


            <Footer />

        </S.SidebarContainer>
    )
}


