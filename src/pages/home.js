import React, { useEffect, useState } from "react";
import { getCustomers } from "../axios/customers";

export default function Home() {
  const load = async () => {
    try {
      const res = await getCustomers();
      console.log(res);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    load();
  }, []);
  return <div>home page</div>;
}
