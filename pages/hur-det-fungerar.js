import Layout from "@/components/Layout/Layout";
import { Get_BookingPage } from "@/lib/queries";
import filter from "@/utils/filter";

export default function HowItWorks({ modules, structuredData }) {
  return (
    <>
      <Layout
        pageMeta={{
          title:
            "Hur fungerar processen vid bokning av Marcel Navarro | Navfit",
          description:
            "Steg för steg genomgång för hur processen går tillvid bokning av träning eller kostrådgivning av Marcel Navarro",
          structuredData: structuredData,
        }}
      >
        {modules?.map((module, i) => filter(module, i))}
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
        query: Get_BookingPage(),
      }),
    }
  );

  const { data: data } = await res.json();
  const keysArray = Object?.keys(data);
  const modules = keysArray?.map((key) => data[key]);

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Person",
    name: "Marcel Navarro",
    image: "data.omMigCollection.items[]",
    jobTitle: "Personlig tränare",
    description:
      "Hur fungerar det när man bokar en tid med Marcel Navarro en personlig tränare i Stockholm.",
    knowsAbout: [
      "Konditionsträning",
      "Styrketräning",
      "Träningsprogram",
      "Kostrådgivning",
    ],
    mainEntity: {
      "@type": "HowTo",
      name: "Hur man bokar tid med Marcel Navarro, personlig tränare i stockholm",
      step: [
        {
          "@type": "HowToStep",
          name: "Steg 1: Formulär",
          text: "Du kommer få börja att fylla i ett formulär som du får skickat till dig.",
        },
        {
          "@type": "HowToStep",
          name: "Steg 2: Kostnadsfri konsultation",
          text: "Efter det bokar vi en kostnadsfri konsultation där vi lite djupare går igenom vart du står idag, din fysiska bakgrund och vad dina önskemål med träningen samt sätter upp en framtida plan över vart du vill nå och delmål under vägen.",
        },
        {
          "@type": "HowToStep",
          name: "Steg 3: Boka tid",
          text: "Är du nöjd med upplägget så bokar vi in tid och plats för ditt första tränings pass",
        },
      ],
    },
  };
  return {
    props: {
      modules,
      structuredData,
    },
  };
}
