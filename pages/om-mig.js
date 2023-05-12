import Layout from "@/components/Layout/Layout";
import { Get_AboutPage } from "@/lib/queries";
import filter from "@/utils/filter";

export default function About({ modules, structuredData }) {
  return (
    <Layout
      pageMeta={{
        title: "Möt Marcel Navarro, Licensierad personlig tränare | Navfit",
        description:
          "Upptäck Marcel Navarro, en licensierad personlig tränare som är engagerad i att hjälpa klienter att uppnå sina fitnessmål. Lär dig mer om Marcel Navarro, hans/hennes erfarenhet, träningsfilosofi och personliga tillvägagångssätt för fitnessprogram.",
        structuredData: structuredData,
        canonicalTag: "https://navfit.vercel.app/om-mig",
      }}
    >
       { /* Mapping throug the modules array and running the filter function on each object in modules array */}
      {modules?.map((module, i) => filter(module, i))}
    </Layout>
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
        query: Get_AboutPage(),
      }),
    }
  );

    // i append the data to a array
  const { data: data } = await res.json();
  const keysArray = Object.keys(data);
  const modules = keysArray.map((key) => data[key]);

  // creating structured data for the specific page
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Person",
    name: "Marcel Navarro",
    image: data?.omMigCollection?.items[0]?.bild?.url,
    jobTitle: "Personlig tränare",
    description:
      "Jag är en livslång träningentusiast med över 25års träningserfarenhet och tusentals träningspass i ryggen. Med en bakgrund inom både fotboll och kampsport har jag erfarenhet av många olika typer av träningspass och fokus områden.",
    knowsAbout: [
      "Konditionsträning",
      "Styrketräning",
      "Träningsprogram",
      "Kostrådgivning",
    ],
    education: [
      {
        "@type": "EducationalOrganization",
        name: "Safe Education",
        description: "Certifikat för personlig träning",
      },
      {
        "@type": "EducationalOrganization",
        name: "The Academy",
        description: "Certifikat för styrkelyft",
      },
      {
        "@type": "EducationalOrganization",
        name: "Intensivekost",
        description: "Certifikat för kostrådgivning",
      },
      {
        "@type": "EducationalOrganization",
        name: "Active Education",
        description: "Licensierad personlig tränare",
      },
      {
        "@type": "EducationalOrganization",
        name: "Intensivekost",
        description: "Licensierad kostrådgivare",
      },
    ],
  };
  return {
    props: {
      modules,
      structuredData,
    },
  };
}
