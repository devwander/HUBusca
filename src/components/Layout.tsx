import { ScriptProps } from "next/script";
import Navbar from "./Navbar";
import Head from "next/head";
import Footer from "./Footer";

export default function Layout({ children }: ScriptProps) {
  return (
    <>
      <Head>
        <title>HUBusca</title>
      </Head>
      <Navbar />
      <main className="main-container">{children}</main>
      <Footer />
    </>
  );
}
