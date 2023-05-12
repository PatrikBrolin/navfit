import Layout from "@/components/Layout/Layout";
import { Get_FaqPage } from "@/lib/queries";
import filter from "@/utils/filter";


export default function Faqs({ modules }) {
  return (
    <>
      <Layout
        pageMeta={{
          title: "Vanliga frågor och svar | Navfit",
          description:
            "Här hittar du bra information om vad en personlig tränare kan hjälpa dig med och vad du ska tänka på innan du bokar en personlig tränare ",
            canonicalTag: "https://navfit.vercel.app/faq"
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
        query: Get_FaqPage(),
      }),
    }
  );

    // i append the data to a array
  const { data: data } = await res.json();
  const keysArray = Object.keys(data);
  const modules = keysArray.map((key) => data[key]);

  return {
    props: {
      modules,
    },
  };
}
