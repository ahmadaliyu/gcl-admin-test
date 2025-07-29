"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/reuseables/Label";
import { Switch } from "@/components/reuseables/Switch";
import { useState } from "react";
import { useCreateCourier, useGetCouriers } from "@/services/hooks/services";
import { useUploadFile } from "@/services/hooks/auth/useUploadFile";
import { useAlert } from "@/components/reuseables/Alert/alert-context";
import { formatType } from "@/lib/formatType";
import { toast } from "sonner";

export function CreateCourierSheet() {
  const [isActive, setIsActive] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePath, setImagePath] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { showAlert } = useAlert();

  const { data, isPending: loadingCourier, refetch } = useGetCouriers();
  const {
    mutate,
    isPending: creatingCourier,
    error,
  } = useCreateCourier((res) => {
    console.log(res, "Create Courier Response");

    if (res.success) {
      showAlert("Courier created successfully!", "success");
      refetch(); // Refresh the couriers list
    } else {
      showAlert("Failed to create courier", "error");
    }
  });
  const { mutate: uploadFile, isPending: uploading } = useUploadFile((res) => {
    if (res.success) {
      setImagePath(res.data.filePath as any);
      setImagePreview(res.data.filePath);
      showAlert("File uploaded successfully!", "success");
    }
  });

  const handleInputChange = (id: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleUpload = () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);

      uploadFile({ payload: formData }); // ✅ send FormData directly
      // uploadFile(formData); // ✅ send FormData directly
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formValues["name"] || "",
      display_name: formValues["display_name"] || "",
      courier_dc_name: formValues["courier_dc_name"] || "",
      auth_company: formValues["auth_company"] || "",
      pricing_rule: formValues["pricing_rule"] || "",
      short_description: formValues["short_description"] || "",
      long_name: formValues["long_name"] || "",
      is_active: isActive,
      image_path: typeof imagePath === "string" ? imagePath : "",
    };

    // console.log("Create Courier Payload:", payload);
    mutate(
      { payload },
      {
        onSuccess: (res) => {
          if (res?.data?.success) {
            toast.success("Courier created successfully!");
            // showAlert("Courier created successfully!", "success");
            refetch(); // Refresh the couriers list
          } else {
            showAlert("Failed to create courier", "error");
          }
        },
        onError: (err: any) => {
          console.error("Courier creation failed:", err);
          toast.success(err.message);
          // showAlert(err?.message || "Something went wrong", "error");
        },
      }
    );
    // 🔥 Now you can trigger courier creation API with this payload
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="flex items-center gap-2 bg-[#FCE8E9] hover:bg-[#f9d1d2] text-[#CC1F2F]">
          <Plus size={16} /> New Courier
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full max-w-full sm:max-w-[600px] overflow-y-auto p-4 sm:p-6"
      >
        <SheetHeader className="mb-6">
          <SheetTitle>Create New Courier</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { id: "name", label: "Name *", placeholder: "express_courier_3" },
            {
              id: "display_name",
              label: "Display Name *",
              placeholder: "Express Courier 3",
            },
            {
              id: "courier_dc_name",
              label: "Courier DC Name *",
              placeholder: "express_courier_dc",
            },
            {
              id: "auth_company",
              label: "Auth Company *",
              placeholder: "Express Logistics Ltd.",
            },
            {
              id: "pricing_rule",
              label: "Pricing Rule *",
              placeholder: "flat_rate",
            },
            {
              id: "short_description",
              label: "Short Description *",
              placeholder: "Enter a brief description",
            },
            {
              id: "long_name",
              label: "Long Name *",
              placeholder: "Express Courier Service International",
            },
          ].map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>{field.label}</Label>
              <Input
                id={field.id}
                placeholder={field.placeholder}
                required
                value={formValues[field.id] || ""}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
              />
            </div>
          ))}

          {/* Active Toggle */}
          <div className="flex items-center gap-3">
            <Switch checked={isActive} onChange={setIsActive} />
            <Label htmlFor="is_active">Active</Label>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-4 border p-4 rounded-lg">
            <Label htmlFor="image">Courier Image</Label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full sm:w-auto"
              />
              <Button
                type="button"
                onClick={handleUpload}
                disabled={!imageFile || uploading}
              >
                {uploading ? "Uploading..." : "Upload"}
              </Button>
            </div>

            {imagePreview && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-20 object-contain border rounded max-w-full"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-6">
            {creatingCourier ? "creating..." : "Create Courier"}
          </Button>
        </form>

        {/* Existing Couriers List */}
        <div className="mt-12">
          <h3 className="font-medium mb-4 text-base sm:text-lg">
            Existing Couriers
          </h3>
          {/* Table would go here */}
          {/* Existing Couriers List */}
          <div className="mt-12">
            <h3 className="font-medium mb-4 text-base sm:text-lg">
              Existing Couriers
            </h3>

            {Array.isArray(data?.data) && data.data.length > 0 ? (
              <div className="overflow-auto rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                        Display Name
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                        Company
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                        Pricing Rule
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                        Active
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.data.map((courier) => (
                      <tr key={courier.id}>
                        <td className="px-4 py-2">{courier.display_name}</td>
                        <td className="px-4 py-2">{courier.auth_company}</td>
                        <td className="px-4 py-2 capitalize">
                          {formatType(courier.pricing_rule)}
                        </td>
                        <td className="px-4 py-2">
                          {courier.is_active ? (
                            <span className="text-green-600 font-medium">
                              Yes
                            </span>
                          ) : (
                            <span className="text-red-600 font-medium">No</span>
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {new Date(courier.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No couriers available.</p>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
