import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Alert({
  message,
  type = "info",
}: {
  message: string;
  type?: "success" | "error" | "info" | "warning";
}) {
  const typeStyles = {
    success: "bg-green-100 text-green-800 border-green-300",
    error: "bg-red-100 text-red-800 border-red-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    info: "bg-blue-100 text-blue-800 border-blue-300",
  };

  return (
    <div
      className={`p-4 border rounded-lg shadow ${typeStyles[type]} flex items-center gap-2`}
    >
      <span>{message}</span>
      <XMarkIcon className="w-4 h-4" />
    </div>
  );
}
