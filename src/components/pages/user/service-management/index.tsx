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
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useGetServices } from "@/services/hooks/services";
import { CreateServiceSheet } from "./CreateServiceSheet";
import { CreateCourierSheet } from "./CreateCourierSheet";
import { ConfigureFullService } from "./ConfigureService";
import { CustomTabs } from "@/components/ui/tabs";
import LoadingSkeleton from "./skeleton";
import { CreateServiceLegSheet } from "./CreateLegSheet";
import FeaturesManagementTab from "./FeaturesManagement";

dayjs.extend(isToday);
dayjs.extend(isSameOrAfter);

enum StatusFilter {
  All = "all",
  Active = "active",
  Inactive = "inactive",
}

const statusOptions = [
  { id: StatusFilter.All, label: "Filter By Status" },
  { id: StatusFilter.Active, label: "Active" },
  { id: StatusFilter.Inactive, label: "Inactive" },
];

function ServicesTab() {
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>(
    StatusFilter.All
  );
  const [selectedDateFilter, setSelectedDateFilter] = useState<
    "all" | "today" | "last7days" | "thisMonth"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetServices();
  const router = useRouter();

  const filteredServices = useMemo(() => {
    const services = data?.data || [];
    if (!Array.isArray(services)) return [];

    return services.filter((service) => {
      const createdAt = dayjs(service.createdAt);

      const dateMatch =
        selectedDateFilter === "all"
          ? true
          : selectedDateFilter === "today"
          ? createdAt.isToday()
          : selectedDateFilter === "last7days"
          ? createdAt.isSameOrAfter(dayjs().subtract(7, "day"))
          : selectedDateFilter === "thisMonth"
          ? createdAt.isSame(dayjs(), "month")
          : true;

      const statusMatch =
        selectedStatus === StatusFilter.All
          ? true
          : selectedStatus === StatusFilter.Active
          ? service.is_active
          : !service.is_active;

      const searchMatch = service.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return dateMatch && statusMatch && searchMatch;
    });
  }, [data, selectedDateFilter, selectedStatus, searchTerm]);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="w-full">
      {/* Filters Section - Stack on mobile */}
      <div className="w-full flex flex-col sm:flex-row gap-3 mb-4">
        {/* Search Input - Fixed width */}
        <div className="w-full sm:w-[300px]">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-[#CCCCCC] bg-[#F7F7F7] rounded-lg h-10 px-3 text-sm w-full"
          />
        </div>

        {/* Filter Buttons - Wrap on small screens */}
        <div className="flex flex-wrap gap-2">
          {/* Date Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex-1 sm:flex-none border gap-2 border-[#CCCCCC] bg-[#F7F7F7] rounded-lg h-10 items-center justify-center px-3 text-sm min-w-[120px]">
                {selectedDateFilter === "all"
                  ? "Filter By Date"
                  : selectedDateFilter === "today"
                  ? "Today"
                  : selectedDateFilter === "last7days"
                  ? "7 Days"
                  : "Month"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 rounded-lg p-2">
              <DropdownMenuLabel>Filter by Date</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {["all", "today", "last7days", "thisMonth"].map((key) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => setSelectedDateFilter(key as any)}
                    className="text-sm capitalize"
                  >
                    {key === "last7days"
                      ? "Last 7 Days"
                      : key === "thisMonth"
                      ? "This Month"
                      : key}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex-1 sm:flex-none border gap-2 border-[#CCCCCC] bg-[#F7F7F7] rounded-lg h-10 items-center justify-center px-3 text-sm min-w-[100px]">
                {statusOptions.find((o) => o.id === selectedStatus)?.label ||
                  "Filter By Status"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 rounded-lg p-2">
              <DropdownMenuLabel className="text-sm">
                Select status
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {statusOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.id}
                    onClick={() => setSelectedStatus(option.id)}
                    className={`text-sm ${
                      selectedStatus === option.id ? "bg-gray-100" : ""
                    }`}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table Section - Horizontal scroll on mobile */}
      <div className="w-full overflow-x-auto">
        <Table className="min-w-[600px] md:min-w-full">
          <TableHeader>
            <TableRow className="bg-[#FCE8E9]">
              <TableHead className="py-3 px-2 text-sm whitespace-nowrap">
                Service
              </TableHead>
              <TableHead className="py-3 px-2 text-sm whitespace-nowrap hidden sm:table-cell">
                Type
              </TableHead>
              <TableHead className="py-3 px-2 text-sm whitespace-nowrap">
                Status
              </TableHead>
              <TableHead className="py-3 px-2 text-sm whitespace-nowrap hidden md:table-cell">
                Created
              </TableHead>
              {/* <TableHead className="py-3 px-2 text-sm whitespace-nowrap">
                Action
              </TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="py-4 px-2 font-medium whitespace-nowrap">
                    {service.name}
                  </TableCell>
                  <TableCell className="py-4 px-2 capitalize hidden sm:table-cell">
                    {service.service_type.replace(/_/g, " ")}
                  </TableCell>
                  <TableCell className="py-4 px-2">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        service.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {service.is_active ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-2 hidden md:table-cell">
                    {dayjs(service.createdAt).format("MMM D, YYYY")}
                  </TableCell>
                  {/* <TableCell className="py-4 px-2">
                    <button
                      onClick={() =>
                        router.push(`/dashboard/services/${service.id}`)
                      }
                      className="bg-[#2E7D32] hover:bg-[#256b2b] text-white text-sm px-3 py-1 rounded-md transition whitespace-nowrap"
                    >
                      View
                    </button>
                  </TableCell> */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-gray-500"
                >
                  No services found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function ServiceManagement() {
  const [activeTab, setActiveTab] = useState("services");

  const tabs = [
    {
      id: "services",
      label: "Services",
      content: <ServicesTab />,
    },
    {
      id: "features",
      label: "Features Management",
      content: <FeaturesManagementTab />,
    },
  ];

  return (
    <UserDashboardWrapper>
      {/* Header Section - Responsive Stack */}
      <div className="flex flex-col gap-4 mb-4 md:flex-row md:items-center md:justify-between md:mb-8 w-full">
        <h1 className="text-[#272727] font-semibold text-lg md:text-2xl">
          Service Management
        </h1>

        {/* Only show CreateServiceSheet on the 'services' tab */}
        {activeTab === "services" ? (
          <CreateServiceSheet />
        ) : (
          <div className="flex flex-wrap gap-2 mb-4">
            <ConfigureFullService />
            <CreateCourierSheet />
            <CreateServiceLegSheet />
          </div>
        )}
      </div>

      {/* Main Tabs */}
      <CustomTabs
        tabs={tabs}
        defaultTab="services"
        onTabChange={(tabId) => setActiveTab(tabId)}
      />
    </UserDashboardWrapper>
  );
}

export default ServiceManagement;
