import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { api } from "~/utils/api";
import Sidebar from './components/sidebar';


export default function Home() {
  
  return (
    <>
      <Head>
        <title>ActivityFinder</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <Sidebar />
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Activi<span className="text-[hsl(280,100%,70%)]">ty</span> Finder
          </h1>
        </div>
      </main>
    </>
  );
}