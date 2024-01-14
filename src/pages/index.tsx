import type { InferGetStaticPropsType } from "next";

import { Bio } from "@/components/Bio";
import { Layout } from "@/components/Layout";

import { getSortedPostsData } from "../../lib/posts";

export default function IndexPage({
  allPostsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(allPostsData);
  return (
    <Layout>
      {/* <Seo title="Home" description="Home" url="" /> */}
      {/* BIO */}
      <div className="mt-16">
        <Bio />
      </div>
      {/* <article className="prose">
        <figcaption className="ml-4 mt-4">{`총 ${postsData.edges.length}개의 포스트`}</figcaption>
      </article>
      <CardsArea data={postsData.edges} /> */}
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
