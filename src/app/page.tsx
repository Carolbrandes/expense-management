'use client'


import { Sidebar } from "./components/Sidebar";
import * as S from './home';


export default function Home() {

  return (
    <S.Container>
      <Sidebar />

      <section>conteudo</section>
    </S.Container>
  );
}
