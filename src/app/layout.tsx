import { ReactNode } from "react";
import "../styles/global.scss";
import Header from "../components/Header";
import Head from "next/head";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <main>{children}</main>
      </body>
    </html>
  );
}
