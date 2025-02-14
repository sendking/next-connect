import type { IncomingMessage, ServerResponse } from "http";
import type {
  GetServerSideProps,
  GetServerSidePropsResult,
  NextPage,
} from "next";
import { createRouter } from "next-connect";
import Head from "next/head";
import styles from "../../styles/styles.module.css";
import { getUsers } from "../../utils/api";
import type { User } from "../../utils/common";

interface PageProps {
  user: User;
}

const UserPage: NextPage<PageProps> = ({ user }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>getServerSideProps Example</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://github.com/hoangvvo/next-connect/tree/main/examples/nextjs/pages/gssp-users/[id].tsx">
            getServerSideProps
          </a>{" "}
          Example
        </h1>
        <h2>User Data</h2>
        <div className={styles.card}>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Age:</strong> {user.age}
          </p>
        </div>
      </main>
    </div>
  );
};

export default UserPage;

const gsspRouter = createRouter<
  IncomingMessage & {
    body?: Record<string, string | number>;
    params?: Record<string, string>;
  },
  ServerResponse
>().get((req): GetServerSidePropsResult<PageProps> => {
  const users = getUsers(req);
  const user = users.find((user) => user.id === req.params?.id);
  if (!user) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      user,
    },
  };
});

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  req,
  res,
  params,
}) => {
  // @ts-ignore: attach params to req.params
  req.params = params;
  return gsspRouter.run(req, res) as Promise<
    GetServerSidePropsResult<PageProps>
  >;
};
