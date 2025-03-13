import { AiOutlineLogout } from "react-icons/ai";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { RxAvatar } from "react-icons/rx";
import { Title } from '../../../Title';
import { NavItem } from '../Nav/NavItem';
import { CurrencySelect } from './components/CurrencySelect';
import { Logout } from './components/Logout';
import { User } from './components/User';

export const UserSettings = () => {

  const settings = [
    {
      name: "user",
      children: <User />,
      icon: <RxAvatar size={24} />
    },
    {
      name: "currency",
      children: <CurrencySelect />,
      icon: <HiOutlineCurrencyDollar size={24} />
    },
    {
      name: "logout",
      children: <Logout />,
      icon: <AiOutlineLogout size={24} title="logout" />
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

