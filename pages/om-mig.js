import Layout from "@/components/Layout/Layout";
import { Get_AboutPage } from "@/lib/queries";
import filter from "@/utils/filter";

export default function About({ modules, structuredData }) {
  return (
    <>
      <Layout
        pageMeta={{
          title: "Möt Marcel Navarro, Licensierad personlig tränare | Navfit",
          description:
            "Upptäck Marcel Navarro, en licensierad personlig tränare som är engagerad i att hjälpa klienter att uppnå sina fitnessmål. Lär dig mer om Marcel Navarro, hans/hennes erfarenhet, träningsfilosofi och personliga tillvägagångssätt för fitnessprogram.",
          structuredData: structuredData,
          canonicalTag: "https://navfit.vercel.app/om-mig"
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
        query: Get_AboutPage(),
      }),
    }
  );

  const keysArray = Object.keys(data);
  const modules = keysArray.map((key) => data[key]);

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Person",
    name: "Marcel Navarro",
    image: "data?.omMigCollection?.items[0]?.bild?.url",
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
