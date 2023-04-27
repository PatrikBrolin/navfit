import Layout from "@/components/Layout/Layout";
import { Get_AboutPage } from "@/lib/queries";
import filter from "@/utils/filter";

export default function About({modules}) {
  return (
    <>
      <Layout  pageMeta={{
          title: "Möt Marcel Navarro, Licensierad personlig tränare | Navfit",
          description:
            "Upptäck Marcel Navarro, en licensierad personlig tränare som är engagerad i att hjälpa klienter att uppnå sina fitnessmål. Lär dig mer om Marcel Navarro, hans/hennes erfarenhet, träningsfilosofi och personliga tillvägagångssätt för fitnessprogram.",
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
