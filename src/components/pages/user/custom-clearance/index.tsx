import UserDashboardWrapper from "@/components/layout/user/user-dashboard-wrapper";
import { useAlert } from "@/components/reuseables/Alert/alert-context";
import { useUploadFile } from "@/services";
import {
  ImportData,
  useDeleteCustomClearance,
  useGetCustomClearance,
  useUpdateCustomClearanceStatus,
} from "@/services/hooks/user";
import React, { useState } from "react";

function AdminCustomClearance() {
  const { data, isPending, refetch } = useGetCustomClearance();
  const { mutate: deleteClearance, isPending: deleting } =
    useDeleteCustomClearance();
  const { mutate: updateStatus, isPending: updatingStatus } =
    useUpdateCustomClearanceStatus();
  const { mutate: uploadFile, isPending: uploading } = useUploadFile();

  const [selectedClearance, setSelectedClearance] = useState<ImportData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<"approved" | "rejected">(
    "approved"
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ name: string; filePath: string }>
  >([]);

  const { showAlert } = useAlert();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
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

  const handleViewDetails = (clearance: ImportData) => {
    setSelectedClearance(clearance);
    setIsModalOpen(true);
  };

  const handleOpenStatusModal = (clearance: ImportData) => {
    setSelectedClearance(clearance);

    // Only allow "approved" or "rejected" in the dropdown
    const normalizedStatus =
      clearance.status === "approved" || clearance.status === "rejected"
        ? clearance.status
        : "approved";

    setSelectedStatus(normalizedStatus);
    setSelectedFile(null);
    setFileName("");
    setUploadedFiles([]);
    setIsStatusModalOpen(true);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Set default name as filename without extension
      const nameWithoutExt = file.name.split(".").slice(0, -1).join(".");
      setFileName(nameWithoutExt);
    }
  };

  const handleUploadFile = () => {
    if (!selectedFile || !fileName.trim()) {
      showAlert("Please select a file and enter a name", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    uploadFile(
      { payload: formData },
      {
        onSuccess: (uploadResponse) => {
          const fileData = uploadResponse.data.data;

          const newFile = {
            name: fileName.trim(),
            filePath:
              fileData.filePath ||
              fileData.url ||
              fileData.path ||
              "File uploaded successfully",
          };

          setUploadedFiles((prev) => [...prev, newFile]);
          setSelectedFile(null);
          setFileName("");
          // Clear the file input
          const fileInput = document.querySelector(
            'input[type="file"]'
          ) as HTMLInputElement;
          if (fileInput) {
            fileInput.value = "";
          }
          showAlert("File uploaded successfully", "success");
        },
        onError: (error) => {
          showAlert("File upload failed", "error");
        },
      }
    );
  };

  const removeUploadedFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleStatusUpdate = () => {
    if (!selectedClearance) return;

    updateStatus(
      {
        id: selectedClearance.id,
        payload: {
          status: selectedStatus,
          ...(uploadedFiles.length > 0 && { files: uploadedFiles }),
        },
      },
      {
        onSuccess: () => {
          refetch();
          showAlert(
            uploadedFiles.length > 0
              ? "Status updated successfully with files"
              : "Status updated successfully",
            "success"
          );
          setIsStatusModalOpen(false);
          setSelectedClearance(null);
          setUploadedFiles([]);
        },
        onError: (error) => {
          showAlert(`${error.message}` || "Failed to update status", "error");
        },
      }
    );
  };

  const handleDelete = (id: string) => {
    deleteClearance(id, {
      onSuccess: () => {
        refetch();
        showAlert("Clearance request deleted successfully", "success");
        setIsModalOpen(false);
        setSelectedClearance(null);
      },
      onError: () => {
        showAlert("Failed to delete clearance request", "error");
      },
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsStatusModalOpen(false);
    setSelectedClearance(null);
    setSelectedFile(null);
    setFileName("");
    setUploadedFiles([]);
  };

  // Function to render files from meta
  const renderFiles = (clearance: ImportData) => {
    if (
      !clearance.meta ||
      !clearance.meta.files ||
      clearance.meta.files.length === 0
    ) {
      return (
        <div className="text-sm text-gray-500 italic">No files uploaded</div>
      );
    }

    return (
      <div className="space-y-2">
        {clearance.meta.files.map((file, index) => (
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
            {/* <a
              href={file.filePath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View File
            </a> */}
          </div>
        ))}
      </div>
    );
  };

  if (isPending) {
    return <ClearanceSkeleton />;
  }

  const clearances = data?.data || [];

  return (
    <UserDashboardWrapper>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h1 className="text-2xl font-semibold text-gray-900">
                Custom Clearance Requests
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage all custom clearance applications
              </p>
            </div>

            {clearances.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <div className="text-gray-400 text-6xl mb-4">📦</div>
                <h3 className="text-lg font-medium text-gray-900">
                  No clearance requests found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  There are no custom clearance requests yet.
                </p>
              </div>
            ) : (
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
                                {clearance.first_name[0]}
                                {clearance.last_name[0]}
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
                            {clearance.meta?.files.length}
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
                            onClick={() => handleViewDetails(clearance)}
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
            )}
          </div>
        </div>
      </div>

      {/* Modal for viewing details */}
      {isModalOpen && selectedClearance && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Clearance Request Details
              </h3>
              <button
                onClick={closeModal}
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
                  <h4 className="text-sm font-medium text-gray-500">
                    Request ID
                  </h4>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedClearance.id}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                  <p className="mt-1">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        selectedClearance.status
                      )}`}
                    >
                      {selectedClearance.status}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Customer Information
                </h4>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedClearance.first_name} {selectedClearance.last_name}
                </p>
                <p className="text-sm text-gray-900">
                  {selectedClearance.email}
                </p>
                <p className="text-sm text-gray-900">
                  {selectedClearance.phone}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Clearance Type
                  </h4>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedClearance.type}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Number of Items
                  </h4>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedClearance.meta?.files.length || 0}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Description
                </h4>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedClearance.description || "No description provided"}
                </p>
              </div>

              {/* Files Section */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Attached Files
                </h4>
                {renderFiles(selectedClearance)}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Created At
                  </h4>
                  <p className="mt-1 text-sm text-gray-900">
                    {formatDate(selectedClearance.created_at)}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Last Updated
                  </h4>
                  <p className="mt-1 text-sm text-gray-900">
                    {formatDate(selectedClearance.updated_at)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
              <button
                onClick={() => handleDelete(selectedClearance.id)}
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {deleting ? "Deleting..." : "Delete Request"}
              </button>
              <button
                onClick={() => handleOpenStatusModal(selectedClearance)}
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Update Status
              </button>
              <button
                onClick={closeModal}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for updating status with file upload */}
      {isStatusModalOpen && selectedClearance && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
              <h3 className="text-xl font-semibold text-gray-900">
                Update Clearance Status
              </h3>
              <button
                onClick={closeModal}
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
                      selectedClearance.status
                    )}`}
                  >
                    {selectedClearance.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Update Status
                  </h4>
                  <select
                    value={selectedStatus}
                    onChange={(e) =>
                      setSelectedStatus(
                        e.target.value as "approved" | "rejected"
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
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
                        onChange={handleFileSelect}
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
                        onChange={(e) => setFileName(e.target.value)}
                        placeholder="Enter file name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleUploadFile}
                    disabled={!selectedFile || !fileName.trim() || uploading}
                    className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? "Uploading..." : "Upload File"}
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
                            onClick={() => removeUploadedFile(index)}
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
              {selectedStatus === "rejected" && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <strong>Note:</strong> Rejecting this request will
                        notify the customer and prevent further processing.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedStatus === "approved" && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-green-700">
                        <strong>Note:</strong> Approving this request will
                        notify the customer and complete the clearance process.
                        {uploadedFiles.length > 0 &&
                          " Uploaded files will be included with the update."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
              <button
                onClick={handleStatusUpdate}
                disabled={
                  updatingStatus || selectedStatus === selectedClearance.status
                }
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updatingStatus ? "Updating..." : "Update Status"}
              </button>
              <button
                onClick={closeModal}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </UserDashboardWrapper>
  );
}

// Skeleton Loading Component (unchanged)
function ClearanceSkeleton() {
  return (
    <UserDashboardWrapper>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[...Array(6)].map((_, i) => (
                      <th key={i} className="px-6 py-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[...Array(5)].map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      {[...Array(6)].map((_, cellIndex) => (
                        <td key={cellIndex} className="px-6 py-4">
                          <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </UserDashboardWrapper>
  );
}

export default AdminCustomClearance;
