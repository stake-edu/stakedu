import React, { ReactNode, useState } from "react";

interface AlertDismissibleProps {
  variant: "info" | "success" | "warning" | "error";
  title: string;
  children: ReactNode;
  buttonTitle?: string;
  buttonAction?: () => void;
}

export const AlertDismissible: React.FC<AlertDismissibleProps> = ({
  variant,
  title,
  children,
  buttonTitle = "Close",
  buttonAction,
}) => {
  const [show, setShow] = useState(true);

  const handleButtonAction = buttonAction || (() => setShow(false));

  if (!show) return null;

  const variantStyles = {
    info: "bg-blue-100 border-blue-500 text-blue-700",
    success: "bg-green-100 border-green-500 text-green-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
    error: "bg-red-100 border-red-500 text-red-700",
  };

  return (
    <div className={`border-l-4 p-4 ${variantStyles[variant]}`}>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-bold">{title}</h3>
        <button
          onClick={handleButtonAction}
          className={`rounded border px-4 py-2 text-sm font-medium ${
            variant === "info"
              ? "border-blue-500 text-blue-500 hover:bg-blue-100"
              : variant === "success"
                ? "border-green-500 text-green-500 hover:bg-green-100"
                : variant === "warning"
                  ? "border-yellow-500 text-yellow-500 hover:bg-yellow-100"
                  : "border-red-500 text-red-500 hover:bg-red-100"
          }`}
        >
          {buttonTitle}
        </button>
      </div>
      <p>{children}</p>
    </div>
  );
};

export default AlertDismissible;
