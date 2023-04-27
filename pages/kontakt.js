import Layout from "@/components/Layout/Layout";
import { Get_ContactPage } from "@/lib/queries";
import filter from "@/utils/filter";

export default function Contact({ modules }) {
  return (
    <>
      <Layout
        pageMeta={{
          title: "Kontakta mig | Navfit",
          description:
            "Kontakta Navfit för frågor eller bokning. Jag är här för att hjälpa dig och svara på dina frågpr. Fyll i formulärer eller använd kontaktinformationen för att nå mig direkt. ",
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
        query: Get_ContactPage(),
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
