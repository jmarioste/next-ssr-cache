import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import React from "react";
type Props = {
  date: string;
};
const SSRPage = ({ date }: Props) => {
  const { data: session } = useSession();
  return (
    <div>
      SSRPage This page is generated on {date}
      <pre>{JSON.stringify(session, null, 4)}</pre>
    </div>
  );
};

export default SSRPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req });
  // add Cache-Control HTTP Header to response
  ctx.res.setHeader("Cache-Control", "private, max-age=15");
  ctx.res.setHeader(
    "Last-Modified",
    dayjs().format("ddd, DD MM YYYY HH:mm:ss GMT")
  );
  return {
    props: {
      date: new Date().toISOString(),
      session,
    },
  };
};
