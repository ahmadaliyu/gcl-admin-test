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
import { Leg, useCreateLeg, useGetLegs } from "@/services/hooks/services";
import { useAlert } from "@/components/reuseables/Alert/alert-context";
import { toast } from "sonner";

export function CreateServiceLegSheet() {
  const [formData, setFormData] = useState({
    name: "",
    start_at: "",
    origin_country: "",
    end_at: "",
    destination_country: "",
    courier_handler: "",
    handling_fee: "",
    estimated_delivery_time: "",
    max_weight: "",
    min_weight: "",
    has_dependency: false,
    is_active: false,
    order_no: "",
  });

  const { mutate, isPending } = useCreateLeg();
  const { data, isFetching, refetch } = useGetLegs();

  const { showAlert } = useAlert();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (name: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      max_weight: Number(formData.max_weight),
      min_weight: Number(formData.min_weight),
      order_no: Number(formData.order_no),
    };

    mutate(
      { payload },
      {
        onSuccess: () => {
          // showAlert("Leg created successfully!", "success");
          toast.success("Leg created successfully!");
          refetch();
          setFormData({
            name: "",
            start_at: "",
            origin_country: "",
            end_at: "",
            destination_country: "",
            courier_handler: "",
            handling_fee: "",
            estimated_delivery_time: "",
            max_weight: "",
            min_weight: "",
            has_dependency: false,
            is_active: false,
            order_no: "",
          });
        },
        onError: (error) => {
          console.error("Error creating leg:", error);
          toast.error(`Error creating leg: ${error.message}`);
          // showAlert(`Error creating leg: ${error.message}`, "error");
        },
      }
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="flex items-center gap-2 bg-[#FCE8E9] hover:bg-[#f9d1d2] text-[#CC1F2F]">
          <Plus size={16} /> New Leg
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[700px] p-6 flex flex-col"
      >
        {/* Sheet Header */}
        <SheetHeader className="mb-6 shrink-0">
          <SheetTitle>Add New Leg</SheetTitle>
        </SheetHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto space-y-10 pr-2">
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {
                label: "Leg Name",
                name: "name",
                placeholder: "e.g., DoorToOffice2222",
              },
              {
                label: "Start At",
                name: "start_at",
                placeholder: "e.g., door",
              },
              {
                label: "Origin Country",
                name: "origin_country",
                placeholder: "e.g., NG",
              },
              { label: "End At", name: "end_at", placeholder: "e.g., office" },
              {
                label: "Destination Country",
                name: "destination_country",
                placeholder: "e.g., Worldwide",
              },
              {
                label: "Courier Handler",
                name: "courier_handler",
                placeholder: "e.g., DHL",
              },
              {
                label: "Handling Fee",
                name: "handling_fee",
                placeholder: "e.g., 15.00",
              },
              {
                label: "Estimated Delivery Time (hrs)",
                name: "estimated_delivery_time",
                placeholder: "e.g., 24",
              },
              {
                label: "Max Weight (kg)",
                name: "max_weight",
                placeholder: "e.g., 10",
              },
              {
                label: "Min Weight (kg)",
                name: "min_weight",
                placeholder: "e.g., 2",
              },
              { label: "Order No", name: "order_no", placeholder: "e.g., 2" },
            ].map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>{field.label} *</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={(formData as any)[field.name]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            {/* Boolean Switches */}
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.has_dependency}
                onChange={(val) => handleSwitchChange("has_dependency", val)}
              />
              <Label>Has Dependency</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_active}
                onChange={(val) => handleSwitchChange("is_active", val)}
              />
              <Label>Active</Label>
            </div>

            <Button type="submit" className="w-full mt-6" disabled={isPending}>
              {isPending ? "Creating..." : "Create Leg"}
            </Button>
          </form>

          {/* Table Section */}
          <div>
            <h3 className="font-medium mb-4">Existing Legs</h3>
            <div className="overflow-auto max-h-[300px] border rounded-md">
              <table className="min-w-full border text-sm">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="p-2 border">#</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Origin</th>
                    <th className="p-2 border">Destination</th>
                    <th className="p-2 border">Courier</th>
                    <th className="p-2 border">Fee</th>
                    <th className="p-2 border">ETA</th>
                    <th className="p-2 border">Min-Max Wt</th>
                    <th className="p-2 border">Dependency</th>
                    <th className="p-2 border">Active</th>
                    <th className="p-2 border">Order</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.length ? (
                    data.data.map((leg: Leg, index: number) => (
                      <tr key={leg.id}>
                        <td className="p-2 border text-center">{index + 1}</td>
                        <td className="p-2 border">{leg.name}</td>
                        <td className="p-2 border">{leg.origin_country}</td>
                        <td className="p-2 border">
                          {leg.destination_country}
                        </td>
                        <td className="p-2 border">{leg.courier_handler}</td>
                        <td className="p-2 border">${leg.handling_fee}</td>
                        <td className="p-2 border">
                          {leg.estimated_delivery_time}h
                        </td>
                        <td className="p-2 border">
                          {leg.min_weight} - {leg.max_weight}kg
                        </td>
                        <td className="p-2 border text-center">
                          {leg.has_dependency ? "✅" : "❌"}
                        </td>
                        <td className="p-2 border text-center">
                          {leg.is_active ? "✅" : "❌"}
                        </td>
                        <td className="p-2 border text-center">
                          {leg.order_no}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={11}
                        className="p-4 text-center text-gray-500"
                      >
                        No service legs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
