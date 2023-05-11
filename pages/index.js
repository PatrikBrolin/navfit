import Head from "next/head";

import { Get_IndexPage } from "@/lib/queries";
import filter from "@/utils/filter";

import Layout from "@/components/Layout/Layout";
import Contact from "@/components/Index/Contact/Contact";

export default function Home({ modules, structuredData }) {
  return (
    <>
      <Layout
        pageMeta={{
          title: "Marcel Navarro - Licensierad personlig tränare | Navfit",
          description:
            "Få personlig träning i Stockholm med Marcel Navarro. Skräddarsydda program, expertcoaching, kostrådgivning och kontinuerligt stöd för dina bästa resultat. Kontakta mig idag för att påbörja din träningsresa.",
          structuredData: structuredData,
        }}
      >
        {modules.map((module, i) => filter(module, i))}
        <Contact showText={true} extraPadding={true} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${space}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        query: Get_IndexPage(),
      }),
    }
  );

  const { data: data } = await res.json();
  const keysArray = Object.keys(data);
  const modules = keysArray.map((key) => data[key]);

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Person",
    name: "Marcel Navarro",
    url: "https://navfit.vercel.app/",
    image: data?.heroSectionCollection?.items[0]?.backgrundsbild?.url,
    about:
      "Jag är en certifierad PT som hjälper dig att nå dina träningsmål genom skräddarsydda träningsprogram och individuell coaching. Tillsammans hjälper jag dig att nå dina fysiska mål.",
  };
  return {
    props: {
      modules,
      structuredData,
    },
  };
}
