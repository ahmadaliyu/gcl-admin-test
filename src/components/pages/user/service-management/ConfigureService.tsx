"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  useConfigureService,
  useGetLegs,
  useGetServices,
} from "@/services/hooks/services";
import { toast } from "sonner";
import { useAlert } from "@/components/reuseables/Alert/alert-context";

export function ConfigureFullService() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedLegs, setSelectedLegs] = useState<string[]>([]);
  const { data: legsData } = useGetLegs();
  const { data: serviceData } = useGetServices();
  const { mutate, isPending } = useConfigureService();

  const { showAlert } = useAlert();

  const toggleLegSelection = (legId: string) => {
    setSelectedLegs((prev) =>
      prev.includes(legId)
        ? prev.filter((id) => id !== legId)
        : [...prev, legId]
    );
  };

  const handlePublish = () => {
    if (!selectedService || selectedLegs.length === 0) return;

    const payload = {
      service_id: selectedService,
      leg_ids: selectedLegs,
    };
    // console.log({
    //   serviceId: selectedService,
    //   payload,
    // });

    mutate(
      {
        serviceId: selectedService,
        payload,
      },
      {
        onSuccess: () => {
          showAlert("Service bundle configured successfully", "success");
          toast.success("Service bundle configured successfully");
          setSelectedService(null);
          setSelectedLegs([]);
        },
        onError: () => {
          showAlert("Failed to configure service bundle", "error");
        },
      }
    );
  };

  return (
    <TooltipProvider>
      <Sheet>
        <SheetTrigger asChild>
          <button className="flex items-center gap-2 bg-[#FCE8E9] hover:bg-[#f9d1d2] text-[#CC1F2F] text-sm font-medium px-4 py-2 rounded-lg transition-all">
            <Plus size={16} /> Configure Full Service
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full sm:max-w-[800px] overflow-y-auto"
        >
          <div className="p-6">
            <h2 className="text-xl font-regular mb-6">
              Configure Service Bundle
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Select a service and assign delivery legs
            </p>

            {/* Services List */}
            <div className="mb-8">
              <h3 className="mb-2 font-bold">Available Services</h3>
              <div className="space-y-3">
                {Array.isArray(serviceData?.data) &&
                  serviceData.data.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedService === service.id
                          ? "border-[#0088DD] bg-blue-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {service.image_url && (
                          <div className="w-16 h-16 relative flex-shrink-0">
                            <Image
                              src={service.image_url}
                              alt={service.name}
                              fill
                              className="object-contain"
                              unoptimized
                            />
                          </div>
                        )}
                        <div className="min-w-0">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <h4 className="font-medium truncate">
                                {service.name}
                              </h4>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{service.name}</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <p className="text-sm text-gray-500 capitalize truncate">
                                {service.service_type.replace(/_/g, " ")}
                              </p>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{service.service_type.replace(/_/g, " ")}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Legs Selection */}
            <div>
              <h3 className="mb-2 font-bold">Available Legs</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                {Array.isArray(legsData?.data) &&
                  legsData.data.map((leg) => (
                    <div
                      key={leg.id}
                      className={`border rounded-lg p-3 shadow-sm bg-white relative ${
                        selectedLegs.includes(leg.id) ? "border-[#0088DD]" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <label className="flex items-center gap-2 min-w-0">
                          <input
                            type="checkbox"
                            checked={selectedLegs.includes(leg.id)}
                            onChange={() => toggleLegSelection(leg.id)}
                            className="h-4 w-4 text-[#0088DD] rounded flex-shrink-0"
                          />
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <p className="text-gray-600 truncate max-w-full">
                                {`${leg.name}`}
                              </p>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs whitespace-pre-line">
                              <div className="text-sm space-y-1">
                                <p>
                                  <span className="font-semibold">Leg:</span>{" "}
                                  {leg.name}
                                </p>
                                <p>
                                  <span className="font-semibold">Origin:</span>{" "}
                                  {leg.origin_name} ({leg.origin_country})
                                </p>
                                <p>
                                  <span className="font-semibold">
                                    Destination:
                                  </span>{" "}
                                  {leg.destination_name} (
                                  {leg.destination_country})
                                </p>
                                <p>
                                  <span className="font-semibold">
                                    Estimated Time:
                                  </span>{" "}
                                  {leg.estimated_delivery_time} hours
                                </p>
                                <p>
                                  <span className="font-semibold">
                                    Handling Fee:
                                  </span>{" "}
                                  ${leg.handling_fee}
                                </p>
                                <p>
                                  <span className="font-semibold">
                                    Order No:
                                  </span>{" "}
                                  {leg.order_no}
                                </p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </label>
                        <span className="text-xs font-semibold text-blue-600 border border-blue-600 px-2 py-0.5 rounded-full flex-shrink-0">
                          {leg.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>

                      <div className="space-y-1 text-xs text-gray-700">
                        <p className="truncate">
                          <span className="font-semibold">Route:</span>{" "}
                          {leg.origin_name} ({leg.origin_country}) →{" "}
                          {leg.destination_name} ({leg.destination_country})
                        </p>
                        <p>
                          <span className="font-semibold">Courier:</span>{" "}
                          {leg.courier_handler}
                        </p>
                        <p>
                          <span className="font-semibold">Fee:</span> ₦
                          {leg.handling_fee}
                        </p>
                        <p>
                          <span className="font-semibold">ETA:</span>{" "}
                          {leg.estimated_delivery_time} hrs
                        </p>
                        <p>
                          <span className="font-semibold">Weight:</span>{" "}
                          {leg.min_weight}kg - {leg.max_weight}kg
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
              <button
                className="px-4 sm:px-6 py-2 rounded-full text-sm font-medium bg-blue-600 text-white disabled:opacity-50"
                disabled={
                  !selectedService || selectedLegs.length === 0 || isPending
                }
                onClick={handlePublish}
              >
                {isPending ? "Publishing..." : "Publish"}
              </button>
              {/* 
              <button className="px-4 sm:px-6 py-2 rounded-full text-sm font-medium bg-gray-200 text-gray-800">
                Save as Draft
              </button>
              */}
              <button
                className="px-4 sm:px-6 py-2 rounded-full text-sm font-medium bg-red-100 text-red-600"
                onClick={() => {
                  setSelectedService(null);
                  setSelectedLegs([]);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  );
}
