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

  console.log(isModalOpen, "isModalOpen");

  const { data, isLoading } = useGetBooking();

  // Filter bookings based on active tab
  const filteredBookings = useMemo(() => {
    if (!data?.data) return [];

    // For now, all packages are considered "Sent" - adjust this if your data structure changes
    const isAll = true; // All packages are sent packages in current implementation

    return data.data.bookings.filter((booking) => {
      if (activeTab === TabIds.All) {
        return isAll; // Show all packages in All tab
      } else {
        return !isAll;
      }
    });
  }, [data, activeTab]);

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
      <div className="w-full flex gap-[16px]">
        {/* Date filter dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex border gap-[10px] border-[#CCCCCC] bg-[#F7F7F7] rounded-[8px] h-[40px] items-center justify-center px-[24px]">
              <span>Filter by Date</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 7.25C10.3674 7.25 10.2402 7.30268 10.1464 7.39645C10.0527 7.49021 10 7.61739 10 7.75C10 7.88261 10.0527 8.00979 10.1464 8.10355C10.2402 8.19732 10.3674 8.25 10.5 8.25H13.5C13.6326 8.25 13.7598 8.19732 13.8536 8.10355C13.9473 8.00979 14 7.88261 14 7.75C14 7.61739 13.9473 7.49021 13.8536 7.39645C13.7598 7.30268 13.6326 7.25 13.5 7.25H10.5ZM9.5 12.75C9.5 13.0152 9.39464 13.2696 9.20711 13.4571C9.01957 13.6446 8.76522 13.75 8.5 13.75C8.23478 13.75 7.98043 13.6446 7.79289 13.4571C7.60536 13.2696 7.5 13.0152 7.5 12.75C7.5 12.4848 7.60536 12.2304 7.79289 12.0429C7.98043 11.8554 8.23478 11.75 8.5 11.75C8.76522 11.75 9.01957 11.8554 9.20711 12.0429C9.39464 12.2304 9.5 12.4848 9.5 12.75ZM9.5 16.25C9.5 16.5152 9.39464 16.7696 9.20711 16.9571C9.01957 17.1446 8.76522 17.25 8.5 17.25C8.23478 17.25 7.98043 17.1446 7.79289 16.9571C7.60536 16.7696 7.5 16.5152 7.5 16.25C7.5 15.9848 7.60536 15.7304 7.79289 15.5429C7.98043 15.3554 8.23478 15.25 8.5 15.25C8.76522 15.25 9.01957 15.3554 9.20711 15.5429C9.39464 15.7304 9.5 15.9848 9.5 16.25ZM12 13.75C12.2652 13.75 12.5196 13.6446 12.7071 13.4571C12.8946 13.2696 13 13.0152 13 12.75C13 12.4848 12.8946 12.2304 12.7071 12.0429C12.5196 11.8554 12.2652 11.75 12 11.75C11.7348 11.75 11.4804 11.8554 11.2929 12.0429C11.1054 12.2304 11 12.4848 11 12.75C11 13.0152 11.1054 13.2696 11.2929 13.4571C11.4804 13.6446 11.7348 13.75 12 13.75ZM13 16.25C13 16.5152 12.8946 16.7696 12.7071 16.9571C12.5196 17.1446 12.2652 17.25 12 17.25C11.7348 17.25 11.4804 17.1446 11.2929 16.9571C11.1054 16.7696 11 16.5152 11 16.25C11 15.9848 11.1054 15.7304 11.2929 15.5429C11.4804 15.3554 11.7348 15.25 12 15.25C12.2652 15.25 12.5196 15.3554 12.7071 15.5429C12.8946 15.7304 13 15.9848 13 16.25ZM15.5 13.75C15.7652 13.75 16.0196 13.6446 16.2071 13.4571C16.3946 13.2696 16.5 13.0152 16.5 12.75C16.5 12.4848 16.3946 12.2304 16.2071 12.0429C16.0196 11.8554 15.7652 11.75 15.5 11.75C15.2348 11.75 14.9804 11.8554 14.7929 12.0429C14.6054 12.2304 14.5 12.4848 14.5 12.75C14.5 13.0152 14.6054 13.2696 14.7929 13.4571C14.9804 13.6446 15.2348 13.75 15.5 13.75Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 3.5C8.13261 3.5 8.25979 3.55268 8.35355 3.64645C8.44732 3.74021 8.5 3.86739 8.5 4V5H15.5V4C15.5 3.86739 15.5527 3.74021 15.6464 3.64645C15.7402 3.55268 15.8674 3.5 16 3.5C16.1326 3.5 16.2598 3.55268 16.3536 3.64645C16.4473 3.74021 16.5 3.86739 16.5 4V5.003C16.7447 5.005 16.9627 5.01367 17.154 5.029C17.519 5.059 17.839 5.122 18.135 5.272C18.6053 5.51189 18.9875 5.89451 19.227 6.365C19.378 6.661 19.441 6.981 19.471 7.345C19.5 7.7 19.5 8.137 19.5 8.679V16.321C19.5 16.863 19.5 17.301 19.471 17.654C19.441 18.019 19.378 18.339 19.227 18.635C18.9874 19.1051 18.6051 19.4874 18.135 19.727C17.839 19.878 17.519 19.941 17.155 19.971C16.8 20 16.363 20 15.822 20H8.179C7.637 20 7.199 20 6.846 19.971C6.481 19.941 6.161 19.878 5.865 19.727C5.39451 19.4875 5.01189 19.1053 4.772 18.635C4.622 18.339 4.559 18.019 4.529 17.655C4.5 17.3 4.5 16.862 4.5 16.32V8.68C4.5 8.205 4.5 7.812 4.52 7.483L4.529 7.347C4.559 6.982 4.622 6.662 4.772 6.366C5.01173 5.89535 5.39435 5.51272 5.865 5.273C6.161 5.123 6.481 5.06 6.845 5.03C7.03767 5.01467 7.256 5.006 7.5 5.004V4C7.5 3.86739 7.55268 3.74021 7.64645 3.64645C7.74021 3.55268 7.86739 3.5 8 3.5ZM7.5 6.5V6.003C7.3088 6.00458 7.11771 6.01225 6.927 6.026C6.625 6.05 6.451 6.096 6.319 6.163C6.03651 6.30685 5.80685 6.53651 5.663 6.819C5.596 6.951 5.55 7.125 5.526 7.427C5.5 7.736 5.5 8.132 5.5 8.7V9.25H18.5V8.7C18.5 8.132 18.5 7.736 18.474 7.427C18.45 7.125 18.404 6.951 18.337 6.819C18.1931 6.53651 17.9635 6.30685 17.681 6.163C17.549 6.096 17.375 6.05 17.073 6.026C16.8823 6.01225 16.6912 6.00458 16.5 6.003V6.5C16.5 6.63261 16.4473 6.75979 16.3536 6.85355C16.2598 6.94732 16.1326 7 16 7C15.8674 7 15.7402 6.94732 15.6464 6.85355C15.5527 6.75979 15.5 6.63261 15.5 6.5V6H8.5V6.5C8.5 6.63261 8.44732 6.75979 8.35355 6.85355C8.25979 6.94732 8.13261 7 8 7C7.86739 7 7.74021 6.94732 7.64645 6.85355C7.55268 6.75979 7.5 6.63261 7.5 6.5ZM18.5 10.25H5.5V16.3C5.5 16.868 5.5 17.265 5.526 17.573C5.55 17.875 5.596 18.049 5.663 18.181C5.80685 18.4635 6.03651 18.6931 6.319 18.837C6.451 18.904 6.625 18.95 6.927 18.974C7.236 19 7.632 19 8.2 19H15.8C16.368 19 16.765 19 17.073 18.974C17.375 18.95 17.549 18.904 17.681 18.837C17.9635 18.6931 18.1931 18.4635 18.337 18.181C18.404 18.049 18.45 17.875 18.474 17.573C18.5 17.265 18.5 16.868 18.5 16.3V10.25Z"
                  fill="black"
                />
              </svg>
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

        {/* Status filter dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex border gap-[10px] border-[#CCCCCC] bg-[#F7F7F7] rounded-[8px] h-[40px] items-center justify-center px-[24px]">
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
        {/* Status filter dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex border gap-[10px] border-[#CCCCCC] bg-[#F7F7F7] rounded-[8px] h-[40px] items-center justify-center px-[24px]">
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
                <TableRow onClick={() => setIsModalOpen(true)} key={service.id}>
                  {/* Order ID */}
                  <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px] flex items-center gap-2">
                    <img src="/images/outer (2).png" className="w-[40px]" />
                    {service.code || "N/A"}
                  </TableCell>

                  {/* Customer Name */}
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
