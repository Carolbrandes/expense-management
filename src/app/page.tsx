import { RxAvatar } from "react-icons/rx";
import { TbPigMoney } from "react-icons/tb";
import { CurrencySelect } from "./components/CurrencySelect";
import * as S from './home';

export default function Home() {
  return (
    <S.Container>
      <S.Sidebar>
        <div>
          <h1><TbPigMoney size={45} /> Expense Management</h1>
        </div>

        <S.Nav>
          <div>
            <S.SectionsTitle>Main Items</S.SectionsTitle>
            <a href="">Expenses</a>
            <a href="">Add new expense</a>
            <a href="">Categories</a>
            <a href="">Add new category</a>
          </div>
        </S.Nav>

        <S.UserSettings>
          <S.SectionsTitle>User Settings</S.SectionsTitle>
          <div>
            <CurrencySelect />
          </div>

          <div>
            tema
          </div>

          <div>
            <a href="">logout</a>
          </div>

          <div className="user">
            <RxAvatar size={30} />
            <span>Hi, John.</span>
          </div>
        </S.UserSettings>
      </S.Sidebar>


      <section>conteudo</section>

    </S.Container>
  );
}
