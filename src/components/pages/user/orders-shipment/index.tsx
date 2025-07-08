import React, { useMemo, useState } from "react";
import { Booking, useGetBooking } from "@/services";
import DashboardSkeleton from "@/components/ui/dashboard-skeleton";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import UserDashboardWrapper from "@/components/layout/user/user-dashboard-wrapper";
import { formatType } from "@/lib/formatType";

const STATUS_COLORS: Record<string, string> = {
  paid: "bg-green-100 text-green-800",
  delivered: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
};

const DATE_FILTERS = ["All", "Today", "7 Days Ago", "Last Week", "Last Month"];
const STATUS_OPTIONS = ["All", "Paid", "Delivered", "Cancelled"];

function OrdersShipment() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const { data, isLoading } = useGetBooking();
  const router = useRouter();

  const orders = useMemo(() => data?.data?.bookings || [], [data]);

  const filteredOrders = useMemo(() => {
    const searchLower = search.toLowerCase();

    const filtered = orders.filter((order) => {
      const matchesSearch =
        order.code.toLowerCase().includes(searchLower) ||
        order.status.toLowerCase().includes(searchLower) ||
        `${order.origin} - ${order.destination}`
          .toLowerCase()
          .includes(searchLower);

      const matchesStatus =
        statusFilter === "All" ||
        order.status.toLowerCase() === statusFilter.toLowerCase();

      const updatedDate = dayjs(order.updatedAt);
      const now = dayjs();

      const matchesDate =
        dateFilter === "All" ||
        (dateFilter === "Today" && updatedDate.isSame(now, "day")) ||
        (dateFilter === "7 Days Ago" &&
          updatedDate.isAfter(now.subtract(7, "day"))) ||
        (dateFilter === "Last Week" &&
          updatedDate.isAfter(now.subtract(1, "week"))) ||
        (dateFilter === "Last Month" &&
          updatedDate.isAfter(now.subtract(1, "month")));

      return matchesSearch && matchesStatus && matchesDate;
    });

    // Sort by updatedAt ascending (older first, newer last)
    return filtered.sort(
      (a, b) => dayjs(a.updatedAt).valueOf() - dayjs(b.updatedAt).valueOf()
    );
  }, [orders, search, statusFilter, dateFilter]);

  if (isLoading) return <DashboardSkeleton />;

  return (
    <UserDashboardWrapper>
      <div className="space-y-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4">My Bookings</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <input
            type="text"
            placeholder="Search by Order ID, Status or Route"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:max-w-xs px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {DATE_FILTERS.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile View */}
        <div className="sm:hidden space-y-4">
          {filteredOrders.map((order, index) => (
            <div
              key={`${order.id}-${index}`}
              role="button"
              tabIndex={0}
              onClick={() =>
                router.push(`/user/track-shipment-overview/${order.id}`)
              }
              className="bg-white p-4 rounded-lg shadow hover:shadow-md hover:translate-y-[-2px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-900">Customer</p>
                  <p className="text-xs text-gray-500">{`${order.User?.first_name} ${order.User?.last_name}`}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">ORDER ID</p>
                  <p className="text-xs text-gray-500">{order.code}</p>
                </div>
                <span
                  className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                    STATUS_COLORS[order.status.toLowerCase()] ||
                    "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {formatType(order.status)}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-gray-500">Email</p>
                  <p>{order.User.email}</p>
                </div>
                <div>
                  <p className="text-gray-500">Arrival</p>
                  <p>{dayjs(order.updatedAt).format("MMM D, YYYY")}</p>
                </div>
                <div>
                  <p className="text-gray-500">Route</p>
                  <p>{`${order.origin} - ${order.destination}`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full table-auto divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Arrival
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order, index) => (
                <tr
                  key={`${order.id}-${index}`}
                  onClick={() =>
                    router.push(`/user/track-shipment-overview/${order.id}`)
                  }
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-xs text-gray-900">
                    {`${order.User?.first_name} ${order.User?.last_name}`}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900">
                    {order.code}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900">
                    {order.User.email}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                        STATUS_COLORS[order.status.toLowerCase()] ||
                        "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {formatType(order.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900">
                    {dayjs(order.updatedAt).format("MMM D, YYYY")}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-900">
                    {`${order.origin} - ${order.destination}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </UserDashboardWrapper>
  );
}

export default OrdersShipment;
