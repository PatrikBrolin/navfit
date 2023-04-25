import { Get_IndexPage } from "@/lib/queries";
import filter from "@/utils/filter";

import Layout from "@/components/Layout/Layout";

export default function Home({ modules }) {
 
  return (
    <>
      <Layout>
        {modules.map((module, i) => filter(module, i))}
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
        query: Get_IndexPage(),
      }),
    }
  );

  const {
    data: data
  } = await res.json();
  const keysArray = Object.keys(data);
  const modules = keysArray.map(key => data[key]);

  return {
    props: {
      modules,
    },
  };
}
