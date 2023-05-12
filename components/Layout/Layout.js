import Head from "next/head";
import styles from "./Layout.module.scss";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function Layout({ children, pageMeta }) {
  //layout handles the main structure of the app where it contains the meta data aswell as header and footer component and the {children} represent whatever 
  //content the page should include
  return (
    <div className={styles.layout}>
       {/* The Head tag includes all the necessary meta data that vill be shown on google search results  and used for google crawlers*/}
      <Head>
        <title>{pageMeta?.title}</title>
        <meta name="google-site-verification" content="MFQoOZW_3tJvT2ujBzbQf1LlQm4AiYB3YqmIoWqM5Qs" />
        <meta name="description" content={pageMeta?.description} />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link rel="canonical" href={pageMeta.canonical}></link>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pageMeta?.structuredData),
          }}
        />

      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
