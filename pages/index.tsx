import type { GetServerSideProps, NextPage } from "next";
type Props = {
  date: string;
};
const Home: NextPage<Props> = ({ date }) => {
  return <div>This page is generated on {date}</div>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // add Cache-Control HTTP Header to response
  ctx.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  return {
    props: {
      date: new Date().toISOString(),
    },
  };
};
