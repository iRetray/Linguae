import React from "react";

import Head from "next/head";
import Link from "next/link";

import { GoBack } from "../../components";

const AddContent = () => {
  return (
    <div className="AddContentContainer">
      <Head>
        <title>Linguage | Add content</title>
      </Head>
      <Link href="/platform" passHref={true}>
        <GoBack previousPageName="Platform" />
      </Link>
      <h1>Create new content</h1>
    </div>
  );
};

export default AddContent;
