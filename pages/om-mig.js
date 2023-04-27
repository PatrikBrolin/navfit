import Layout from "@/components/Layout/Layout";
import { Get_AboutPage } from "@/lib/queries";
import filter from "@/utils/filter";

export default function About({modules}) {
  return (
    <>
      <Layout  pageMeta={{
          title: "Marcel Navarro - Licensierad personlig tränare",
          description:
            "Personliga tränaren Marcel Navarro. Med skräddarsydda träningsprogram, expertcoaching, kostrådgivning och kontinuerligt stöd kan Marcel Navarro hjälpa dig att uppnå dina bästa resultat. Kontakta mig idag för att starta din träningsresa.",
        }}>{modules?.map((module, i) => filter(module, i))}</Layout>
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

  const { data: data } = await res.json();

  const keysArray = Object.keys(data);
  const modules = keysArray.map((key) => data[key]);

  return {
    props: {
      modules,
    },
  };
}
