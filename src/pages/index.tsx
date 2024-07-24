import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { api } from "~/utils/api";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>ActivityFinder</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="w-full fixed h-16 top-0 bg-white shadow-md">
          <div>
            <Image
            className="ml-4 my-2"
              src="/favicon.ico"
              alt="Logo"
              width={50}
              height={50}
            />
          </div>
        </div>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          
        </div>
      </main>
    </>
  );
}
