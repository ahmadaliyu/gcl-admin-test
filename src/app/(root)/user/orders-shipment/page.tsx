"use client";
import OrdersShipment from "@/components/pages/user/orders-shipment";
import { Suspense } from "react";
import React from "react";

function page() {
  return (
    <Suspense>
      <OrdersShipment />
    </Suspense>
  );
}

export default page;
