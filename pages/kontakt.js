import Layout from "@/components/Layout/Layout";
import { Get_ContactPage } from "@/lib/queries";
import filter from "@/utils/filter";

export default function Contact({ modules, structuredData }) {
  return (
    <>
      <Layout
        pageMeta={{
          title: "Kontakta mig | Navfit",
          description:
            "Kontakta Navfit för frågor eller bokning. Jag är här för att hjälpa dig och svara på dina frågpr. Fyll i formulärer eller använd kontaktinformationen för att nå mig direkt. ",
            structuredData: structuredData,
            canonicalTag: "https://navfit.vercel.app/kontakt"
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
        query: Get_ContactPage(),
      }),
    }
  );

  // i append the data to a array
  const { data: data } = await res.json();
  const keysArray = Object.keys(data);
  const modules = keysArray.map((key) => data[key]);

  // creating structured data for the specific page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Kontaktuppgifter",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Säbyvägen 19",
      addressLocality: "Rönninge",
      postalCode: "144 30",
      addressRegion: "Stockholm",
      addressCountry: "Sweden",
    },

    hasMap: [
      {
        "@type": "Map",
        name: "Actic Salem",
        url: "https://www.google.com/maps/place/Actic+Salem",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Säbyvägen 19",
          addressLocality: "Rönninge",
          postalCode: "144 30",
          addressRegion: "Stockholm",
          addressCountry: "Sweden",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 59.176399,
          longitude: 17.759977,
        },
      },
      {
        "@type": "Map",
        name: "Actic Hammarbysjöstad",
        url: "https://www.google.com/maps/place/Actic+Hammarbysjöstad",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Skeppsmäklargatan 1",
          addressLocality: "Stockholm",
          postalCode: "120 69",
          addressRegion: "Stockholm",
          addressCountry: "Sweden",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 59.309834,
          longitude: 18.109775,
        },
      },
    ],
  };
  return {
    props: {
      modules,
      structuredData
    },
  };
}
