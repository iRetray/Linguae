import React from "react";

import Head from "next/head";
import Link from "next/link";

import { GoBack } from "../../components";

const CreateAccount = () => {
  return (
    <div className="CreateAccountContainer">
      <Head>
        <title>Linguage | Create account</title>
      </Head>
      <Link href="/addContent" passHref={true}>
        <GoBack previousPageName="Create contents" />
      </Link>
      <h1>Create account</h1>
      <p>Develop here the form to create a new account, dear Dev ;)</p>
    </div>
  );
};

export default CreateAccount;
