import React from "react";
import { ImportData } from "@/services/hooks/user";

interface StatusUpdateModalProps {
  clearance: ImportData;
  selectedStatus:
    | "in-review"
    | "in-progress"
    | "additional-information"
    | "custom-cleared";
  selectedFile: File | null;
  fileName: string;
  uploadedFiles: Array<{ name: string; filePath: string }>;
  isUpdating: boolean;
  isUploading: boolean;
  onStatusChange: (
    status:
      | "in-review"
      | "in-progress"
      | "additional-information"
      | "custom-cleared"
  ) => void;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFileNameChange: (name: string) => void;
  onUploadFile: () => void;
  onRemoveUploadedFile: (index: number) => void;
  onStatusUpdate: () => void;
  onClose: () => void;
}

const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({
  clearance,
  selectedStatus,
  selectedFile,
  fileName,
  uploadedFiles,
  isUpdating,
  isUploading,
  onStatusChange,
  onFileSelect,
  onFileNameChange,
  onUploadFile,
  onRemoveUploadedFile,
  onStatusUpdate,
  onClose,
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

  const renderStatusNote = () => {
    switch (selectedStatus) {
      case "additional-information":
        return (
          <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-orange-700">
                  <strong>Note:</strong> Setting status to "Additional
                  Information Required" will notify the customer that more
                  documents or information are needed to process their request.
                </p>
              </div>
            </div>
          </div>
        );

      case "custom-cleared":
        return (
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  <strong>Note:</strong> Setting status to "Custom Cleared" will
                  notify the customer that their clearance has been completed
                  successfully.
                  {uploadedFiles.length > 0 &&
                    " Uploaded files will be included with the update."}
                </p>
              </div>
            </div>
          </div>
        );

      case "in-progress":
        return (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Note:</strong> Setting status to "In Progress" will
                  notify the customer that their request is currently being
                  processed.
                </p>
              </div>
            </div>
          </div>
        );

      case "in-review":
        return (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> Setting status to "In Review" will
                  notify the customer that their documents are under review.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-40">
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <h3 className="text-xl font-semibold text-gray-900">
            Update Clearance Status
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

        <div className="p-6 space-y-6">
          {/* Current Status */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Current Status
              </h4>
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                  clearance.status
                )}`}
              >
                {clearance.status}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Update Status
              </h4>
              <select
                value={selectedStatus}
                onChange={(e) =>
                  onStatusChange(
                    e.target.value as
                      | "in-review"
                      | "in-progress"
                      | "additional-information"
                      | "custom-cleared"
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="in-review">In Review</option>
                <option value="in-progress">In Progress</option>
                <option value="additional-information">
                  Additional Information Required
                </option>
                <option value="custom-cleared">Custom Cleared</option>
              </select>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="border-t pt-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              Upload Supporting Documents
            </h4>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select File
                  </label>
                  <input
                    type="file"
                    onChange={onFileSelect}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                  />
                  {selectedFile && (
                    <p className="mt-2 text-sm text-green-600">
                      Selected: {selectedFile.name} (
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    File Name (e.g., Identification, Certificate)
                  </label>
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => onFileNameChange(e.target.value)}
                    placeholder="Enter file name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={onUploadFile}
                disabled={!selectedFile || !fileName.trim() || isUploading}
                className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? "Uploading..." : "Upload File"}
              </button>
            </div>

            {/* Uploaded Files Display */}
            {uploadedFiles.length > 0 && (
              <div>
                <h5 className="text-md font-medium text-gray-900 mb-3">
                  Uploaded Files ({uploadedFiles.length})
                </h5>
                <div className="space-y-3">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
                    >
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-green-500 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div>
                          <span className="text-sm font-medium text-gray-700">
                            {file.name}
                          </span>
                          <p className="text-xs text-gray-500 truncate max-w-xs">
                            {typeof file.filePath === "string"
                              ? file.filePath
                              : "File uploaded successfully"}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveUploadedFile(index)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Status Update Notes */}
          {renderStatusNote()}
        </div>

        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
          <button
            onClick={onStatusUpdate}
            disabled={isUpdating || selectedStatus === clearance.status}
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating...
              </span>
            ) : (
              "Update Status"
            )}
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusUpdateModal;
