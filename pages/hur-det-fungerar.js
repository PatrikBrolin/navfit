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
          canonicalTag: "https://navfit.vercel.app/hur-det-fungerar"
        }}
      >
         { /* Mapping throug the modules array and running the filter function on each object in modules array */}
        {modules?.map((module, i) => filter(module, i))}
      </Layout>
    </>
  );
}

// getStaticProps function is used to tell the software what data that should be built on the server instead of on client side
export async function getStaticProps() {
  // i get the env variables from my env file containing the keys to the contentful space
  const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

    // fetch function to get data from contentful, the query is a function from the queries folder containing GraphQl queries
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

    // i append the data to a array
  const { data: data } = await res.json();
  const keysArray = Object?.keys(data);
  const modules = keysArray?.map((key) => data[key]);

  // creating structured data for the specific page
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
