"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/reuseables/Label";
import { Switch } from "@/components/reuseables/Switch";
import { useState } from "react";
import {
  Service,
  useCreateService,
  useGetServices,
} from "@/services/hooks/services";
import { useAlert } from "@/components/reuseables/Alert/alert-context";
import { toast } from "sonner";

export function CreateServiceSheet() {
  const [name, setName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [pendingServices, setPendingServices] = useState<
    { name: string; service_type: string; is_active: boolean }[]
  >([]);

  const { mutate, isPending } = useCreateService();
  const { data, refetch } = useGetServices();
  const { showAlert } = useAlert();

  const resetForm = () => {
    setName("");
    setServiceType("");
    setIsActive(false);
  };

  const handleAddService = () => {
    if (!name || !serviceType) {
      showAlert("Please provide a name and service type.", "error");
      return;
    }

    setPendingServices((prev) => [
      ...prev,
      { name, service_type: serviceType, is_active: isActive },
    ]);
    resetForm();
  };

  const handleDeleteService = (index: number) => {
    setPendingServices((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pendingServices.length === 0) {
      showAlert("Add at least one service to submit.", "error");
      return;
    }

    mutate(
      { payload: { services: pendingServices } },
      {
        onSuccess: () => {
          refetch();
          setPendingServices([]);
          resetForm();
          toast.success("Services created successfully!");
          // showAlert("Services created successfully!", "success");
        },
        onError: (error) => {
          // showAlert(`Error creating service: ${error.message}`, "error");
          toast.error(`Error creating service: ${error.message}`);
        },
      }
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="flex items-center gap-2 bg-[#FCE8E9] hover:bg-[#f9d1d2] text-[#CC1F2F]">
          <Plus size={16} /> New Service Bundle
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-[700px] overflow-y-auto"
      >
        <SheetHeader className="mb-6">
          <SheetTitle>Create New Services</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Create New Service Inputs */}
          <div className="space-y-4 border-b pb-4">
            <h4 className="font-semibold text-sm">Add Service</h4>

            <div className="space-y-2">
              <Label htmlFor="name">Service Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Express Delivery"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Service Type *</Label>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="air_freight">Air Freight</SelectItem>
                  <SelectItem value="road_freight">Road Freight</SelectItem>
                  <SelectItem value="sea_freight">Sea Freight</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Switch checked={isActive} onChange={setIsActive} />
              <Label htmlFor="is_active">Active</Label>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleAddService}
              className="mt-4"
            >
              + Add to List
            </Button>
          </div>

          {/* Pending Services List */}
          {pendingServices.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">
                Services to be created
              </h4>
              <table className="w-full border text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 border"></th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Type</th>
                    <th className="p-2 border">Active</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingServices.map((s, i) => (
                    <tr key={i}>
                      <td className="p-2 border text-center">{i + 1}</td>

                      {/* Editable Name */}
                      <td className="p-2 border">
                        <Input
                          value={s.name}
                          onChange={(e) => {
                            const updated = [...pendingServices];
                            updated[i].name = e.target.value;
                            setPendingServices(updated);
                          }}
                          className="h-8 text-sm"
                        />
                      </td>

                      {/* Editable Service Type */}
                      <td className="p-2 border">
                        <Select
                          value={s.service_type}
                          onValueChange={(value) => {
                            const updated = [...pendingServices];
                            updated[i].service_type = value;
                            setPendingServices(updated);
                          }}
                        >
                          <SelectTrigger className="h-8 text-sm">
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="air_freight">
                              Air Freight
                            </SelectItem>
                            <SelectItem value="road_freight">
                              Road Freight
                            </SelectItem>
                            <SelectItem value="sea_freight">
                              Sea Freight
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </td>

                      {/* Editable is_active */}
                      <td className="p-2 border text-center">
                        <Switch
                          checked={s.is_active}
                          onChange={(checked) => {
                            const updated = [...pendingServices];
                            updated[i].is_active = checked;
                            setPendingServices(updated);
                          }}
                        />
                      </td>

                      {/* Delete Action */}
                      <td className="p-2 border text-center">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDeleteService(i)}
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>

        {/* Existing Services Table */}
        <div className="mt-12">
          <h3 className="font-medium mb-4 text-base sm:text-lg">
            Existing Services
          </h3>

          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border"></th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Type</th>
                  <th className="p-2 border">Active</th>
                  <th className="p-2 border">Created At</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((service: Service, idx: number) => (
                  <tr key={service.id}>
                    <td className="p-2 border text-center">{idx + 1}</td>
                    <td className="p-2 border">{service.name}</td>
                    <td className="p-2 border capitalize">
                      {service.service_type.replace("_", " ")}
                    </td>
                    <td className="p-2 border text-center">
                      {service.is_active ? "✅" : "❌"}
                    </td>
                    <td className="p-2 border">
                      {new Date(service.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
