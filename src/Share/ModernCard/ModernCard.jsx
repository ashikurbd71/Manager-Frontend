import React from 'react';
import { FaEllipsisV, FaTimes } from 'react-icons/fa';

const ModernCard = ({
    children,
    title,
    subtitle,
    headerAction,
    onClose,
    variant = 'default',
    className = "",
    padding = 'default',
    shadow = 'default',
    border = true,
    hover = false,
    loading = false,
    ...props
}) => {
    const getVariantClasses = () => {
        switch (variant) {
            case 'primary':
                return 'bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200';
            case 'success':
                return 'bg-gradient-to-br from-success-50 to-success-100 border-success-200';
            case 'warning':
                return 'bg-gradient-to-br from-warning-50 to-warning-100 border-warning-200';
            case 'error':
                return 'bg-gradient-to-br from-error-50 to-error-100 border-error-200';
            case 'glass':
                return 'glass';
            default:
                return 'bg-white';
        }
    };

    const getPaddingClasses = () => {
        switch (padding) {
            case 'none':
                return '';
            case 'small':
                return 'p-4';
            case 'large':
                return 'p-8';
            default:
                return 'p-6';
        }
    };

    const getShadowClasses = () => {
        switch (shadow) {
            case 'none':
                return '';
            case 'small':
                return 'shadow-soft';
            case 'large':
                return 'shadow-large';
            case 'glow':
                return 'shadow-glow';
            default:
                return 'shadow-soft';
        }
    };

    const getBorderClasses = () => {
        if (!border) return '';
        return 'border border-secondary-100';
    };

    const getHoverClasses = () => {
        if (!hover) return '';
        return 'hover:shadow-medium hover:scale-[1.02] transition-all duration-300';
    };

    return (
        <div
            className={`
                card rounded-2xl overflow-hidden
                ${getVariantClasses()}
                ${getShadowClasses()}
                ${getBorderClasses()}
                ${getHoverClasses()}
                ${className}
            `}
            {...props}
        >
            {/* Header */}
            {(title || subtitle || headerAction || onClose) && (
                <div className="card-header">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                            {title && (
                                <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                                    {title}
                                </h3>
                            )}
                            {subtitle && (
                                <p className="text-sm text-secondary-600">
                                    {subtitle}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                            {headerAction && (
                                <div className="flex items-center space-x-2">
                                    {headerAction}
                                </div>
                            )}
                            {onClose && (
                                <button
                                    onClick={onClose}
                                    className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-all duration-200"
                                >
                                    <FaTimes className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Body */}
            <div className={`${getPaddingClasses()}`}>
                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="flex items-center space-x-2">
                            <div className="loading-spinner w-6 h-6"></div>
                            <span className="text-secondary-600">Loading...</span>
                        </div>
                    </div>
                ) : (
                    children
                )}
            </div>
        </div>
    );
};

// Card Grid Component
export const CardGrid = ({
    children,
    columns = 1,
    gap = 6,
    className = ""
}) => {
    const getGridClasses = () => {
        const baseClasses = 'grid gap-6';
        const columnClasses = {
            1: 'grid-cols-1',
            2: 'grid-cols-1 md:grid-cols-2',
            3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
            4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
            5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
            6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
        };

        return `${baseClasses} ${columnClasses[columns] || columnClasses[1]}`;
    };

    return (
        <div className={`${getGridClasses()} ${className}`}>
            {children}
        </div>
    );
};

// Stat Card Component
export const StatCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    trend,
    trendValue,
    trendType = 'neutral',
    variant = 'default',
    className = ""
}) => {
    const getTrendIcon = () => {
        if (!trend) return null;

        const iconClass = "w-4 h-4";
        if (trend === 'up') {
            return (
                <svg className={`${iconClass} text-success-600`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            );
        } else if (trend === 'down') {
            return (
                <svg className={`${iconClass} text-error-600`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            );
        }
        return null;
    };

    const getTrendColor = () => {
        switch (trendType) {
            case 'positive':
                return 'text-success-600';
            case 'negative':
                return 'text-error-600';
            default:
                return 'text-secondary-600';
        }
    };

    return (
        <ModernCard
            variant={variant}
            className={`stat-card ${className}`}
        >
            <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-secondary-600 mb-1">
                        {title}
                    </p>
                    <p className="text-3xl font-bold text-secondary-900 mb-1">
                        {value}
                    </p>
                    {subtitle && (
                        <p className="text-xs text-secondary-500 mb-2">
                            {subtitle}
                        </p>
                    )}
                    {trend && trendValue && (
                        <div className="flex items-center space-x-1">
                            {getTrendIcon()}
                            <span className={`text-xs font-medium ${getTrendColor()}`}>
                                {trendValue}
                            </span>
                        </div>
                    )}
                </div>
                {Icon && (
                    <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Icon className="text-3xl text-secondary-600" />
                    </div>
                )}
            </div>
        </ModernCard>
    );
};

// Feature Card Component
export const FeatureCard = ({
    title,
    description,
    icon: Icon,
    action,
    actionText,
    variant = 'default',
    className = ""
}) => {
    return (
        <ModernCard
            variant={variant}
            className={`text-center hover:scale-105 transition-transform duration-200 ${className}`}
        >
            {Icon && (
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-2xl text-primary-600" />
                </div>
            )}
            <h3 className="font-semibold text-secondary-900 mb-2">
                {title}
            </h3>
            <p className="text-sm text-secondary-600 mb-4">
                {description}
            </p>
            {action && actionText && (
                <button
                    onClick={action}
                    className="btn btn-primary btn-sm"
                >
                    {actionText}
                </button>
            )}
        </ModernCard>
    );
};

export default ModernCard;
