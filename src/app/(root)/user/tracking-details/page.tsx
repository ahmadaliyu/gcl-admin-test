"use client";
import { Suspense } from "react";
import React from "react";
import TrackingDetails from "@/components/pages/user/tracking-details";

function page() {
  return (
    <Suspense>
      <TrackingDetails />
    </Suspense>
  );
}

export default page;
