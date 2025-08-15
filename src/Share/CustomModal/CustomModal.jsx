import React from 'react';
import { FaTimes } from 'react-icons/fa';

const CustomModal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnBackdrop = true
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleBackdropClick}
    >
      <div className={`modal-content ${sizeClasses[size]}`}>
        {/* Header */}
        {title && (
          <div className="card-header">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-secondary-900">
                {title}
              </h3>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-all duration-200"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Body */}
        <div className="card-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
