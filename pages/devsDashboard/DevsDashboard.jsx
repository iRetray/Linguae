import React from "react";

import Head from "next/head";
import Link from "next/link";

import { GoBack } from "../../components";

export default function DevsDashboard() {
  return (
    <div className="DevsDashboardContainer">
      <Head>
        <title>Linguage | Dashboard</title>
      </Head>
      <Link href="/" passHref={true}>
        <GoBack previousPageName="Home" />
      </Link>
      <h1>Dashboard for Devs</h1>
    </div>
  );
}
