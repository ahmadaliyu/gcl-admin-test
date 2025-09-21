"use client";
import AdminCustomClearance from "@/components/pages/user/custom-clearance";
import { Suspense } from "react";
import React from "react";

function page() {
  return (
    <Suspense>
      <AdminCustomClearance />
    </Suspense>
  );
}

export default page;
