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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useGetCouriers,
  useGetLegs,
  useGetServiceLeg,
} from "@/services/hooks/services";
import { formatLocation } from "@/lib/formatLocation";
import { formatType } from "@/lib/formatType";

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
function FeaturesManagementTab() {
  const [activeSubTab, setActiveSubTab] = useState("couriers");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>(
    StatusFilter.All
  );
  const [selectedDateFilter, setSelectedDateFilter] = useState<
    "all" | "today" | "last7days" | "thisMonth"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: legsData, isPending: isLegsLoading } = useGetLegs();
  const { data: couriersData, isPending: isCouriersLoading } = useGetCouriers();
  const { data: serviceLegsData, isPending: isServiceLegsLoading } =
    useGetServiceLeg();

  // Filter couriers data
  const filteredCouriers = useMemo(() => {
    if (isCouriersLoading || !couriersData?.data) return [];

    return couriersData.data.filter((courier) => {
      const createdAt = dayjs(courier.createdAt);

      // Date filter
      const dateMatch =
        selectedDateFilter === "all" ||
        (selectedDateFilter === "today" && createdAt.isToday()) ||
        (selectedDateFilter === "last7days" &&
          createdAt.isSameOrAfter(dayjs().subtract(7, "day"))) ||
        (selectedDateFilter === "thisMonth" &&
          createdAt.isSame(dayjs(), "month"));

      // Status filter
      const statusMatch =
        selectedStatus === StatusFilter.All ||
        (selectedStatus === StatusFilter.Active
          ? courier.is_active
          : !courier.is_active);

      // Search filter (search both name and display_name)
      const searchMatch =
        !searchTerm ||
        (courier.name?.toLowerCase().includes(searchTerm.toLowerCase()) ??
          false) ||
        (courier.display_name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ??
          false);

      return dateMatch && statusMatch && searchMatch;
    });
  }, [
    selectedDateFilter,
    selectedStatus,
    searchTerm,
    couriersData,
    isCouriersLoading,
  ]);

  // Filter legs data
  const filteredLegs = useMemo(() => {
    if (isLegsLoading || !legsData?.data) return [];

    return legsData.data.filter((leg) => {
      const createdAt = dayjs(leg.createdAt);

      const dateMatch =
        selectedDateFilter === "all" ||
        (selectedDateFilter === "today" && createdAt.isToday()) ||
        (selectedDateFilter === "last7days" &&
          createdAt.isSameOrAfter(dayjs().subtract(7, "day"))) ||
        (selectedDateFilter === "thisMonth" &&
          createdAt.isSame(dayjs(), "month"));

      const statusMatch =
        selectedStatus === StatusFilter.All ||
        (selectedStatus === StatusFilter.Active
          ? leg.is_active
          : !leg.is_active);

      const searchMatch =
        !searchTerm ||
        leg.name.toLowerCase().includes(searchTerm.toLowerCase());

      return dateMatch && statusMatch && searchMatch;
    });
  }, [legsData, selectedDateFilter, selectedStatus, searchTerm, isLegsLoading]);

  // Filter service legs data
  const filteredServiceLegs = useMemo(() => {
    if (isServiceLegsLoading || !serviceLegsData?.data) return [];

    return serviceLegsData.data.filter((serviceLeg) => {
      const createdAt = dayjs(serviceLeg.createdAt);

      // Date filter
      const dateMatch =
        selectedDateFilter === "all" ||
        (selectedDateFilter === "today" && createdAt.isToday()) ||
        (selectedDateFilter === "last7days" &&
          createdAt.isSameOrAfter(dayjs().subtract(7, "day"))) ||
        (selectedDateFilter === "thisMonth" &&
          createdAt.isSame(dayjs(), "month"));

      // Status filter
      const statusMatch =
        selectedStatus === StatusFilter.All ||
        (selectedStatus === StatusFilter.Active
          ? serviceLeg.is_active
          : !serviceLeg.is_active);

      // Search filter
      const searchMatch =
        !searchTerm ||
        serviceLeg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (serviceLeg.service_type
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ??
          false);

      return dateMatch && statusMatch && searchMatch;
    });
  }, [
    serviceLegsData,
    selectedDateFilter,
    selectedStatus,
    searchTerm,
    isServiceLegsLoading,
  ]);

  return (
    <div className="w-full">
      {/* Filters Section */}
      <div className="w-full flex flex-col sm:flex-row gap-3 mb-4">
        {/* Search Input */}
        <div className="w-full sm:w-[300px]">
          <input
            type="text"
            placeholder={`Search ${
              activeSubTab === "couriers"
                ? "couriers"
                : activeSubTab === "legs"
                ? "legs"
                : "service legs"
            }...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-[#CCCCCC] bg-[#F7F7F7] rounded-lg h-10 px-3 text-sm w-full"
          />
        </div>

        {/* Filter Buttons */}
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

      {/* Sub-tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveSubTab("couriers")}
          className={`px-4 py-2 text-sm font-medium ${
            activeSubTab === "couriers"
              ? "border-b-2 border-[#2E7D32] text-[#2E7D32]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Courier Services
        </button>
        <button
          onClick={() => setActiveSubTab("legs")}
          className={`px-4 py-2 text-sm font-medium ${
            activeSubTab === "legs"
              ? "border-b-2 border-[#2E7D32] text-[#2E7D32]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Legs
        </button>
        <button
          onClick={() => setActiveSubTab("service-legs")}
          className={`px-4 py-2 text-sm font-medium ${
            activeSubTab === "service-legs"
              ? "border-b-2 border-[#2E7D32] text-[#2E7D32]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Service Legs
        </button>
      </div>

      {/* Content based on active sub-tab */}
      {activeSubTab === "couriers" ? (
        <div className="w-full overflow-x-auto">
          <Table className="min-w-[800px] md:min-w-full">
            <TableHeader>
              <TableRow className="bg-[#FCE8E9]">
                <TableHead className="py-3 px-2 text-sm whitespace-nowrap"></TableHead>
                <TableHead className="py-3 px-2 text-sm whitespace-nowrap">
                  Display Name
                </TableHead>
                <TableHead className="py-3 px-2 text-sm whitespace-nowrap">
                  Internal Name
                </TableHead>
                <TableHead className="py-3 px-2 text-sm whitespace-nowrap">
                  DC Name
                </TableHead>
                <TableHead className="py-3 px-2 text-sm whitespace-nowrap">
                  Auth Company
                </TableHead>
                <TableHead className="py-3 px-2 text-sm whitespace-nowrap">
                  Pricing Rule
                </TableHead>
                <TableHead className="py-3 px-2 text-sm whitespace-nowrap">
                  Short Description
                </TableHead>
                <TableHead className="py-3 px-2 text-sm whitespace-nowrap">
                  Long Name
                </TableHead>
                <TableHead className="py-3 px-2 text-sm whitespace-nowrap">
                  Status
                </TableHead>
                <TableHead className="py-3 px-2 text-sm whitespace-nowrap">
                  Created
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isCouriersLoading ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#CC1F2F]" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredCouriers.length > 0 ? (
                filteredCouriers.map((courier) => (
                  <TableRow key={courier.id}>
                    <TableCell className="py-4 px-2">
                      {courier.image_url && (
                        <img
                          src={courier.image_url}
                          alt={courier.display_name}
                          className="h-8 w-8 object-contain"
                        />
                      )}
                    </TableCell>
                    <TableCell className="py-4 px-2 font-medium whitespace-nowrap">
                      {courier.display_name}
                    </TableCell>
                    <TableCell className="py-4 px-2">{courier.name}</TableCell>
                    <TableCell className="py-4 px-2">
                      {formatType(courier.courier_dc_name) || "N/A"}
                    </TableCell>
                    <TableCell className="py-4 px-2">
                      {courier.auth_company || "N/A"}
                    </TableCell>
                    <TableCell className="py-4 px-2">
                      {formatType(courier.pricing_rule) || "N/A"}
                    </TableCell>
                    <TableCell className="py-4 px-2">
                      {courier.short_description || "N/A"}
                    </TableCell>
                    <TableCell className="py-4 px-2">
                      {courier.long_name || "N/A"}
                    </TableCell>
                    <TableCell className="py-4 px-2">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          courier.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {courier.is_active ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-2">
                      {dayjs(courier.createdAt).format("MMM D, YYYY")}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center py-8 text-gray-500"
                  >
                    {couriersData?.data?.length === 0
                      ? "No couriers available"
                      : "No couriers found matching your filters"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : activeSubTab === "legs" ? (
        <div className="w-full overflow-x-auto">
          <Table className="min-w-[600px] md:min-w-full">
            <TableHeader>
              <TableRow className="bg-[#FCE8E9]">
                <TableHead className="py-3 px-2 text-sm whitespace-nowrap">
                  Leg Name
                </TableHead>
                <TableHead className="py-3 px-2 text-sm whitespace-nowrap">
                  Origin
                </TableHead>
                <TableHead className="py-3 px-2 text-sm whitespace-nowrap">
                  Destination
                </TableHead>
                <TableHead className="py-3 px-2 text-sm whitespace-nowrap">
                  Handling Fee
                </TableHead>
                <TableHead className="py-3 px-2 text-sm whitespace-nowrap">
                  Courier Handler
                </TableHead>
                <TableHead className="py-3 px-2 text-sm whitespace-nowrap">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLegsLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#CC1F2F]" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : (filteredLegs?.length ?? 0) > 0 ? (
                (filteredLegs ?? []).map((leg) => (
                  <TableRow key={leg.id}>
                    <TableCell className="py-4 px-2 font-medium whitespace-nowrap">
                      {leg.name}
                    </TableCell>
                    <TableCell className="py-4 px-2">
                      {formatLocation(leg.origin_name)} (
                      {leg.origin_country.toUpperCase()})
                    </TableCell>
                    <TableCell className="py-4 px-2">
                      {formatLocation(leg.destination_name)} (
                      {leg.destination_country.toUpperCase()})
                    </TableCell>
                    <TableCell className="py-4 px-2">
                      ${leg.handling_fee}
                    </TableCell>
                    <TableCell className="py-4 px-2">
                      {leg.courier_handler}
                    </TableCell>
                    <TableCell className="py-4 px-2">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          leg.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {leg.is_active ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-gray-500"
                  >
                    {legsData?.data?.length === 0
                      ? "No legs available"
                      : "No legs found matching your filters"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <Table className="min-w-[800px] md:min-w-full">
            <TableHeader>
              <TableRow className="bg-[#FCE8E9]">
                <TableHead className="py-3 px-2 text-sm whitespace-nowrap"></TableHead>
                <TableHead className="py-3 px-2 text-sm whitespace-nowrap">
                  Service Name
                </TableHead>
                <TableHead className="py-3 px-2 text-sm whitespace-nowrap">
                  Service Type
                </TableHead>
                <TableHead className="py-3 px-2 text-sm whitespace-nowrap">
                  Status
                </TableHead>
                <TableHead className="py-3 px-2 text-sm whitespace-nowrap">
                  Created
                </TableHead>
                <TableHead className="py-3 px-2 text-sm whitespace-nowrap">
                  Associated Legs
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isServiceLegsLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#CC1F2F]" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : (filteredServiceLegs?.length ?? 0) > 0 ? (
                (filteredServiceLegs ?? []).map((serviceLeg) => (
                  <TableRow key={serviceLeg.id}>
                    <TableCell className="py-4 px-2">
                      {serviceLeg.image_url && (
                        <img
                          src={serviceLeg.image_url}
                          alt={serviceLeg.name}
                          className="h-8 w-8 object-contain"
                        />
                      )}
                    </TableCell>
                    <TableCell className="py-4 px-2 font-medium whitespace-nowrap">
                      {serviceLeg.name}
                    </TableCell>
                    <TableCell className="py-4 px-2 capitalize">
                      {serviceLeg.service_type.replace("_", " ")}
                    </TableCell>
                    <TableCell className="py-4 px-2">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          serviceLeg.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {serviceLeg.is_active ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-2">
                      {dayjs(serviceLeg.createdAt).format("MMM D, YYYY")}
                    </TableCell>
                    <TableCell className="py-4 px-2">
                      {serviceLeg.ServiceLegs?.length > 0 ? (
                        <div className="flex flex-col gap-1">
                          {serviceLeg.ServiceLegs.map((serviceLegItem) => (
                            <div key={serviceLegItem.id} className="text-sm">
                              {serviceLegItem.Leg.name} (
                              {serviceLegItem.Leg.origin_country.toUpperCase()}{" "}
                              →
                              {serviceLegItem.Leg.destination_country.toUpperCase()}
                              )
                            </div>
                          ))}
                        </div>
                      ) : (
                        "No associated legs"
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-gray-500"
                  >
                    {serviceLegsData?.data?.length === 0
                      ? "No service legs available"
                      : "No service legs found matching your filters"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default FeaturesManagementTab;
