"use client";

import { createContext, useContext, useState, useCallback } from "react";
import Alert from ".";

type AlertType = "success" | "error" | "info" | "warning";

type AlertContextType = {
  showAlert: (message: string, type?: AlertType) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<AlertType>("info");

  const showAlert = useCallback(
    (msg: string, alertType: AlertType = "info") => {
      setMessage(msg);
      setType(alertType);
      setTimeout(() => setMessage(""), 3000); // auto dismiss
    },
    []
  );

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {message && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <Alert message={message} type={type} />
        </div>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used within AlertProvider");
  return context;
};
