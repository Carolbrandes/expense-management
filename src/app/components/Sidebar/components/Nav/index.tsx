import { IoIosAddCircleOutline } from "react-icons/io";
import { IoListCircleOutline } from "react-icons/io5";
import { useTheme } from "styled-components";
import { Title } from "../../../Title";
import { NavItem } from './NavItem';




export const Nav = () => {
    const theme = useTheme();

    const navItems = [
        {
            text: "Transactions",
            icon: <IoListCircleOutline color={theme.colors.secondaryText} size={24} />,
            link: "/"
        },
        {
            text: "Add new transaction",
            icon: <IoIosAddCircleOutline color={theme.colors.secondaryText} size={24} />,
            link: "/new-transaction"

        },
        {
            text: "Categories",
            icon: <IoListCircleOutline color={theme.colors.secondaryText} size={24} />,
            link: "/"
        },
        {
            text: "Add new category",
            icon: <IoIosAddCircleOutline color={theme.colors.secondaryText} size={24} />,
            link: "/"

        }
    ]


    return (
        <>
            <Title
                tag="h2"
                text="Main Items"
            />


            {
                navItems.map((item) => <NavItem
                    key={item.text}
                    text={item.text}
                    link={item.link}
                    icon={item.icon}
                />)
            }
        </>
    )
}


