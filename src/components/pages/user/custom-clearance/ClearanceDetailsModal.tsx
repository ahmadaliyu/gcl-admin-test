import React from "react";
import { ImportData } from "@/services/hooks/user";

interface ClearanceDetailsModalProps {
  clearance: ImportData;
  onClose: () => void;
  onDelete: () => void;
  onUpdateStatus: () => void;
  isDeleting: boolean;
}

const ClearanceDetailsModal: React.FC<ClearanceDetailsModalProps> = ({
  clearance,
  onClose,
  onDelete,
  onUpdateStatus,
  isDeleting,
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

  // Safe access to files with fallback
  const getFiles = () => {
    return clearance.meta?.files || [];
  };

  const renderFiles = () => {
    const files = getFiles();

    if (files.length === 0) {
      return (
        <div className="text-sm text-gray-500 italic">No files uploaded</div>
      );
    }

    return (
      <div className="space-y-2">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-gray-50 rounded border"
          >
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-gray-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">
                {file.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-40">
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-900">
            Clearance Request Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Request ID</h4>
              <p className="mt-1 text-sm text-gray-900">{clearance.id}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Status</h4>
              <p className="mt-1">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    clearance.status
                  )}`}
                >
                  {clearance.status}
                </span>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">
              Customer Information
            </h4>
            <p className="mt-1 text-sm text-gray-900">
              {clearance.first_name} {clearance.last_name}
            </p>
            <p className="text-sm text-gray-900">{clearance.email}</p>
            <p className="text-sm text-gray-900">{clearance.phone}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                Clearance Type
              </h4>
              <p className="mt-1 text-sm text-gray-900">{clearance.type}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                Number of Items
              </h4>
              <p className="mt-1 text-sm text-gray-900">{getFiles().length}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Description</h4>
            <p className="mt-1 text-sm text-gray-900">
              {clearance.description || "No description provided"}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Attached Files
            </h4>
            {renderFiles()}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Created At</h4>
              <p className="mt-1 text-sm text-gray-900">
                {formatDate(clearance.created_at)}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                Last Updated
              </h4>
              <p className="mt-1 text-sm text-gray-900">
                {formatDate(clearance.updated_at)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete Request"}
          </button>
          <button
            onClick={onUpdateStatus}
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Update Status
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClearanceDetailsModal;
