import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import './Toast.css';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: 'success' | 'info' | 'error';
}

export function Toast({ message, isVisible, onClose, type = 'info' }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`toast toast-${type}`}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="toast-message">{message}</span>
      <button
        onClick={onClose}
        className="toast-close"
        aria-label="Close notification"
      >
        <XMarkIcon width={16} height={16} />
      </button>
    </div>
  );
}

