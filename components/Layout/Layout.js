import Head from "next/head";
import styles from "./Layout.module.scss";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function Layout({ children, pageMeta }) {
  return (
    <div className={styles.layout}>
      <Head>
        <title>{pageMeta?.title}</title>
        <meta name="google-site-verification" content="MFQoOZW_3tJvT2ujBzbQf1LlQm4AiYB3YqmIoWqM5Qs" />
        <meta name="description" content={pageMeta?.description} />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
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
