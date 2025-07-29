"use client";
import { Suspense } from "react";
import React from "react";
import ServiceManagement from "@/components/pages/user/service-management";

function page() {
  return (
    <Suspense>
      <ServiceManagement />
    </Suspense>
  );
}

export default page;
