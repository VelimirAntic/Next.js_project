import React from "react";
import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import { withRouter } from "../helpers/route";

interface PageProps {
  title: string;
  children?: any;
}

const Page = ({ title, children }: PageProps) => {
  const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME;
  const app_url = process.env.NEXT_PUBLIC_APP_URL;

  return (
    <div>
      <div className="all-page">
        <Head>
          <title>
            {businessName + " - "}
            {title}
          </title>

          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content={`NFT Collection Generator - ${businessName}`}
          />
          <meta
            name="description"
            content="Create a 10,000 NFT collection with Rarity settings from your assets with SOL and ETH metadata. Ready to mint at blockchain or marketplaces."
          />
          <meta name="robots" content="index, follow" />
          <meta
            name="keywords"
            content="NFT, NFT Art Generator, Art Generator, Layered Art Generator, Collectibles, NFT Generator, NFT Collections, NFT Random"
          />
          <meta
            name="twitter:title"
            content="Create a 10,000 NFT collection with Rarity settings from your assets with SOL and ETH metadata."
          />
          <link
            rel="canonical"
            href={`https://${businessName?.toLowerCase()}.com/`}
          />

          <link rel="icon" href={`${app_url}/favicon.ico`} />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          ></link>
        </Head>

        {/* Toast */}
        <ToastContainer draggable={false} position="top-center" icon={false} />

        <Navbar />

        <main>{children}</main>

        <Footer />
      </div>
    </div>
  );
};

export default withRouter(Page);
