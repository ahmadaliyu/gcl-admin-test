import UserDashboardWrapper from "@/components/layout/user/user-dashboard-wrapper";
import DashboardSkeleton from "@/components/ui/dashboard-skeleton";
import { useGetBookingById } from "@/services";
import { useParams, useRouter } from "next/navigation";

export default function TrackingOrderPage() {
  const router = useRouter();
  const handleTrack = () => {
    router.push("/user/tracking-details");
  };

  const params = useParams();

  const { data, isPending } = useGetBookingById(params?.id as string);

  if (isPending) {
    return <DashboardSkeleton />;
  }

  // console.log(data, 7777);

  return (
    <UserDashboardWrapper>
      <div className="min-h-screen bg-white text-gray-800">
        <div className="max-screen-wrapper">
          <div className="max-screen-inner">
            <div className="p-6">
              <h1 className="text-2xl font-semibold mb-4">
                Orders &amp; Shipments
              </h1>

              {/* Breadcrumb */}
              <div className="mb-6 flex items-center text-sm text-gray-600">
                <span>Overview</span>
                <span className="mx-2">&gt;</span>
                <span>Shipping Details</span>
                <span className="mx-2">&gt;</span>
                <span className="text-blue-600 font-medium">
                  Tracking Order ID {params?.id}
                </span>
              </div>

              {/* Shipping Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded-lg p-4 mb-6">
                <div>
                  <p className="font-regular text-[#777777]">Shipped From</p>
                  <p>Global Corporate Logistics</p>
                  <p>666 Lucky Street, Accra. E1 2AA</p>
                  <p>me@company.com</p>
                  <p>+447899555555</p>
                  <p>Date: 2nd March 2025</p>
                </div>

                <div>
                  <p className="font-regular text-[#777777]">Ship To</p>
                  <p>Donald Maroni</p>
                  <p>666 Luckier Street, Ciaro. E1 2AA</p>
                  <p>finance@client.com</p>
                  <p>Expected Delivery Date: 4th March 2025</p>
                </div>

                <div>
                  <p className="font-regular text-[#777777]">Courier Service</p>
                  <p>DHL Express</p>
                  <p>666 Lucky Street, Accra. E1 2AA</p>
                  <p>me@company.com</p>
                  <p>Current Location: Lagos, Nigeria → London, UK</p>
                  <p>
                    Next Expected Scan Location: Customs Clearance, Heathrow
                  </p>
                </div>
              </div>

              {/* Package Information */}
              <div className="border rounded-lg p-4 mb-6">
                <p className="font-semibold mb-2">Package Information</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Tracking ID</p>
                    <p className="font-medium">AHBGH689BF3757JIEJ28</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gross Weight</p>
                    <p className="font-medium">46kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Package Category</p>
                    <p className="font-medium">Clothes and Shoes</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      In Transit
                    </span>
                  </div>
                </div>
              </div>

              {/* Related Invoice */}
              <div className="border rounded-lg p-4 mb-6">
                <p className="font-semibold mb-2">Related Invoice</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Invoice Number</p>
                    <p className="font-medium">1455</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment Status</p>
                    <p className="font-medium">Paid</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-medium">$3000</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={handleTrack}
                  className="w-full px-6 py-2 border border-blue-500 text-blue-600 rounded-full hover:bg-blue-50 transition"
                >
                  Track Shipment
                </button>
                <button
                  onClick={() => router.back()}
                  className="w-full px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100 transition"
                >
                  Back to Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserDashboardWrapper>
  );
}
