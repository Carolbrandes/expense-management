import { IoIosAddCircleOutline } from "react-icons/io";
import { IoListCircleOutline } from "react-icons/io5";
import { Title } from "../../../Title";
import { NavItem } from './NavItem';



export const Nav = () => {
    const navItems = [
        {
            text: "Expenses",
            icon: <IoListCircleOutline size={24} />
        },
        {
            text: "Add new expense",
            icon: <IoIosAddCircleOutline size={24} />

        },
        {
            text: "Categories",
            icon: <IoListCircleOutline size={24} />
        },
        {
            text: "Add new category",
            icon: <IoIosAddCircleOutline size={24} />

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
                    icon={item.icon}
                />)
            }
        </>
    )
}


