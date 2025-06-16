import React, { useState } from 'react';

interface LogoutModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-[300px]">
        <h3 className="text-lg font-semibold text-center mb-4">Are you sure you want to log out?</h3>
        <div className="flex justify-around">
          <button onClick={onConfirm} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700">
            Confirm
          </button>
          <button onClick={onClose} className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-500">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
