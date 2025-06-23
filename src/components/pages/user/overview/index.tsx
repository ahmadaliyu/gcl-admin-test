import UserDashboardWrapper from "@/components/layout/user/user-dashboard-wrapper";
import DashboardSkeleton from "@/components/ui/dashboard-skeleton";
import { useGetBooking } from "@/services";
import { useParams, useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const DashboardOverview = () => {
  const { data, isPending } = useGetBooking();

  const orders = useMemo<Order[]>(() => {
    return (
      data?.data?.bookings?.map((booking: any) => ({
        id: booking.id ?? "",
        user_id: booking.user_id ?? "",
        service_id: booking.service_id ?? "",
        sender_address_id: booking.sender_address_id ?? "",
        recipient_address_id: booking.recipient_address_id ?? "",
        code: booking.code ?? "",
        status: booking.status ?? "",
        origin: booking.origin ?? "",
        destination: booking.destination ?? "",
        updatedAt: booking.updatedAt ?? "",
        // Add other fields as needed
      })) || []
    );
  }, [data]);

  console.log(orders, 96633);

  if (isPending) {
    return <DashboardSkeleton />;
  }

  return (
    <UserDashboardWrapper>
      <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
        {/* <h2>Coming Soon</h2> */}
        {/* Stats Cards Row */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 ">
          <StatCard
            title="Total Orders"
            value="750"
            change="4% (30 days)"
            positive
          />
          <StatCard
            title="Total Delivered"
            value="859"
            change="4% (30 days)"
            positive
          />
          <StatCard
            title="Total Pending"
            value="128"
            change="25% (30 days)"
            positive={false}
          />
          <StatCard
            title="Total Client"
            value="690"
            change="12% (30 days)"
            positive
          />
        </div> */}

        {/* Revenue Charts Row */}
        {/* <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          <RevenueChart />
          <SpendChart />
        </div> */}

        {/* Latest Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Latest Orders
            </h2>
            <OrdersTable orders={orders} />
          </div>
        </div>
      </div>
    </UserDashboardWrapper>
  );
};

// Stat Card Component
const StatCard = ({
  title,
  value,
  change,
  positive,
}: {
  title: string;
  value: string;
  change: string;
  positive: boolean;
}) => {
  // Different icons for different card types
  const getIcon = (title: string) => {
    switch (title) {
      case "Total Orders":
        return (
          <svg
            width="62"
            height="63"
            viewBox="0 0 62 63"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="path-1-inside-1_1840_126838" fill="white">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M62 31.5C62 48.6223 48.1213 62.5 31.001 62.5C13.8777 62.5 0 48.6223 0 31.5C0 14.3777 13.8777 0.5 31.001 0.5C48.1213 0.5 62 14.3777 62 31.5Z"
              />
            </mask>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M62 31.5C62 48.6223 48.1213 62.5 31.001 62.5C13.8777 62.5 0 48.6223 0 31.5C0 14.3777 13.8777 0.5 31.001 0.5C48.1213 0.5 62 14.3777 62 31.5Z"
              fill="white"
            />
            <path
              d="M61 31.5C61 48.07 47.569 61.5 31.001 61.5V63.5C48.6736 63.5 63 49.1746 63 31.5H61ZM31.001 61.5C14.4299 61.5 1 48.07 1 31.5H-1C-1 49.1746 13.3254 63.5 31.001 63.5V61.5ZM1 31.5C1 14.93 14.4299 1.5 31.001 1.5V-0.5C13.3254 -0.5 -1 13.8254 -1 31.5H1ZM31.001 1.5C47.569 1.5 61 14.93 61 31.5H63C63 13.8254 48.6736 -0.5 31.001 -0.5V1.5Z"
              fill="#758CA4"
              mask="url(#path-1-inside-1_1840_126838)"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M59 31.5C59 46.9653 46.4644 59.5 31.0009 59.5C15.5347 59.5 3 46.9653 3 31.5C3 16.0347 15.5347 3.5 31.0009 3.5C46.4644 3.5 59 16.0347 59 31.5Z"
              fill="#788FA6"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M54 31.5C54 44.2037 43.7029 54.5 31.0008 54.5C18.2963 54.5 8 44.2037 8 31.5C8 18.7963 18.2963 8.5 31.0008 8.5C43.7029 8.5 54 18.7963 54 31.5Z"
              fill="white"
            />
            <path
              d="M37.8477 23.0859C38.1341 23.0859 38.3555 23.1771 38.5117 23.3594C38.694 23.5156 38.7852 23.737 38.7852 24.0234V28.5547C38.7852 28.8411 38.694 29.0625 38.5117 29.2188C38.3555 29.375 38.1341 29.4531 37.8477 29.4531C37.2487 29.4531 36.9492 29.1536 36.9492 28.5547V24.9219H35.1523V25.8203C35.1523 26.1068 35.0612 26.3281 34.8789 26.4844C34.7227 26.6406 34.5013 26.7188 34.2148 26.7188H28.7852C28.1862 26.7188 27.8867 26.4193 27.8867 25.8203V24.9219H26.0508V37.6172H30.582C30.8685 37.6172 31.0898 37.6953 31.2461 37.8516C31.4284 38.0078 31.5195 38.2292 31.5195 38.5156C31.5195 38.8021 31.4284 39.0234 31.2461 39.1797C31.0898 39.3359 30.8685 39.4141 30.582 39.4141H25.1523C24.5534 39.4141 24.2539 39.1146 24.2539 38.5156V24.0234C24.2539 23.737 24.332 23.5156 24.4883 23.3594C24.6445 23.1771 24.8659 23.0859 25.1523 23.0859H27.8867V22.1875C27.8867 21.5885 28.1862 21.2891 28.7852 21.2891H34.2148C34.5013 21.2891 34.7227 21.3672 34.8789 21.5234C35.0612 21.6797 35.1523 21.901 35.1523 22.1875V23.0859H37.8477ZM33.3164 23.0859H29.6836V24.9219H33.3164V23.0859ZM28.7852 30.3516C28.1862 30.3516 27.8867 30.0521 27.8867 29.4531C27.8867 28.8542 28.1862 28.5547 28.7852 28.5547H33.3164C33.9154 28.5547 34.2148 28.8542 34.2148 29.4531C34.2148 30.0521 33.9154 30.3516 33.3164 30.3516H28.7852ZM31.5195 31.25C31.806 31.25 32.0273 31.3411 32.1836 31.5234C32.3398 31.6797 32.418 31.901 32.418 32.1875C32.418 32.7865 32.1185 33.0859 31.5195 33.0859H28.7852C28.1862 33.0859 27.8867 32.7865 27.8867 32.1875C27.8867 31.901 27.9648 31.6797 28.1211 31.5234C28.2773 31.3411 28.4987 31.25 28.7852 31.25H31.5195ZM30.582 33.9844C30.8685 33.9844 31.0898 34.0625 31.2461 34.2188C31.4284 34.375 31.5195 34.5964 31.5195 34.8828C31.5195 35.1693 31.4284 35.4036 31.2461 35.5859C31.0898 35.7422 30.8685 35.8203 30.582 35.8203H28.7852C28.4987 35.8203 28.2773 35.7422 28.1211 35.5859C27.9648 35.4036 27.8867 35.1693 27.8867 34.8828C27.8867 34.2839 28.1862 33.9844 28.7852 33.9844H30.582ZM35.582 33.9844C35.2956 33.9844 35.1523 34.1406 35.1523 34.4531C35.1523 34.7396 35.2956 34.8828 35.582 34.8828H36.4805C37.1315 34.8828 37.6784 35.1042 38.1211 35.5469C38.5638 35.9896 38.7852 36.5234 38.7852 37.1484C38.7852 37.7474 38.6159 38.2552 38.2773 38.6719C37.9388 39.0885 37.4961 39.3359 36.9492 39.4141V40.3516C36.9492 40.9505 36.6497 41.25 36.0508 41.25C35.4518 41.25 35.1523 40.9505 35.1523 40.3516V39.4141H34.2148C33.6159 39.4141 33.3164 39.1146 33.3164 38.5156C33.3164 37.9167 33.6159 37.6172 34.2148 37.6172H36.4805C36.793 37.6172 36.9492 37.4609 36.9492 37.1484C36.9492 36.862 36.793 36.7188 36.4805 36.7188H35.582C34.957 36.7188 34.4232 36.4974 33.9805 36.0547C33.5378 35.612 33.3164 35.0781 33.3164 34.4531C33.3164 33.8542 33.4857 33.3464 33.8242 32.9297C34.1628 32.513 34.6055 32.2656 35.1523 32.1875V31.25C35.1523 30.651 35.4518 30.3516 36.0508 30.3516C36.6497 30.3516 36.9492 30.651 36.9492 31.25V32.1875H37.8477C38.1341 32.1875 38.3555 32.2656 38.5117 32.4219C38.694 32.5781 38.7852 32.7995 38.7852 33.0859C38.7852 33.3724 38.694 33.5938 38.5117 33.75C38.3555 33.9062 38.1341 33.9844 37.8477 33.9844H35.582Z"
              fill="#758CA4"
            />
          </svg>
        );
      case "Total Delivered":
        return (
          <svg
            width="62"
            height="63"
            viewBox="0 0 62 63"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1840_126856)">
              <mask id="path-1-inside-1_1840_126856" fill="white">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M62 31.5C62 48.6223 48.1213 62.5 31.001 62.5C13.8777 62.5 0 48.6223 0 31.5C0 14.3777 13.8777 0.5 31.001 0.5C48.1213 0.5 62 14.3777 62 31.5Z"
                />
              </mask>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M62 31.5C62 48.6223 48.1213 62.5 31.001 62.5C13.8777 62.5 0 48.6223 0 31.5C0 14.3777 13.8777 0.5 31.001 0.5C48.1213 0.5 62 14.3777 62 31.5Z"
                fill="white"
              />
              <path
                d="M61 31.5C61 48.07 47.569 61.5 31.001 61.5V63.5C48.6736 63.5 63 49.1746 63 31.5H61ZM31.001 61.5C14.4299 61.5 1 48.07 1 31.5H-1C-1 49.1746 13.3254 63.5 31.001 63.5V61.5ZM1 31.5C1 14.93 14.4299 1.5 31.001 1.5V-0.5C13.3254 -0.5 -1 13.8254 -1 31.5H1ZM31.001 1.5C47.569 1.5 61 14.93 61 31.5H63C63 13.8254 48.6736 -0.5 31.001 -0.5V1.5Z"
                fill="#758CA4"
                mask="url(#path-1-inside-1_1840_126856)"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M31.4601 31.5011L50 54.0337C37.3557 64.1178 18.8057 62.1955 8.56642 49.7469C-1.67285 37.3059 0.276601 19.0372 12.9209 8.96079C18.2819 4.68919 24.5618 2.5 31.4601 2.5V31.5011Z"
                fill="#30914C"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M31 31.7635V2.5C47.0168 2.5 60 15.6001 60 31.7635C60 41.0536 56.4088 48.6581 49.2517 54.5L31 31.7635Z"
                fill="#30914C"
              />
              <rect x="30" y="1.5" width="1" height="8" fill="white" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M44.7204 49.1902L45.3868 48.6506L50.2438 54.6484L49.5773 55.188L44.7204 49.1902Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M54 31.5C54 44.2037 43.7029 54.5 31.0008 54.5C18.2963 54.5 8 44.2037 8 31.5C8 18.7963 18.2963 8.5 31.0008 8.5C43.7029 8.5 54 18.7963 54 31.5Z"
                fill="white"
              />
              <path
                d="M40.8438 30.9297C40.8698 31.0078 40.8828 31.0859 40.8828 31.1641C40.9089 31.2161 40.9219 31.3073 40.9219 31.4375V33.4297C40.9219 34.1328 40.7135 34.7578 40.2969 35.3047C39.9062 35.8516 39.3854 36.2031 38.7344 36.3594C38.8646 36.6719 38.9297 37.0365 38.9297 37.4531C38.9297 38.2865 38.6432 39.0026 38.0703 39.6016C37.4974 40.1745 36.7812 40.4609 35.9219 40.4609C35.0885 40.4609 34.3724 40.1745 33.7734 39.6016C33.2005 39.0026 32.9141 38.2865 32.9141 37.4531C32.9141 37.2448 32.9401 37.0625 32.9922 36.9062C33.0443 36.75 33.0964 36.5938 33.1484 36.4375H28.8125C28.9427 36.776 29.0078 37.1146 29.0078 37.4531C29.0078 38.2865 28.7214 39.0026 28.1484 39.6016C27.5755 40.1745 26.8724 40.4609 26.0391 40.4609C25.1797 40.4609 24.4635 40.1745 23.8906 39.6016C23.3177 39.0026 23.0312 38.2865 23.0312 37.4531C23.0312 37.0365 23.0964 36.6719 23.2266 36.3594C22.5755 36.2031 22.0417 35.8516 21.625 35.3047C21.2083 34.7578 21 34.1328 21 33.4297V26.4375C21 25.5781 21.2865 24.862 21.8594 24.2891C22.4583 23.7161 23.1745 23.4297 24.0078 23.4297H32.0156C32.6927 23.4297 33.2786 23.612 33.7734 23.9766C34.2682 24.3411 34.6198 24.8229 34.8281 25.4219H38.0312C38.2396 25.4219 38.4219 25.474 38.5781 25.5781C38.7604 25.6823 38.8776 25.8385 38.9297 26.0469L40.8438 30.9297ZM37.25 27.3359H35.0234V30.4219H38.5391L37.25 27.3359ZM27.0156 37.4531C27.0156 36.776 26.6901 36.4375 26.0391 36.4375C25.362 36.4375 25.0234 36.776 25.0234 37.4531C25.0234 38.1042 25.362 38.4297 26.0391 38.4297C26.6901 38.4297 27.0156 38.1042 27.0156 37.4531ZM36.0391 38.4297C36.6901 38.4297 37.0156 38.1042 37.0156 37.4531C37.0156 36.776 36.6901 36.4375 36.0391 36.4375C35.362 36.4375 35.0234 36.776 35.0234 37.4531C35.0234 38.1042 35.362 38.4297 36.0391 38.4297ZM39.0469 32.4531H34.0469C33.7344 32.4531 33.487 32.362 33.3047 32.1797C33.1224 31.9714 33.0312 31.724 33.0312 31.4375V26.4375C33.0312 26.151 32.9401 25.9167 32.7578 25.7344C32.5755 25.526 32.3281 25.4219 32.0156 25.4219H24.0078C23.7214 25.4219 23.487 25.526 23.3047 25.7344C23.1224 25.9167 23.0312 26.151 23.0312 26.4375V33.4297C23.0312 34.1068 23.3568 34.4453 24.0078 34.4453H38.0312C38.3177 34.4453 38.5521 34.3542 38.7344 34.1719C38.9427 33.9896 39.0469 33.7422 39.0469 33.4297V32.4531Z"
                fill="#758CA4"
              />
            </g>
            <defs>
              <clipPath id="clip0_1840_126856">
                <rect
                  width="62"
                  height="62"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        );
      case "Total Pending":
        return (
          <svg
            width="62"
            height="63"
            viewBox="0 0 62 63"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1840_126885)">
              <mask id="path-1-inside-1_1840_126885" fill="white">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M62 31.5C62 48.6223 48.1213 62.5 31.001 62.5C13.8777 62.5 0 48.6223 0 31.5C0 14.3777 13.8777 0.5 31.001 0.5C48.1213 0.5 62 14.3777 62 31.5Z"
                />
              </mask>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M62 31.5C62 48.6223 48.1213 62.5 31.001 62.5C13.8777 62.5 0 48.6223 0 31.5C0 14.3777 13.8777 0.5 31.001 0.5C48.1213 0.5 62 14.3777 62 31.5Z"
                fill="white"
              />
              <path
                d="M61 31.5C61 48.07 47.569 61.5 31.001 61.5V63.5C48.6736 63.5 63 49.1746 63 31.5H61ZM31.001 61.5C14.4299 61.5 1 48.07 1 31.5H-1C-1 49.1746 13.3254 63.5 31.001 63.5V61.5ZM1 31.5C1 14.93 14.4299 1.5 31.001 1.5V-0.5C13.3254 -0.5 -1 13.8254 -1 31.5H1ZM31.001 1.5C47.569 1.5 61 14.93 61 31.5H63C63 13.8254 48.6736 -0.5 31.001 -0.5V1.5Z"
                fill="#758CA4"
                mask="url(#path-1-inside-1_1840_126885)"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M31.4601 31.5011L50 54.0337C37.3557 64.1178 18.8057 62.1955 8.56642 49.7469C-1.67285 37.3059 0.276601 19.0372 12.9209 8.96079C18.2819 4.68919 24.5618 2.5 31.4601 2.5V31.5011Z"
                fill="#E51520"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M31 31.7635V2.5C47.0168 2.5 60 15.6001 60 31.7635C60 41.0536 56.4088 48.6581 49.2517 54.5L31 31.7635Z"
                fill="#E51520"
              />
              <rect x="30" y="1.5" width="1" height="8" fill="white" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M44.7204 49.1902L45.3868 48.6506L50.2438 54.6484L49.5773 55.188L44.7204 49.1902Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M54 31.5C54 44.2037 43.7029 54.5 31.0008 54.5C18.2963 54.5 8 44.2037 8 31.5C8 18.7963 18.2963 8.5 31.0008 8.5C43.7029 8.5 54 18.7963 54 31.5Z"
                fill="white"
              />
              <path
                d="M40.8438 30.9297C40.8698 31.0078 40.8828 31.0859 40.8828 31.1641C40.9089 31.2161 40.9219 31.3073 40.9219 31.4375V33.4297C40.9219 34.1328 40.7135 34.7578 40.2969 35.3047C39.9062 35.8516 39.3854 36.2031 38.7344 36.3594C38.8646 36.6719 38.9297 37.0365 38.9297 37.4531C38.9297 38.2865 38.6432 39.0026 38.0703 39.6016C37.4974 40.1745 36.7812 40.4609 35.9219 40.4609C35.0885 40.4609 34.3724 40.1745 33.7734 39.6016C33.2005 39.0026 32.9141 38.2865 32.9141 37.4531C32.9141 37.2448 32.9401 37.0625 32.9922 36.9062C33.0443 36.75 33.0964 36.5938 33.1484 36.4375H28.8125C28.9427 36.776 29.0078 37.1146 29.0078 37.4531C29.0078 38.2865 28.7214 39.0026 28.1484 39.6016C27.5755 40.1745 26.8724 40.4609 26.0391 40.4609C25.1797 40.4609 24.4635 40.1745 23.8906 39.6016C23.3177 39.0026 23.0312 38.2865 23.0312 37.4531C23.0312 37.0365 23.0964 36.6719 23.2266 36.3594C22.5755 36.2031 22.0417 35.8516 21.625 35.3047C21.2083 34.7578 21 34.1328 21 33.4297V26.4375C21 25.5781 21.2865 24.862 21.8594 24.2891C22.4583 23.7161 23.1745 23.4297 24.0078 23.4297H32.0156C32.6927 23.4297 33.2786 23.612 33.7734 23.9766C34.2682 24.3411 34.6198 24.8229 34.8281 25.4219H38.0312C38.2396 25.4219 38.4219 25.474 38.5781 25.5781C38.7604 25.6823 38.8776 25.8385 38.9297 26.0469L40.8438 30.9297ZM37.25 27.3359H35.0234V30.4219H38.5391L37.25 27.3359ZM27.0156 37.4531C27.0156 36.776 26.6901 36.4375 26.0391 36.4375C25.362 36.4375 25.0234 36.776 25.0234 37.4531C25.0234 38.1042 25.362 38.4297 26.0391 38.4297C26.6901 38.4297 27.0156 38.1042 27.0156 37.4531ZM36.0391 38.4297C36.6901 38.4297 37.0156 38.1042 37.0156 37.4531C37.0156 36.776 36.6901 36.4375 36.0391 36.4375C35.362 36.4375 35.0234 36.776 35.0234 37.4531C35.0234 38.1042 35.362 38.4297 36.0391 38.4297ZM39.0469 32.4531H34.0469C33.7344 32.4531 33.487 32.362 33.3047 32.1797C33.1224 31.9714 33.0312 31.724 33.0312 31.4375V26.4375C33.0312 26.151 32.9401 25.9167 32.7578 25.7344C32.5755 25.526 32.3281 25.4219 32.0156 25.4219H24.0078C23.7214 25.4219 23.487 25.526 23.3047 25.7344C23.1224 25.9167 23.0312 26.151 23.0312 26.4375V33.4297C23.0312 34.1068 23.3568 34.4453 24.0078 34.4453H38.0312C38.3177 34.4453 38.5521 34.3542 38.7344 34.1719C38.9427 33.9896 39.0469 33.7422 39.0469 33.4297V32.4531Z"
                fill="#758CA4"
              />
            </g>
            <defs>
              <clipPath id="clip0_1840_126885">
                <rect
                  width="62"
                  height="62"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        );
      case "Total Client":
        return (
          <svg
            width="62"
            height="63"
            viewBox="0 0 62 63"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="path-1-inside-1_1840_126838" fill="white">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M62 31.5C62 48.6223 48.1213 62.5 31.001 62.5C13.8777 62.5 0 48.6223 0 31.5C0 14.3777 13.8777 0.5 31.001 0.5C48.1213 0.5 62 14.3777 62 31.5Z"
              />
            </mask>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M62 31.5C62 48.6223 48.1213 62.5 31.001 62.5C13.8777 62.5 0 48.6223 0 31.5C0 14.3777 13.8777 0.5 31.001 0.5C48.1213 0.5 62 14.3777 62 31.5Z"
              fill="white"
            />
            <path
              d="M61 31.5C61 48.07 47.569 61.5 31.001 61.5V63.5C48.6736 63.5 63 49.1746 63 31.5H61ZM31.001 61.5C14.4299 61.5 1 48.07 1 31.5H-1C-1 49.1746 13.3254 63.5 31.001 63.5V61.5ZM1 31.5C1 14.93 14.4299 1.5 31.001 1.5V-0.5C13.3254 -0.5 -1 13.8254 -1 31.5H1ZM31.001 1.5C47.569 1.5 61 14.93 61 31.5H63C63 13.8254 48.6736 -0.5 31.001 -0.5V1.5Z"
              fill="#758CA4"
              mask="url(#path-1-inside-1_1840_126838)"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M59 31.5C59 46.9653 46.4644 59.5 31.0009 59.5C15.5347 59.5 3 46.9653 3 31.5C3 16.0347 15.5347 3.5 31.0009 3.5C46.4644 3.5 59 16.0347 59 31.5Z"
              fill="#788FA6"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M54 31.5C54 44.2037 43.7029 54.5 31.0008 54.5C18.2963 54.5 8 44.2037 8 31.5C8 18.7963 18.2963 8.5 31.0008 8.5C43.7029 8.5 54 18.7963 54 31.5Z"
              fill="white"
            />
            <path
              d="M37.8477 23.0859C38.1341 23.0859 38.3555 23.1771 38.5117 23.3594C38.694 23.5156 38.7852 23.737 38.7852 24.0234V28.5547C38.7852 28.8411 38.694 29.0625 38.5117 29.2188C38.3555 29.375 38.1341 29.4531 37.8477 29.4531C37.2487 29.4531 36.9492 29.1536 36.9492 28.5547V24.9219H35.1523V25.8203C35.1523 26.1068 35.0612 26.3281 34.8789 26.4844C34.7227 26.6406 34.5013 26.7188 34.2148 26.7188H28.7852C28.1862 26.7188 27.8867 26.4193 27.8867 25.8203V24.9219H26.0508V37.6172H30.582C30.8685 37.6172 31.0898 37.6953 31.2461 37.8516C31.4284 38.0078 31.5195 38.2292 31.5195 38.5156C31.5195 38.8021 31.4284 39.0234 31.2461 39.1797C31.0898 39.3359 30.8685 39.4141 30.582 39.4141H25.1523C24.5534 39.4141 24.2539 39.1146 24.2539 38.5156V24.0234C24.2539 23.737 24.332 23.5156 24.4883 23.3594C24.6445 23.1771 24.8659 23.0859 25.1523 23.0859H27.8867V22.1875C27.8867 21.5885 28.1862 21.2891 28.7852 21.2891H34.2148C34.5013 21.2891 34.7227 21.3672 34.8789 21.5234C35.0612 21.6797 35.1523 21.901 35.1523 22.1875V23.0859H37.8477ZM33.3164 23.0859H29.6836V24.9219H33.3164V23.0859ZM28.7852 30.3516C28.1862 30.3516 27.8867 30.0521 27.8867 29.4531C27.8867 28.8542 28.1862 28.5547 28.7852 28.5547H33.3164C33.9154 28.5547 34.2148 28.8542 34.2148 29.4531C34.2148 30.0521 33.9154 30.3516 33.3164 30.3516H28.7852ZM31.5195 31.25C31.806 31.25 32.0273 31.3411 32.1836 31.5234C32.3398 31.6797 32.418 31.901 32.418 32.1875C32.418 32.7865 32.1185 33.0859 31.5195 33.0859H28.7852C28.1862 33.0859 27.8867 32.7865 27.8867 32.1875C27.8867 31.901 27.9648 31.6797 28.1211 31.5234C28.2773 31.3411 28.4987 31.25 28.7852 31.25H31.5195ZM30.582 33.9844C30.8685 33.9844 31.0898 34.0625 31.2461 34.2188C31.4284 34.375 31.5195 34.5964 31.5195 34.8828C31.5195 35.1693 31.4284 35.4036 31.2461 35.5859C31.0898 35.7422 30.8685 35.8203 30.582 35.8203H28.7852C28.4987 35.8203 28.2773 35.7422 28.1211 35.5859C27.9648 35.4036 27.8867 35.1693 27.8867 34.8828C27.8867 34.2839 28.1862 33.9844 28.7852 33.9844H30.582ZM35.582 33.9844C35.2956 33.9844 35.1523 34.1406 35.1523 34.4531C35.1523 34.7396 35.2956 34.8828 35.582 34.8828H36.4805C37.1315 34.8828 37.6784 35.1042 38.1211 35.5469C38.5638 35.9896 38.7852 36.5234 38.7852 37.1484C38.7852 37.7474 38.6159 38.2552 38.2773 38.6719C37.9388 39.0885 37.4961 39.3359 36.9492 39.4141V40.3516C36.9492 40.9505 36.6497 41.25 36.0508 41.25C35.4518 41.25 35.1523 40.9505 35.1523 40.3516V39.4141H34.2148C33.6159 39.4141 33.3164 39.1146 33.3164 38.5156C33.3164 37.9167 33.6159 37.6172 34.2148 37.6172H36.4805C36.793 37.6172 36.9492 37.4609 36.9492 37.1484C36.9492 36.862 36.793 36.7188 36.4805 36.7188H35.582C34.957 36.7188 34.4232 36.4974 33.9805 36.0547C33.5378 35.612 33.3164 35.0781 33.3164 34.4531C33.3164 33.8542 33.4857 33.3464 33.8242 32.9297C34.1628 32.513 34.6055 32.2656 35.1523 32.1875V31.25C35.1523 30.651 35.4518 30.3516 36.0508 30.3516C36.6497 30.3516 36.9492 30.651 36.9492 31.25V32.1875H37.8477C38.1341 32.1875 38.3555 32.2656 38.5117 32.4219C38.694 32.5781 38.7852 32.7995 38.7852 33.0859C38.7852 33.3724 38.694 33.5938 38.5117 33.75C38.3555 33.9062 38.1341 33.9844 37.8477 33.9844H35.582Z"
              fill="#758CA4"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-start gap-4">
      <div className="flex-shrink-0">{getIcon(title)}</div>
      <div>
        <p className="text-xl sm:text-2xl font-bold my-1 sm:my-2">{value}</p>
        <h3 className="text-gray-500 text-xs sm:text-sm font-medium">
          {title}
        </h3>
        <div
          className={`flex items-center ${
            positive ? "text-green-500" : "text-red-500"
          }`}
        >
          {positive ? (
            <FiTrendingUp className="mr-1" />
          ) : (
            <FiTrendingDown className="mr-1" />
          )}
          <span className="text-xs sm:text-sm">{change}</span>
        </div>
      </div>
    </div>
  );
};

// Revenue Chart Component
const RevenueChart = () => {
  const data = [
    { month: "Jan", value: 40694 },
    { month: "Feb", value: 33193.3 },
    { month: "Mar", value: 31983.3 },
    { month: "Apr", value: 18203.3 },
  ];

  const maxValue = 50000;
  const chartHeight = 200; // Height of the chart area in pixels

  return (
    <div className="bg-white rounded-lg shadow p-6 w-full max-w-4xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold">Revenue Report</h2>
          <div className="flex items-center mt-2">
            <span className="text-2xl font-bold mr-2">50.74</span>
            <span className="text-sm text-gray-500">Target 500k</span>
          </div>
          <p className="text-sm text-red-500">Deviation -89.75%</p>
          <p className="text-sm text-gray-500 mt-1">Q1, 2021</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">
            By Revenue and Cost
          </h3>
        </div>
      </div>

      <div className="flex items-end space-x-4 h-[200px] mt-6 border-b border-gray-200">
        {data.map(({ month, value }) => (
          <div key={month} className="flex flex-col items-center flex-1">
            <div
              className="bg-blue-500 w-8 rounded-t"
              style={{ height: `${(value / maxValue) * chartHeight}px` }}
            ></div>
            <span className="text-sm text-gray-500 mt-1">{month}</span>
            <span className="text-xs text-gray-500 mt-1">
              {value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-sm">Revenue</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
          <span className="text-sm">Cost</span>
        </div>
      </div>
    </div>
  );
};

const spendData = [
  { month: "Jan", value: 28834634 },
  { month: "Feb", value: 24238444 },
  { month: "Mar", value: 18203300 },
  { month: "Apr", value: 12423644 },
];

const SpendChart = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6 w-full max-w-4xl">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Spend per Day</h2>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={spendData}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm">Revenue</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
          <span className="text-sm">Cost</span>
        </div>
      </div>
    </div>
  );
};

interface Order {
  id: string;
  user_id: string;
  service_id: string;
  sender_address_id: string;
  recipient_address_id: string;
  code: string;
  status: string;
  origin: string;
  destination: string;
  updatedAt: string;
  // Add other fields as needed
}

interface OrdersTableProps {
  orders?: Order[];
}
// Orders Table Component

interface Order {
  id: string;
  code: string;
  status: string;
  sender_address_id: string;
  updatedAt: string;
  origin: string;
  destination: string;
}

interface OrdersTableProps {
  orders?: Order[];
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders = [] }) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchLower = search.toLowerCase();
      return (
        order.code.toLowerCase().includes(searchLower) ||
        order.status.toLowerCase().includes(searchLower) ||
        `${order.origin} - ${order.destination}`
          .toLowerCase()
          .includes(searchLower)
      );
    });
  }, [search, orders]);

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Order ID, Status or Route"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Mobile View */}
      <div className="sm:hidden space-y-4">
        {filteredOrders.map((order, index) => (
          <div
            role="button"
            tabIndex={0}
            onClick={() =>
              router.push(`/user/track-shipment-overview/${order.id}`)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                router.push(`/user/track-shipment-overview/${order.id}`);
              }
            }}
            key={`${order.id}-${index}`}
            className="bg-white p-4 rounded-lg shadow transition hover:shadow-md hover:translate-y-[-2px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-900">ORDER ID</p>
                <p className="text-xs text-gray-500">
                  {order.code.substring(0, 6)}...
                </p>
              </div>
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {order.status}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-gray-500">Email</p>
                <p>{order.sender_address_id.substring(0, 10)}...</p>
              </div>
              <div>
                <p className="text-gray-500">Company</p>
                <p>N/A</p>
              </div>
              <div>
                <p className="text-gray-500">Arrival</p>
                <p>{order.updatedAt}</p>
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
              <th className="min-w-[120px] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="min-w-[150px] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="min-w-[200px] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="min-w-[120px] hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="min-w-[100px] px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="min-w-[160px] hidden lg:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Arrival
              </th>
              <th className="min-w-[200px] hidden xl:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Route
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order, index) => (
              <tr
                onClick={() =>
                  router.push(`/user/track-shipment-overview/${order.id}`)
                }
                key={`${order.id}-${index}`}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-xs md:text-sm text-gray-900 break-words">
                  {order.code}
                </td>
                <td className="px-4 py-3 text-xs md:text-sm text-gray-900 break-words">
                  Name
                </td>
                <td className="px-4 py-3 text-xs md:text-sm text-gray-900 break-words">
                  {order.sender_address_id}
                </td>
                <td className="hidden md:table-cell px-4 py-3 text-xs md:text-sm text-gray-900 break-words">
                  N/A
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="hidden lg:table-cell px-4 py-3 text-xs md:text-sm text-gray-900 break-words">
                  {order.updatedAt}
                </td>
                <td className="hidden xl:table-cell px-4 py-3 text-xs md:text-sm text-gray-900 break-words">
                  {`${order.origin} - ${order.destination}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardOverview;
