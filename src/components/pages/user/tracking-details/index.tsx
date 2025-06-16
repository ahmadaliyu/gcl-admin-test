import React from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import UserDashboardWrapper from "@/components/layout/user/user-dashboard-wrapper";
import { useParams, useRouter } from "next/navigation";

const TrackingDetails = () => {
  const timeline = [
    {
      label: "Order Placed",
      date: "March 1, 2025, 09:30 AM",
      status: "completed",
    },
    {
      label: "Package Picked Up",
      date: "March 1, 2025, 02:15 PM",
      status: "completed",
    },
    {
      label: "Departed Sorting Facility (Lagos, Nigeria)",
      date: "March 2, 2025, 05:45 PM",
      status: "completed",
    },
    {
      label: "In Transit to Destination (Air Freight)",
      date: null,
      status: "completed",
    },
    {
      label: "Arriving at Customs (UK Heathrow)",
      date: "March 3, 2025, 06:00 AM",
      status: "completed",
    },
    { label: "Cleared Customs", date: "TBD", status: "completed" },
    { label: "Out for Delivery", date: "TBD", status: "completed" },
    { label: "Delivered", date: null, status: "pending" },
  ];

  const router = useRouter();

  return (
    <UserDashboardWrapper>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Orders & Shipments</h1>

        <div className="text-sm text-gray-500">
          Overview &gt; Shipping Details &gt;{" "}
          <span className="text-black font-medium">
            Tracking Order ID TLEZY12647488881
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* Left - Timeline */}
          <div className="space-y-6">
            <div className="border-l-2 border-red-600 pl-4 relative">
              {timeline.map((item, index) => (
                <div key={index} className="mb-6">
                  <div className="absolute -left-2 w-4 h-4 rounded-full bg-red-600"></div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    {item.date && <span>{item.date}</span>}
                    {item.status === "completed" && (
                      <span className="text-green-600 flex items-center gap-1">
                        <CheckIcon /> Completed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 text-sm gap-6">
              <div>
                <h3 className="font-semibold mb-2">Details:</h3>
                <p>
                  <b>Tracking Number:</b> 00010
                </p>
                <p>
                  <b>Shipment Status:</b> 📦 In Transit
                </p>
                <p>
                  <b>Estimated Delivery Date:</b> 🗓 March 5, 2025
                </p>
                <p>
                  <b>Courier Service:</b> 🚚 DHL Express / FedEx / UPS
                </p>
                <p>
                  <b>Current Location:</b> 📍 Lagos, Nigeria → London, UK
                </p>
                <p>
                  <b>Next Expected Scan Location:</b> 📍 Customs Clearance,
                  Heathrow Airport
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">From:</h3>
                <p>Global Corporate Logistics</p>
                <p>666 Lucky Street, London, E1 2AA</p>
                <p>www.gcl.com</p>
                <p>gclcompany.com</p>
                <p>+4470116220</p>

                <h3 className="font-semibold mt-4 mb-2">To:</h3>
                <p>Ambrose Jones</p>
                <p>666 Lucker Street, Lagos, Nigeria</p>
                <p>AmbroseJones@gmail.com</p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-red-600 mb-2">
                Package Details
              </h3>
              <ul className="list-disc pl-6 text-sm">
                <li>Item Description 1: Electronics – Laptop (3kg)</li>
                <li>Item Description 2: Electronics – Laptop (3kg)</li>
                <li>Item Description 3: Electronics – Laptop (3kg)</li>
                <li>Item Description 4: Electronics – Laptop (3kg)</li>
                <li>Weight & Dimensions 1: 📦 3kg, 35x25x10 cm</li>
                <li>Weight & Dimensions 2: 📦 3kg, 35x25x10 cm</li>
                <li>Weight & Dimensions 3: 📦 3kg, 35x25x10 cm</li>
                <li>Weight & Dimensions 4: 📦 3kg, 35x25x10 cm</li>
                <li>Shipment Type: Express / Economy / Standard</li>
              </ul>
              <p className="mt-2 text-sm">
                <b>Insurance Status:</b> Covered (Yes/No)
                <br />
                <b>Delivery Signature Required:</b> ✅ Yes / ❌ No
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => router.push("/user/overview")}
            className="w-full px-6 py-2 border border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition"
          >
            Back to Overview
          </button>
          <button className="w-full px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100 transition">
            Notify Customer
          </button>
        </div>
      </div>
    </UserDashboardWrapper>
  );
};

export default TrackingDetails;
