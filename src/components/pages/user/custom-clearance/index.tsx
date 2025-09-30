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
import { ClearanceSkeleton } from "./ClearanceSkeleton";
import ClearanceTable from "./ClearanceTable";
import ClearanceDetailsModal from "./ClearanceDetailsModal";
import StatusUpdateModal from "./StatusUpdateModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

function AdminCustomClearance() {
  const { data, isPending, refetch } = useGetCustomClearance();
  const { mutate: deleteClearance, isPending: isDeleting } =
    useDeleteCustomClearance();
  const { mutate: updateStatus, isPending: updatingStatus } =
    useUpdateCustomClearanceStatus();
  const { mutate: uploadFile, isPending: uploading } = useUploadFile();

  const [selectedClearance, setSelectedClearance] = useState<ImportData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<
    "in-review" | "in-progress" | "additional-information" | "custom-cleared"
  >("in-review");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ name: string; filePath: string }>
  >([]);

  const { showAlert } = useAlert();

  const handleViewDetails = (clearance: ImportData) => {
    setSelectedClearance(clearance);
    setIsModalOpen(true);
  };

  const handleOpenStatusModal = (clearance: ImportData) => {
    setSelectedClearance(clearance);
    const normalizedStatus =
      clearance.status === "in-review" ||
      clearance.status === "in-progress" ||
      clearance.status === "additional-information" ||
      clearance.status === "custom-cleared"
        ? clearance.status
        : "in-review";

    setSelectedStatus(normalizedStatus);
    setSelectedFile(null);
    setFileName("");
    setUploadedFiles([]);
    setIsStatusModalOpen(true);
  };

  const handleOpenDeleteModal = (clearance: ImportData) => {
    setSelectedClearance(clearance);
    setIsDeleteModalOpen(true);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
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

          const fileInput = document.querySelector(
            'input[type="file"]'
          ) as HTMLInputElement;
          if (fileInput) fileInput.value = "";

          showAlert("File uploaded successfully", "success");
        },
        onError: () => {
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
          closeModal();
        },
        onError: (error) => {
          showAlert(`${error.message}` || "Failed to update status", "error");
        },
      }
    );
  };

  const handleDelete = () => {
    if (!selectedClearance) return;

    deleteClearance(selectedClearance.id, {
      onSuccess: () => {
        refetch();
        showAlert("Clearance request deleted successfully", "success");
        closeModal();
      },
      onError: () => {
        showAlert("Failed to delete clearance request", "error");
      },
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsStatusModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedClearance(null);
    setSelectedFile(null);
    setFileName("");
    setUploadedFiles([]);
  };

  if (isPending) {
    return <ClearanceSkeleton />;
  }

  const clearances = data?.data || [];

  return (
    <UserDashboardWrapper>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ClearanceTable
            clearances={clearances}
            onViewDetails={handleViewDetails}
          />
        </div>
      </div>

      {isModalOpen && selectedClearance && (
        <ClearanceDetailsModal
          clearance={selectedClearance}
          onClose={closeModal}
          onDelete={() => handleOpenDeleteModal(selectedClearance)}
          onUpdateStatus={() => handleOpenStatusModal(selectedClearance)}
          isDeleting={isDeleting}
        />
      )}

      {isStatusModalOpen && selectedClearance && (
        <StatusUpdateModal
          clearance={selectedClearance}
          selectedStatus={selectedStatus}
          selectedFile={selectedFile}
          fileName={fileName}
          uploadedFiles={uploadedFiles}
          isUpdating={updatingStatus}
          isUploading={uploading}
          onStatusChange={setSelectedStatus}
          onFileSelect={handleFileSelect}
          onFileNameChange={setFileName}
          onUploadFile={handleUploadFile}
          onRemoveUploadedFile={removeUploadedFile}
          onStatusUpdate={handleStatusUpdate}
          onClose={closeModal}
        />
      )}

      {isDeleteModalOpen && selectedClearance && (
        <DeleteConfirmationModal
          clearance={selectedClearance}
          onConfirm={handleDelete}
          onCancel={closeModal}
          isDeleting={isDeleting}
        />
      )}
    </UserDashboardWrapper>
  );
}

export default AdminCustomClearance;
