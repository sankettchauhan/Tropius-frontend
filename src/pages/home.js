import React, { useEffect, useState } from "react";
import { getCustomers } from "../axios/customers";
import { getAuthorisedToken } from "../helper/auth";

export default function Home() {
  const load = async () => {
    try {
      const res = await getCustomers(getAuthorisedToken());
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    load();
  }, []);
  return <div>home page</div>;
}
