import { AiOutlineLogout } from "react-icons/ai";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { RxAvatar } from "react-icons/rx";
import { useTheme } from "styled-components";
import { Title } from '../../../Title';
import { NavItem } from '../Nav/NavItem';
import { CurrencySelect } from './components/CurrencySelect';
import { Logout } from './components/Logout';
import { User } from './components/User';


export const UserSettings = () => {
  const theme = useTheme();


  const settings = [
    {
      name: "user",
      children: <User />,
      icon: <RxAvatar color={theme.colors.secondaryText} size={24} />
    },
    {
      name: "currency",
      children: <CurrencySelect />,
      icon: <HiOutlineCurrencyDollar color={theme.colors.secondaryText} size={24} />
    },
    {
      name: "logout",
      children: <Logout />,
      icon: <AiOutlineLogout color={theme.colors.secondaryText} size={24} title="logout" />
    }
  ]


  return (
    <>

      <Title
        tag="h2"
        text="User Settings"
      />

      {
        settings.map((item) => <NavItem
          key={item.name}
          icon={item.icon}
        >
          {item.children}
        </NavItem>
        )
      }

    </>
  )
}

