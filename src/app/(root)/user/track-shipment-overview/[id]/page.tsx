"use client";
import { Suspense } from "react";
import React from "react";
import TrackShipmentOverview from "@/components/pages/user/track-shipment-overview/[id]";

function page() {
  return (
    <Suspense>
      <TrackShipmentOverview />
    </Suspense>
  );
}

export default page;
