import React from 'react';
import { FaSort, FaSortUp, FaSortDown, FaSearch, FaFilter } from 'react-icons/fa';

const ModernTable = ({
    columns,
    data,
    onSort,
    sortColumn,
    sortDirection,
    onSearch,
    searchQuery,
    searchPlaceholder = "Search...",
    showSearch = true,
    showFilters = false,
    onRowClick,
    loading = false,
    emptyMessage = "No data available",
    className = ""
}) => {
    const getSortIcon = (columnKey) => {
        if (sortColumn !== columnKey) {
            return <FaSort className="w-4 h-4 text-secondary-400" />;
        }
        return sortDirection === 'asc'
            ? <FaSortUp className="w-4 h-4 text-primary-600" />
            : <FaSortDown className="w-4 h-4 text-primary-600" />;
    };

    const handleSort = (columnKey) => {
        if (onSort) {
            const newDirection = sortColumn === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';
            onSort(columnKey, newDirection);
        }
    };

    return (
        <div className={`card ${className}`}>
            {/* Table Header with Search and Filters */}
            {(showSearch || showFilters) && (
                <div className="card-header">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        {showSearch && (
                            <div className="search-input flex-1 max-w-md">
                                <FaSearch className="search-input-icon" />
                                <input
                                    type="text"
                                    placeholder={searchPlaceholder}
                                    value={searchQuery || ''}
                                    onChange={(e) => onSearch && onSearch(e.target.value)}
                                    className="input"
                                />
                            </div>
                        )}

                        {showFilters && (
                            <button className="btn btn-secondary">
                                <FaFilter className="mr-2" />
                                Filters
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={`${column.sortable ? 'cursor-pointer hover:bg-secondary-100' : ''} ${column.className || ''
                                        }`}
                                    onClick={() => column.sortable && handleSort(column.key)}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{column.label}</span>
                                        {column.sortable && (
                                            <span className="ml-2">
                                                {getSortIcon(column.key)}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-8">
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="loading-spinner w-6 h-6"></div>
                                        <span className="text-secondary-600">Loading...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : data && data.length > 0 ? (
                            data.map((row, rowIndex) => (
                                <tr
                                    key={row.id || rowIndex}
                                    className={`hover:bg-secondary-50 transition-colors duration-200 ${onRowClick ? 'cursor-pointer' : ''
                                        }`}
                                    onClick={() => onRowClick && onRowClick(row)}
                                >
                                    {columns.map((column) => (
                                        <td key={column.key} className={column.className || ''}>
                                            {column.render ? column.render(row[column.key], row) : row[column.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-8">
                                    <div className="text-secondary-500">
                                        <svg
                                            className="w-12 h-12 mx-auto mb-4 text-secondary-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                        <p className="text-lg font-medium">{emptyMessage}</p>
                                        <p className="text-sm">No data to display at the moment.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ModernTable;
