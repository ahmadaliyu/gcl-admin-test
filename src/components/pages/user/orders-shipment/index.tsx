import UserDashboardWrapper from "@/components/layout/user/user-dashboard-wrapper";
import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetBooking } from "@/services";
import OrderDetailsModal from "@/components/reuseables/OrderDetailModal";
import DashboardSkeleton from "@/components/ui/dashboard-skeleton";

enum TabIds {
  All = "All",
  ConsolidationAndBulkTracking = "Consolidation & Bulk Tracking",
  RequestManagement = "Request Management",
}

const tabs = [
  { id: TabIds.All, title: "All" },
  {
    id: TabIds.ConsolidationAndBulkTracking,
    title: "Consolidation & Bulk Tracking",
  },
];

function OrdersShipment() {
  const [activeTab, setActiveTab] = useState<TabIds>(TabIds.All);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const { data, isLoading } = useGetBooking();

  // Filter bookings based on active tab
  const filteredBookings = useMemo(() => {
    if (!data?.data) return [];

    const isAll = true;

    return data?.data?.bookings.filter((booking) => {
      if (activeTab === TabIds.All) {
        return isAll; // Show all packages in All tab
      } else {
        return !isAll;
      }
    });
  }, [data, activeTab]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <UserDashboardWrapper>
      {isLoading && (
        <div className="flex items-center justify-center h-screen">
          <div className="text-gray-600 text-lg animate-pulse">Loading...</div>
        </div>
      )}
      <h1 className="text-[#272727] font-[600] text-[24px] mb-[56px]">
        My Bookings
      </h1>
      <div className="flex justify-start mb-[24px] border-b-[#E3E3E3] border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-[185px] py-[12px] text-[12px] font-medium text-[#272727] ${
              activeTab === tab.id
                ? "bg-[#FCE8E9] border-b-[3px] border-[#E51520] font-[600]"
                : "bg-transparent border-b-[3px] border-transparent font-[400]"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="w-full flex flex-wrap gap-4 md:gap-6">
        {/* Each dropdown wrapped for consistent sizing and spacing */}
        <div className="w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full sm:w-auto flex border gap-2 border-[#CCCCCC] bg-[#F7F7F7] rounded-[8px] h-[40px] items-center justify-center px-6">
                <span>Filter by Date</span>
                {/* SVG icon unchanged */}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[148px] rounded-[16px] p-2">
              <DropdownMenuLabel>Filter</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>Option 1</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Option 2</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Option 3</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full sm:w-auto flex border gap-2 border-[#CCCCCC] bg-[#F7F7F7] rounded-[8px] h-[40px] items-center justify-center px-6">
                {/* Filter icon */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 7H19.5M7 12H17M10 17H14"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Filter by Status</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[148px] rounded-[16px] p-2">
              <DropdownMenuLabel>Select status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>All Statuses</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>In Transit</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Delivered</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Cancelled</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full sm:w-auto flex border gap-2 border-[#CCCCCC] bg-[#F7F7F7] rounded-[8px] h-[40px] items-center justify-center px-6">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 7H19.5M7 12H17M10 17H14"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Filter by Freight Request</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[148px] rounded-[16px] p-2">
              <DropdownMenuLabel>Select Request</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>All Request</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div>
        <Table className="mb-[100px] mt-[16px]">
          <TableHeader>
            <TableRow className="bg-[#FCE8E9] hover:bg-[#FCE8E9]">
              {[
                "Order ID",
                "Customer Name",
                "Freight Category",
                "Company",
                "Status",
                "Created Date",
                "Action",
              ].map((header) => (
                <TableHead
                  key={header}
                  className="text-[#272727] font-medium text-[14px] py-[16px] px-[8px]"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((service) => (
                <TableRow
                  onClick={() => {
                    setIsModalOpen(true);
                    setBookingId(service?.id);
                  }}
                  key={service.id}
                >
                  {/* Order ID */}
                  <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px] flex items-center gap-2">
                    <img src="/images/outer (2).png" className="w-[40px]" />
                    {service.code || "N/A"}
                  </TableCell>

                  <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                    {/* {service.customerName || "N/A"} */}
                    {"N/A"}
                  </TableCell>

                  {/* Freight Category */}
                  <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                    {"Air Freight" /* Replace with dynamic if available */}
                  </TableCell>

                  {/* Company */}
                  <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                    {"N/A" /* Replace with dynamic if available */}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="border-b border-b-[#E3E3E3] py-[30px] px-[8px]">
                    <div
                      className={`border h-[41px] flex items-center justify-center font-medium w-[106px] px-[8px] rounded-[32px] ${
                        service.status === "In Transit"
                          ? "bg-[#FFF6C5] border-[#BB5802] text-[#BB5802]"
                          : service.status === "Delivered"
                          ? "bg-[#EAF0F6] border-[#02044A] text-[#02044A]"
                          : service.status === "Cancelled"
                          ? "bg-[#FCE8E9] border-[#E51520] text-[#E51520]"
                          : "border-[#E3E3E3]"
                      }`}
                    >
                      {service.status}
                    </div>
                  </TableCell>

                  {/* Created Date */}
                  <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                    {new Date(service.createdAt).toLocaleDateString()}
                  </TableCell>

                  {/* Action */}
                  <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                    <TableActions
                      bookingId={service.id}
                      status={service.status}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  No bookings found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {isModalOpen && (
        <OrderDetailsModal
          bookingId={bookingId}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </UserDashboardWrapper>
  );
}

export default OrdersShipment;

interface TableActionsProps {
  bookingId: string;
  status: string;
}

const TableActions: React.FC<TableActionsProps> = ({ bookingId, status }) => {
  return (
    <div className="flex items-center justify-start gap-[4px]">
      <button>
        <svg
          width="33"
          height="33"
          viewBox="0 0 33 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.8008 20.5C19.0099 20.5 20.8008 18.7091 20.8008 16.5C20.8008 14.2909 19.0099 12.5 16.8008 12.5C14.5916 12.5 12.8008 14.2909 12.8008 16.5C12.8008 18.7091 14.5916 20.5 16.8008 20.5Z"
            fill="#0088DD"
          />
          <path
            d="M31.7404 16.16C30.5642 13.1176 28.5223 10.4866 25.8672 8.59209C23.212 6.69756 20.0598 5.62257 16.8004 5.5C13.5409 5.62257 10.3887 6.69756 7.73356 8.59209C5.07837 10.4866 3.03652 13.1176 1.86036 16.16C1.78092 16.3797 1.78092 16.6203 1.86036 16.84C3.03652 19.8824 5.07837 22.5134 7.73356 24.4079C10.3887 26.3024 13.5409 27.3774 16.8004 27.5C20.0598 27.3774 23.212 26.3024 25.8672 24.4079C28.5223 22.5134 30.5642 19.8824 31.7404 16.84C31.8198 16.6203 31.8198 16.3797 31.7404 16.16ZM16.8004 23C15.5148 23 14.2581 22.6188 13.1892 21.9046C12.1202 21.1903 11.2871 20.1752 10.7951 18.9874C10.3032 17.7997 10.1744 16.4928 10.4253 15.2319C10.6761 13.971 11.2951 12.8128 12.2042 11.9038C13.1132 10.9948 14.2714 10.3757 15.5323 10.1249C16.7931 9.87409 18.1001 10.0028 19.2878 10.4948C20.4755 10.9868 21.4907 11.8199 22.2049 12.8888C22.9191 13.9577 23.3004 15.2144 23.3004 16.5C23.2977 18.2231 22.612 19.8749 21.3936 21.0933C20.1752 22.3117 18.5235 22.9974 16.8004 23Z"
            fill="#0088DD"
          />
        </svg>
      </button>

      <button>
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.7969 16.4062C12.276 16.4062 12.6927 16.5833 13.0469 16.9375C13.401 17.2917 13.5781 17.7083 13.5781 18.1875C13.5781 18.6875 13.401 19.1146 13.0469 19.4688C12.6927 19.8021 12.276 19.9688 11.7969 19.9688C11.2969 19.9688 10.8698 19.8021 10.5156 19.4688C10.1823 19.1146 10.0156 18.6875 10.0156 18.1875C10.0156 17.7083 10.1823 17.2917 10.5156 16.9375C10.8698 16.5833 11.2969 16.4062 11.7969 16.4062ZM24.2031 16.4062C24.7031 16.4062 25.1198 16.5833 25.4531 16.9375C25.8073 17.2917 25.9844 17.7083 25.9844 18.1875C25.9844 18.6875 25.8073 19.1146 25.4531 19.4688C25.1198 19.8021 24.7031 19.9688 24.2031 19.9688C23.724 19.9688 23.3073 19.8021 22.9531 19.4688C22.599 19.1146 22.4219 18.6875 22.4219 18.1875C22.4219 17.7083 22.599 17.2917 22.9531 16.9375C23.3073 16.5833 23.724 16.4062 24.2031 16.4062ZM17.9844 16.4062C18.4844 16.4062 18.901 16.5833 19.2344 16.9375C19.5885 17.2917 19.7656 17.7083 19.7656 18.1875C19.7656 18.6875 19.5885 19.1146 19.2344 19.4688C18.901 19.8021 18.4844 19.9688 17.9844 19.9688C17.5052 19.9688 17.0885 19.8021 16.7344 19.4688C16.401 19.1146 16.2344 18.6875 16.2344 18.1875C16.2344 17.7083 16.401 17.2917 16.7344 16.9375C17.0885 16.5833 17.5052 16.4062 17.9844 16.4062Z"
            fill="#0064D8"
          />
        </svg>
      </button>
    </div>
  );
};
