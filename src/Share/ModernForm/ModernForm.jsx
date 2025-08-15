import React from 'react';
import { FaEye, FaEyeSlash, FaExclamationTriangle } from 'react-icons/fa';

const ModernForm = ({
    onSubmit,
    children,
    title,
    subtitle,
    submitText = "Submit",
    cancelText = "Cancel",
    onCancel,
    loading = false,
    className = "",
    showCancel = true
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit && !loading) {
            onSubmit(e);
        }
    };

    return (
        <div className={`card ${className}`}>
            {(title || subtitle) && (
                <div className="card-header">
                    {title && (
                        <h2 className="text-xl font-semibold text-secondary-900 mb-1">
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p className="text-secondary-600">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}

            <form onSubmit={handleSubmit} className="card-body">
                <div className="space-y-6">
                    {children}
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-secondary-100">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary flex-1 sm:flex-none"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="loading-spinner w-4 h-4"></div>
                                <span>Processing...</span>
                            </div>
                        ) : (
                            submitText
                        )}
                    </button>

                    {showCancel && onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={loading}
                            className="btn btn-secondary flex-1 sm:flex-none"
                        >
                            {cancelText}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

// Form Field Components
export const FormField = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    onBlur,
    error,
    placeholder,
    required = false,
    disabled = false,
    className = "",
    icon: Icon,
    showPasswordToggle = false,
    ...props
}) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
        <div className={`form-group ${className}`}>
            {label && (
                <label htmlFor={name} className="form-label">
                    {label}
                    {required && <span className="text-error-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400" />
                )}

                <input
                    id={name}
                    name={name}
                    type={inputType}
                    value={value || ''}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`input ${Icon ? 'pl-12' : ''} ${showPasswordToggle ? 'pr-12' : ''} ${error ? 'input-error' : ''
                        }`}
                    {...props}
                />

                {showPasswordToggle && type === 'password' && (
                    <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                )}
            </div>

            {error && (
                <div className="flex items-center space-x-2 mt-1">
                    <FaExclamationTriangle className="w-4 h-4 text-error-500" />
                    <p className="form-error">{error}</p>
                </div>
            )}
        </div>
    );
};

export const FormSelect = ({
    label,
    name,
    value,
    onChange,
    onBlur,
    error,
    placeholder,
    required = false,
    disabled = false,
    className = "",
    options = [],
    ...props
}) => {
    return (
        <div className={`form-group ${className}`}>
            {label && (
                <label htmlFor={name} className="form-label">
                    {label}
                    {required && <span className="text-error-500 ml-1">*</span>}
                </label>
            )}

            <select
                id={name}
                name={name}
                value={value || ''}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                className={`input ${error ? 'input-error' : ''}`}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {error && (
                <div className="flex items-center space-x-2 mt-1">
                    <FaExclamationTriangle className="w-4 h-4 text-error-500" />
                    <p className="form-error">{error}</p>
                </div>
            )}
        </div>
    );
};

export const FormTextarea = ({
    label,
    name,
    value,
    onChange,
    onBlur,
    error,
    placeholder,
    required = false,
    disabled = false,
    className = "",
    rows = 4,
    ...props
}) => {
    return (
        <div className={`form-group ${className}`}>
            {label && (
                <label htmlFor={name} className="form-label">
                    {label}
                    {required && <span className="text-error-500 ml-1">*</span>}
                </label>
            )}

            <textarea
                id={name}
                name={name}
                value={value || ''}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                disabled={disabled}
                rows={rows}
                className={`input ${error ? 'input-error' : ''}`}
                {...props}
            />

            {error && (
                <div className="flex items-center space-x-2 mt-1">
                    <FaExclamationTriangle className="w-4 h-4 text-error-500" />
                    <p className="form-error">{error}</p>
                </div>
            )}
        </div>
    );
};

export const FormCheckbox = ({
    label,
    name,
    checked,
    onChange,
    error,
    required = false,
    disabled = false,
    className = "",
    ...props
}) => {
    return (
        <div className={`form-group ${className}`}>
            <label className="flex items-center space-x-3 cursor-pointer">
                <input
                    type="checkbox"
                    name={name}
                    checked={checked || false}
                    onChange={onChange}
                    disabled={disabled}
                    className="w-4 h-4 text-primary-600 bg-secondary-100 border-secondary-300 rounded focus:ring-primary-500 focus:ring-2"
                    {...props}
                />
                <span className="text-sm text-secondary-700">
                    {label}
                    {required && <span className="text-error-500 ml-1">*</span>}
                </span>
            </label>

            {error && (
                <div className="flex items-center space-x-2 mt-1">
                    <FaExclamationTriangle className="w-4 h-4 text-error-500" />
                    <p className="form-error">{error}</p>
                </div>
            )}
        </div>
    );
};

export default ModernForm;
