import Layout from "@/components/Layout/Layout";
import { Get_BookingPage } from "@/lib/queries";
import filter from "@/utils/filter";

export default function HowItWorks({ modules }) {

  return (
    <>
      <Layout
        pageMeta={{
          title:
            "Hur fungerar processen vid bokning av Marcel Navarro | Navfit",
          description:
            "Steg för steg genomgång för hur processen går tillvid bokning av träning eller kostrådgivning av Marcel Navarro",
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
  return {
    props: {
      modules,
    },
  };
}
