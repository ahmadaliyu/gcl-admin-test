"use client";

import Button from "@/components/reuseables/Button";

interface BookingLabel {
  id: string;
  status: string;
  courier: string;
  tracking_codes?: string[];
  type: string;
  createdAt: string;
  uri: string;
}

interface ShippingLabelsProps {
  labels?: BookingLabel[];
  onDownloadLabel: (uri: string, labelId: string) => void;
}

export default function ShippingLabels({
  labels,
  onDownloadLabel,
}: ShippingLabelsProps) {
  return (
    <div className="border rounded-lg p-4 mb-6">
      <p className="font-semibold text-base mb-4">Shipping Labels</p>

      {labels?.length ? (
        <div className="grid gap-4">
          {labels.map((label) => {
            const statusColor =
              {
                created: "bg-green-100 text-green-800",
                processing: "bg-blue-100 text-blue-800",
                error: "bg-red-100 text-red-800",
                cancelled: "bg-gray-100 text-gray-800",
              }[label.status.toLowerCase()] || "bg-gray-100 text-gray-800";

            return (
              <div key={label.id} className="border p-4 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-500">Courier</p>
                    <p className="font-medium">{label.courier}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <span
                      className={`font-medium capitalize px-2 py-1 rounded-full text-xs ${statusColor}`}
                    >
                      {label.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-500">Tracking Number</p>
                    <p className="font-medium">
                      {label.tracking_codes?.[0] || "Not available"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Type</p>
                    <p className="font-medium">{label.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Created</p>
                    <p className="font-medium">
                      {new Date(label.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={() => onDownloadLabel(label.uri, label.id)}
                      title="Download PDF"
                      variant="primary"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          No labels generated yet
        </div>
      )}
    </div>
  );
}
