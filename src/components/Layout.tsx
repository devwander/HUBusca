import { ScriptProps } from "next/script";
import Navbar from "./Navbar";
import Head from "next/head";
import Footer from "./Footer";

export default function Layout({ children }: ScriptProps) {
  return (
    <>
      <Head>
        <title>HUBusca</title>
        <meta
          name="description"
          content="Encontre facilmente usuários do GitHub com o HUBusca. Explore perfis, descubra projetos e conexões. Conecte-se com desenvolvedores talentosos e colabore em projetos emocionantes. Uma ferramenta poderosa para explorar a comunidade GitHub."
        />
        <meta
          name="keywords"
          content="busca GitHub, usuários GitHub, perfis GitHub, desenvolvedores, conexões, projetos colaborativos, comunidade de código aberto, ferramenta de busca, encontrar devs, colaboração de código, repositórios, codificação colaborativa"
        />
        <meta name="author" content="devwander"></meta>
      </Head>
      <Navbar />
      <main className="main-container">{children}</main>
      <Footer />
    </>
  );
}
