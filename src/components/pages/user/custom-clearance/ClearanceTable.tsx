import React from "react";
import { ImportData } from "@/services/hooks/user";

interface ClearanceTableProps {
  clearances: ImportData[];
  onViewDetails: (clearance: ImportData) => void;
}

const ClearanceTable: React.FC<ClearanceTableProps> = ({
  clearances,
  onViewDetails,
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "in-review":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "additional-information":
        return "bg-orange-100 text-orange-800";
      case "custom-cleared":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Safe access to files count
  const getFilesCount = (clearance: ImportData) => {
    return clearance.meta?.files?.length || 0;
  };

  // Safe access to initials
  const getInitials = (clearance: ImportData) => {
    const firstInitial = clearance.first_name?.[0] || "";
    const lastInitial = clearance.last_name?.[0] || "";
    return `${firstInitial}${lastInitial}`;
  };

  if (clearances.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900">
            Custom Clearance Requests
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage all custom clearance applications
          </p>
        </div>
        <div className="px-6 py-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h3 className="text-lg font-medium text-gray-900">
            No clearance requests found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            There are no custom clearance requests yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900">
          Custom Clearance Requests
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage all custom clearance applications
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clearances.map((clearance) => (
              <tr key={clearance.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                        {getInitials(clearance)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {clearance.first_name} {clearance.last_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {clearance.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                    {clearance.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {getFilesCount(clearance)}
                  </div>
                  <div className="text-sm text-gray-500">items</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      clearance.status
                    )}`}
                  >
                    {clearance.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(clearance.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onViewDetails(clearance)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClearanceTable;
