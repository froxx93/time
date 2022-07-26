import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery([
    "example.hello",
    { text: "from tRPC" },
  ]);

  return (
    <>
      <Head>
        <title>Time</title>
        <meta name="description" content="Time – Easily Tracked" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div>
        <h1>Time – Easily Tracked</h1>

        <div>
          <h3>This stack uses:</h3>
          <ul>
            <li>
              <a href="https://nextjs.org" target="_blank" rel="noreferrer">
                Next.js
              </a>
            </li>
            <li>
              <a href="https://trpc.io" target="_blank" rel="noreferrer">
                tRPC
              </a>
            </li>
            <li>
              <a
                href="https://typescriptlang.org"
                target="_blank"
                rel="noreferrer"
              >
                TypeScript
              </a>
            </li>
          </ul>

          <div>{data ? <p>{data.greeting}</p> : <p>Loading..</p>}</div>
        </div>
      </div>
    </>
  );
};

export default Home;
