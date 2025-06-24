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

function OrdersShipment() {
  // const [activeTab, setActiveTab] = useState<TabIds>(TabIds.All);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const { data, isLoading } = useGetBooking();

  const filteredBookings = useMemo(() => {
    if (!data?.data?.bookings) return [];

    return data.data.bookings.filter((booking) => {
      if (statusFilter !== "All") {
        return booking.status === statusFilter;
      }
      return true;
    });
  }, [data, statusFilter]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <UserDashboardWrapper>
      <h1 className="text-[#272727] font-[600] text-[24px] mb-[56px]">
        My Bookings
      </h1>

      {/* Commented Tabs */}
      {/* <div className="flex justify-start mb-[24px] border-b-[#E3E3E3] border-b">
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
      </div> */}

      <div className="w-full flex flex-wrap gap-4 md:gap-6 mb-4">
        <div className="w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full sm:w-auto flex border gap-2 border-[#CCCCCC] bg-[#F7F7F7] rounded-[8px] h-[40px] items-center justify-center px-6">
                <span>Filter by Status</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[180px] rounded-[16px] p-2">
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {[
                  "All",
                  "paid",
                  "transit",
                  "delivered",
                  "cancelled",
                  "Clearance in Progress",
                ].map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => setStatusFilter(status)}
                  >
                    <span>{status}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Placeholder - you can add Date filter logic later */}
        <div className="w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full sm:w-auto flex border gap-2 border-[#CCCCCC] bg-[#F7F7F7] rounded-[8px] h-[40px] items-center justify-center px-6">
                <span>Filter by Date</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[180px] rounded-[16px] p-2">
              <DropdownMenuLabel>Date Filter</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>Today</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>This Week</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>This Month</span>
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
              {["Order ID", "Status", "Created Date"].map((header) => (
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
                    setBookingId(String(service?.id));
                  }}
                  key={String(service.id)}
                  className="cursor-pointer"
                >
                  <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                    {service.code || "N/A"}
                  </TableCell>

                  <TableCell className="border-b border-b-[#E3E3E3] py-[30px] px-[8px]">
                    <div
                      className={`inline-flex border h-[32px] items-center justify-center font-medium px-[10px] rounded-[32px] text-[12px] whitespace-nowrap ${
                        service.status?.toLowerCase() === "transit"
                          ? "bg-[#FFF6C5] border-[#BB5802] text-[#BB5802]"
                          : service.status?.toLowerCase() === "delivered"
                          ? "bg-[#EAF0F6] border-[#02044A] text-[#02044A]"
                          : service.status?.toLowerCase() === "cancelled"
                          ? "bg-[#FCE8E9] border-[#E51520] text-[#E51520]"
                          : service.status?.toLowerCase() === "paid"
                          ? "bg-[#F4F4F4] border-[#A0A0A0] text-[#333333]"
                          : service.status?.toLowerCase() ===
                            "clearance in progress"
                          ? "bg-[#D1E9FF] border-[#1570EF] text-[#175CD3]"
                          : "bg-[#F4F4F4] border-[#A0A0A0] text-[#333333]"
                      }`}
                    >
                      {service.status || "N/A"}
                    </div>
                  </TableCell>

                  <TableCell className="border-b border-b-[#E3E3E3] font-medium py-[30px] px-[8px]">
                    {new Date(service.createdAt).toLocaleDateString()}
                  </TableCell>

                  {/* <TableCell className="border-b border-b-[#E3E3E3] py-[30px] px-[8px] text-sm text-[#636363]">
                    View
                  </TableCell> */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
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
