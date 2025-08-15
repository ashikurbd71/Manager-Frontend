import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaEdit,
    FaSave,
    FaTimes,
    FaCamera,
    FaShieldAlt,
    FaCog,
    FaBell,
    FaKey,
    FaSignOutAlt,
    FaUserCircle,
    FaBuilding,
    FaIdCard,
    FaCalendarAlt,
    FaGlobe
} from 'react-icons/fa';
import { ModernCard, ModernForm, FormField } from '../../Share/ModernComponents';
import useAuth from '../../Provider/UseAuth/useAuth';
import axoissecure from '../../Hooks/Axoisscure';

// Validation Schema for Profile Update
const ProfileSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    phone: Yup.string()
        .matches(/^[0-9+\-\s()]+$/, 'Invalid phone number')
        .required('Phone number is required'),
    address: Yup.string()
        .min(10, 'Address must be at least 10 characters')
        .required('Address is required'),
});

// Validation Schema for Password Change
const PasswordSchema = Yup.object().shape({
    currentPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Current password is required'),
    newPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('New password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

const Profile = () => {
    const { user, setUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [uploadingImage, setUploadingImage] = useState(false);

    // Profile Update Form
    const profileFormik = useFormik({
        initialValues: {
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            address: user?.address || '',
        },
        validationSchema: ProfileSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await axoissecure.put('/users/profile', values);
                if (response.status === 200) {
                    setUser({ ...user, ...values });
                    toast.success('Profile updated successfully!');
                    setIsEditing(false);
                }
            } catch (error) {
                toast.error('Failed to update profile');
                console.error('Error updating profile:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    // Password Change Form
    const passwordFormik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: PasswordSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const response = await axoissecure.put('/users/change-password', {
                    currentPassword: values.currentPassword,
                    newPassword: values.newPassword,
                });
                if (response.status === 200) {
                    toast.success('Password changed successfully!');
                    setShowPasswordModal(false);
                    resetForm();
                }
            } catch (error) {
                toast.error('Failed to change password');
                console.error('Error changing password:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    // Handle Profile Image Upload
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profile', file);

        setUploadingImage(true);
        try {
            const response = await axoissecure.put('/users/profile-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                setUser({ ...user, profile: response.data.profile });
                toast.success('Profile image updated successfully!');
            }
        } catch (error) {
            toast.error('Failed to upload image');
            console.error('Error uploading image:', error);
        } finally {
            setUploadingImage(false);
        }
    };

    const handleLogout = () => {
        // Implement logout logic
        toast.info('Logout functionality to be implemented');
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: FaUser },
        { id: 'security', label: 'Security', icon: FaShieldAlt },
        { id: 'settings', label: 'Settings', icon: FaCog },
    ];

    return (
        <>
            <Helmet><title>Manager || Profile</title></Helmet>

            <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 py-8">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                                    <FaUser className="text-white text-lg" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-secondary-900">Profile Settings</h1>
                                    <p className="text-secondary-600">Manage your account and preferences</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => setShowPasswordModal(true)}
                                    className="btn btn-outline"
                                >
                                    <FaKey className="mr-2" />
                                    Change Password
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-error"
                                >
                                    <FaSignOutAlt className="mr-2" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Profile Card */}
                        <div className="lg:col-span-1">
                            <ModernCard>
                                <div className="text-center p-6">
                                    {/* Profile Image */}
                                    <div className="relative inline-block mb-6">
                                        <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-primary mx-auto">
                                            {user?.profile ? (
                                                <img
                                                    src={`${import.meta.env.VITE_API_URL}/${user.profile}`}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                            ) : null}
                                            <div className="w-full h-full flex items-center justify-center text-white text-4xl" style={{ display: user?.profile ? 'none' : 'flex' }}>
                                                <FaUserCircle />
                                            </div>
                                        </div>

                                        {/* Upload Button */}
                                        <label className="absolute bottom-0 right-0 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-700 transition-colors">
                                            <FaCamera className="text-white text-sm" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                                disabled={uploadingImage}
                                            />
                                        </label>

                                        {uploadingImage && (
                                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                                                <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
                                            </div>
                                        )}
                                    </div>

                                    {/* User Info */}
                                    <h2 className="text-xl font-semibold text-secondary-900 mb-2">
                                        {user?.name || 'User Name'}
                                    </h2>
                                    <p className="text-secondary-600 mb-1">{user?.email || 'user@example.com'}</p>
                                    <p className="text-sm text-secondary-500 mb-4">{user?.role || 'Role'}</p>

                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-primary-600">12</div>
                                            <div className="text-xs text-secondary-600">Months</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-success-600">98%</div>
                                            <div className="text-xs text-secondary-600">Active</div>
                                        </div>
                                    </div>
                                </div>
                            </ModernCard>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            {/* Tab Navigation */}
                            <ModernCard className="mb-6">
                                <div className="border-b border-secondary-100">
                                    <nav className="flex space-x-8">
                                        {tabs.map((tab) => {
                                            const IconComponent = tab.icon;
                                            return (
                                                <button
                                                    key={tab.id}
                                                    onClick={() => setActiveTab(tab.id)}
                                                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                                            ? 'border-primary-500 text-primary-600'
                                                            : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                                                        }`}
                                                >
                                                    <IconComponent className="w-4 h-4" />
                                                    <span>{tab.label}</span>
                                                </button>
                                            );
                                        })}
                                    </nav>
                                </div>

                                {/* Tab Content */}
                                <div className="py-6">
                                    {activeTab === 'profile' && (
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-semibold text-secondary-900">Personal Information</h3>
                                                <button
                                                    onClick={() => setIsEditing(!isEditing)}
                                                    className="btn btn-outline btn-sm"
                                                >
                                                    {isEditing ? <FaTimes className="mr-2" /> : <FaEdit className="mr-2" />}
                                                    {isEditing ? 'Cancel' : 'Edit'}
                                                </button>
                                            </div>

                                            <form onSubmit={profileFormik.handleSubmit} className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <FormField
                                                        label="Full Name"
                                                        name="name"
                                                        type="text"
                                                        placeholder="Enter your full name"
                                                        icon={FaUser}
                                                        formik={profileFormik}
                                                        required
                                                        disabled={!isEditing}
                                                    />

                                                    <FormField
                                                        label="Email Address"
                                                        name="email"
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        icon={FaEnvelope}
                                                        formik={profileFormik}
                                                        required
                                                        disabled={!isEditing}
                                                    />

                                                    <FormField
                                                        label="Phone Number"
                                                        name="phone"
                                                        type="tel"
                                                        placeholder="Enter your phone number"
                                                        icon={FaPhone}
                                                        formik={profileFormik}
                                                        required
                                                        disabled={!isEditing}
                                                    />

                                                    <FormField
                                                        label="Address"
                                                        name="address"
                                                        type="text"
                                                        placeholder="Enter your address"
                                                        icon={FaMapMarkerAlt}
                                                        formik={profileFormik}
                                                        required
                                                        disabled={!isEditing}
                                                    />
                                                </div>

                                                {isEditing && (
                                                    <div className="flex justify-end space-x-3 pt-6 border-t border-secondary-100">
                                                        <button
                                                            type="button"
                                                            onClick={() => setIsEditing(false)}
                                                            className="btn btn-outline"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            disabled={profileFormik.isSubmitting}
                                                            className="btn btn-primary"
                                                        >
                                                            {profileFormik.isSubmitting ? (
                                                                <>
                                                                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                                                    Saving...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <FaSave className="mr-2" />
                                                                    Save Changes
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                )}
                                            </form>
                                        </div>
                                    )}

                                    {activeTab === 'security' && (
                                        <div className="space-y-6">
                                            <h3 className="text-lg font-semibold text-secondary-900">Security Settings</h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <ModernCard>
                                                    <div className="p-4">
                                                        <div className="flex items-center space-x-3 mb-3">
                                                            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                                                <FaKey className="text-primary-600" />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold text-secondary-900">Password</h4>
                                                                <p className="text-sm text-secondary-600">Last changed 30 days ago</p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={() => setShowPasswordModal(true)}
                                                            className="btn btn-outline btn-sm w-full"
                                                        >
                                                            Change Password
                                                        </button>
                                                    </div>
                                                </ModernCard>

                                                <ModernCard>
                                                    <div className="p-4">
                                                        <div className="flex items-center space-x-3 mb-3">
                                                            <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                                                                <FaShieldAlt className="text-success-600" />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold text-secondary-900">Two-Factor Auth</h4>
                                                                <p className="text-sm text-secondary-600">Not enabled</p>
                                                            </div>
                                                        </div>
                                                        <button className="btn btn-outline btn-sm w-full">
                                                            Enable 2FA
                                                        </button>
                                                    </div>
                                                </ModernCard>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'settings' && (
                                        <div className="space-y-6">
                                            <h3 className="text-lg font-semibold text-secondary-900">Account Settings</h3>

                                            <div className="space-y-4">
                                                <ModernCard>
                                                    <div className="p-4">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center space-x-3">
                                                                <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
                                                                    <FaBell className="text-warning-600" />
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-semibold text-secondary-900">Email Notifications</h4>
                                                                    <p className="text-sm text-secondary-600">Receive email updates</p>
                                                                </div>
                                                            </div>
                                                            <label className="relative inline-flex items-center cursor-pointer">
                                                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                                                <div className="w-11 h-6 bg-secondary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </ModernCard>

                                                <ModernCard>
                                                    <div className="p-4">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center space-x-3">
                                                                <div className="w-10 h-10 bg-info-100 rounded-lg flex items-center justify-center">
                                                                    <FaGlobe className="text-info-600" />
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-semibold text-secondary-900">Language</h4>
                                                                    <p className="text-sm text-secondary-600">English (US)</p>
                                                                </div>
                                                            </div>
                                                            <select className="px-3 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                                                                <option>English (US)</option>
                                                                <option>Spanish</option>
                                                                <option>French</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </ModernCard>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ModernCard>
                        </div>
                    </div>
                </div>
            </div>

            {/* Password Change Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-secondary-900">Change Password</h3>
                            <button
                                onClick={() => setShowPasswordModal(false)}
                                className="text-secondary-400 hover:text-secondary-600"
                            >
                                <FaTimes className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={passwordFormik.handleSubmit} className="space-y-4">
                            <FormField
                                label="Current Password"
                                name="currentPassword"
                                type="password"
                                placeholder="Enter current password"
                                icon={FaKey}
                                formik={passwordFormik}
                                required
                            />

                            <FormField
                                label="New Password"
                                name="newPassword"
                                type="password"
                                placeholder="Enter new password"
                                icon={FaKey}
                                formik={passwordFormik}
                                required
                            />

                            <FormField
                                label="Confirm New Password"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm new password"
                                icon={FaKey}
                                formik={passwordFormik}
                                required
                            />

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordModal(false)}
                                    className="btn btn-outline"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={passwordFormik.isSubmitting}
                                    className="btn btn-primary"
                                >
                                    {passwordFormik.isSubmitting ? 'Changing...' : 'Change Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
