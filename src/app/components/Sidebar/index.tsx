import { Divider } from '../Divider'
import { Footer } from '../Footer'
import { Section } from '../Section'
import { Logo } from './components/Logo'
import { Nav } from './components/Nav'
import { UserSettings } from './components/UserSettings'
import * as S from './style'

export const Sidebar = () => {
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


