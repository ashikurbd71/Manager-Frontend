import React, { useState, useEffect } from 'react';
import {
    FaCheckCircle,
    FaExclamationTriangle,
    FaInfoCircle,
    FaTimes,
    FaExclamationCircle
} from 'react-icons/fa';

const ModernAlert = ({
    type = 'info',
    title,
    message,
    show = true,
    onClose,
    autoClose = false,
    autoCloseDelay = 5000,
    className = "",
    showIcon = true,
    showCloseButton = true,
    action,
    actionText
}) => {
    const [isVisible, setIsVisible] = useState(show);

    useEffect(() => {
        setIsVisible(show);
    }, [show]);

    useEffect(() => {
        if (autoClose && isVisible) {
            const timer = setTimeout(() => {
                handleClose();
            }, autoCloseDelay);

            return () => clearTimeout(timer);
        }
    }, [autoClose, autoCloseDelay, isVisible]);

    const handleClose = () => {
        setIsVisible(false);
        if (onClose) {
            onClose();
        }
    };

    const getAlertStyles = () => {
        const baseStyles = "alert p-4 rounded-xl border-l-4 flex items-start space-x-3";

        switch (type) {
            case 'success':
                return `${baseStyles} alert-success`;
            case 'error':
                return `${baseStyles} alert-error`;
            case 'warning':
                return `${baseStyles} alert-warning`;
            case 'info':
                return `${baseStyles} alert-info`;
            default:
                return `${baseStyles} alert-info`;
        }
    };

    const getIcon = () => {
        const iconClass = "w-5 h-5 mt-0.5 flex-shrink-0";

        switch (type) {
            case 'success':
                return <FaCheckCircle className={`${iconClass} text-success-600`} />;
            case 'error':
                return <FaExclamationCircle className={`${iconClass} text-error-600`} />;
            case 'warning':
                return <FaExclamationTriangle className={`${iconClass} text-warning-600`} />;
            case 'info':
                return <FaInfoCircle className={`${iconClass} text-primary-600`} />;
            default:
                return <FaInfoCircle className={`${iconClass} text-primary-600`} />;
        }
    };

    if (!isVisible) return null;

    return (
        <div className={`${getAlertStyles()} ${className}`}>
            {showIcon && getIcon()}

            <div className="flex-1 min-w-0">
                {title && (
                    <h4 className="text-sm font-semibold mb-1">
                        {title}
                    </h4>
                )}
                {message && (
                    <p className="text-sm">
                        {message}
                    </p>
                )}
                {action && actionText && (
                    <button
                        onClick={action}
                        className="mt-2 text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent rounded"
                    >
                        {actionText}
                    </button>
                )}
            </div>

            {showCloseButton && (
                <button
                    onClick={handleClose}
                    className="p-1 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-all duration-200 flex-shrink-0"
                >
                    <FaTimes className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

// Alert Container for multiple alerts
export const AlertContainer = ({ children, className = "" }) => {
    return (
        <div className={`space-y-4 ${className}`}>
            {children}
        </div>
    );
};

// Toast-style alert
export const ToastAlert = ({ ...props }) => {
    return (
        <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
            <ModernAlert {...props} />
        </div>
    );
};

// Banner-style alert
export const BannerAlert = ({ ...props }) => {
    return (
        <div className="w-full">
            <ModernAlert {...props} className="rounded-none border-l-0 border-t-4" />
        </div>
    );
};

export default ModernAlert;
