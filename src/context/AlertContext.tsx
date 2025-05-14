import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, XCircle, Info, X } from 'lucide-react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertContextType {
  showAlert: (message: string, type: AlertType) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}

interface AlertProviderProps {
  children: ReactNode;
}

export function AlertProvider({ children }: AlertProviderProps) {
  const [alert, setAlert] = useState<{ message: string; type: AlertType } | null>(null);

  const showAlert = (message: string, type: AlertType) => {
    setAlert({ message, type });
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const getAlertIcon = (type: AlertType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <XCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
    }
  };

  const getAlertStyles = (type: AlertType) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 text-green-800 border-green-500';
      case 'error':
        return 'bg-red-50 text-red-800 border-red-500';
      case 'warning':
        return 'bg-yellow-50 text-yellow-800 border-yellow-500';
      case 'info':
        return 'bg-blue-50 text-blue-800 border-blue-500';
    }
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50 max-w-md"
          >
            <div className={`flex items-center p-4 rounded-lg shadow-md border-l-4 ${getAlertStyles(alert.type)}`}>
              <div className="flex-shrink-0 mr-3">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1">
                {alert.message}
              </div>
              <button
                onClick={hideAlert}
                className="flex-shrink-0 ml-3 p-1 rounded-full hover:bg-gray-200"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AlertContext.Provider>
  );
}