import { Get_Hero } from "@/lib/queries";
import filter from "@/utils/filter";

import Layout from "@/components/Layout/Layout";

export default function Home({ modules }) {
  return (
    <>
      <Layout>{modules.map((module, i) => filter(module, i))}</Layout>
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
        query: Get_Hero(),
      }),
    }
  );
  const {
    data: {
      heroSectionCollection: { items: modules },
    },
  } = await res.json();
  return {
    props: {
      modules,
    },
  };
}
