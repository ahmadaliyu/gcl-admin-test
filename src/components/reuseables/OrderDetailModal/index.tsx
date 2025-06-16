"use client";

import React from "react";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full md:w-[600px] bg-white shadow-lg z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Modal Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">View Order Processing</h2>
          <button onClick={onClose} className="text-gray-500 text-xl">
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-72px)]">
          {/* Order Info */}
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Order #TLEZY12647488881</h3>
            <span className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">
              Approved
            </span>
          </div>

          {/* Shipping Details */}
          <div>
            <h4 className="font-semibold mb-2">Shipping Details</h4>
            <div className="grid grid-cols-2 gap-4 border rounded-md p-4">
              <div>
                <h5 className="font-semibold mb-1">Ship From</h5>
                <p>My Company Name</p>
                <p>666 Lucky Street, London. E1 2AA</p>
                <p>me@company.com</p>
                <p>+447899555555</p>
                <p>Date: 2nd March 2025</p>
              </div>
              <div>
                <h5 className="font-semibold mb-1">Ship To</h5>
                <p>Donald Maroni</p>
                <p>666 Luckier Street, London. E1 2AA</p>
                <p>finance@client.com</p>
                <p>Expected Delivery Date: 4th March 2025</p>
              </div>
            </div>
          </div>

          {/* Package Information */}
          <div>
            <h4 className="font-semibold mb-2">Package Information</h4>
            <div className="border rounded-md p-4 grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Tracking ID</p>
                <p>AHBGH689BF3757JIEJ28</p>
                <p className="font-semibold mt-2">Package Category</p>
                <p>Clothes and Shoes</p>
              </div>
              <div>
                <p className="font-semibold">Gross Weight</p>
                <p>46kg</p>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div>
            <h4 className="font-semibold mb-2">Payment Details</h4>
            <div className="border rounded-md p-4 grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Company Name</p>
                <p>Logic Tech Limited</p>
                <p className="font-semibold mt-2">Account Detail</p>
                <p>United Bank for Africa UBA</p>
              </div>
              <div>
                <p className="font-semibold">Payment Status</p>
                <p>Paid</p>
                <p className="font-semibold mt-2">Account Number</p>
                <p>0000938940</p>
                <p className="font-semibold mt-2">Payment Reference</p>
                <p>829939UR273</p>
              </div>
            </div>
          </div>

          {/* Related Invoice */}
          <div>
            <h4 className="font-semibold mb-2">Related Invoice</h4>
            <div className="border rounded-md p-4">
              <p>
                <span className="font-semibold">Invoice Number:</span> 1455
              </p>
              <p>
                <span className="font-semibold">Payment Status:</span> Paid
              </p>
            </div>
          </div>

          {/* Schedule Date */}
          <div>
            <h4 className="font-semibold mb-2">Schedule Date</h4>
            <div className="border rounded-md p-4 space-y-4">
              {/* Date Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date:
                  </label>
                  <input
                    type="date"
                    defaultValue="2025-12-22"
                    className="w-full border border-blue-500 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date:
                  </label>
                  <input
                    type="date"
                    defaultValue="2025-02-22"
                    className="w-full border border-blue-500 rounded-md p-2"
                  />
                </div>
              </div>

              {/* Notes Textarea */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-1">
                  Add Notes<span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Input your Notes....."
                  rows={3}
                  className="w-full border rounded-md p-2"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <button className="bg-blue-100 text-black px-6 py-2 rounded-full border hover:bg-blue-200 transition">
                  Track Orders
                </button>
                <button className="bg-white text-black px-6 py-2 rounded-full border hover:bg-gray-100 transition">
                  Notify Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
