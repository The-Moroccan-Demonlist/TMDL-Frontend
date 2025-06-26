"use client"

import { useCsrfStore } from "@/stores/csrf-store";
import React, { useEffect } from "react";

export default function Home() {
  const setToken = useCsrfStore((s) => s.setToken);

  useEffect(() => {
    fetch("http://localhost:8080/api/public/csrf", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          console.log(data.to)
        }
      });
  }, [setToken]);


  return (
    <>
    </>
  );
}
