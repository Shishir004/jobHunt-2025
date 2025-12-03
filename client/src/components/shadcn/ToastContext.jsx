import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-5 right-5 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded shadow-md text-white text-sm transition-all duration-300
              ${toast.type === "success" ? "bg-green-500" : ""}
              ${toast.type === "error" ? "bg-red-500" : ""}
              ${toast.type === "info" ? "bg-blue-500" : ""}
              ${toast.type === "warning" ? "bg-yellow-500 text-black" : ""}
            `}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
