import type { InferGetStaticPropsType } from "next";

import { Bio } from "@/components/Bio";
import { CardsArea } from "@/components/CardsArea";

import { getSortedPostsData } from "../../lib/posts";

export default function IndexPage({
  allPostsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(allPostsData);
  return (
    <>
      {/* <Seo title="Home" description="Home" url="" /> */}
      {/* BIO */}
      <div className="mt-16">
        <Bio />
      </div>
      <article className="prose">
        <figcaption className="ml-4 mt-4">{`총 ${allPostsData.length}개의 포스트`}</figcaption>
      </article>
      <CardsArea data={allPostsData} />
    </>
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