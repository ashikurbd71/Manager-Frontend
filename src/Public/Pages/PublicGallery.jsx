import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
    FaArrowLeft,
    FaArrowRight,
    FaTimes,
    FaImages,
    FaCalendarAlt,
    FaDownload,
    FaShare,
    FaHeart
} from 'react-icons/fa';
import { BiPhotoAlbum } from 'react-icons/bi';
import axoissecure from '../../Hooks/Axoisscure';
import { useQuery } from '@tanstack/react-query';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ModernCard, ModernAlert } from '../../Share/ModernComponents';

const PublicGallery = () => {
    const { data: items = [], refetch, isLoading } = useQuery({
        queryKey: ["publicGallery"],
        queryFn: async () => {
            try {
                const res = await axoissecure.get(`/image`);
                return res.data;
            } catch (error) {
                console.error("Error fetching gallery data:", error);
                throw error;
            }
        },
    });

    const [selectedImage, setSelectedImage] = useState({ img: "", i: 0 });

    const viewImage = (img, i) => {
        setSelectedImage({ profile: img.profile, i });
    };

    const imgAction = (action) => {
        let newIndex = selectedImage.i;

        if (action === "next-img" && selectedImage.i < items.length - 1) {
            newIndex++;
        } else if (action === "prev-img" && selectedImage.i > 0) {
            newIndex--;
        }

        setSelectedImage({ profile: items[newIndex]?.profile, i: newIndex });
    };

    const closePreview = () => {
        setSelectedImage({ img: "", i: 0 });
    };

    const handleDownload = (imageUrl) => {
        const link = document.createElement('a');
        link.href = `${import.meta.env.VITE_API_URL}/${imageUrl}`;
        link.download = 'gallery-image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleShare = (image) => {
        if (navigator.share) {
            navigator.share({
                title: image.title || 'Gallery Image',
                text: 'Check out this image from our gallery!',
                url: `${import.meta.env.VITE_API_URL}/${image.profile}`
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(`${import.meta.env.VITE_API_URL}/${image.profile}`);
            // You could show a toast notification here
        }
    };

    return (
        <>
            <Helmet><title>Manager || Public || Gallery</title></Helmet>

            {/* Image Preview Modal */}
            {selectedImage.profile && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
                    <div className="relative max-w-7xl max-h-full">
                        {/* Close Button */}
                        <button
                            onClick={closePreview}
                            className="absolute -top-12 right-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
                        >
                            <FaTimes className="w-5 h-5" />
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            onClick={() => imgAction("prev-img")}
                            disabled={selectedImage.i === 0}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaArrowLeft className="w-5 h-5" />
                        </button>

                        <button
                            onClick={() => imgAction("next-img")}
                            disabled={selectedImage.i === items.length - 1}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaArrowRight className="w-5 h-5" />
                        </button>

                        {/* Image */}
                        <img
                            src={`${import.meta.env.VITE_API_URL}/${selectedImage.profile}`}
                            alt="Gallery Preview"
                            className="max-w-full max-h-[80vh] object-contain rounded-lg"
                        />

                        {/* Image Info */}
                        <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-lg">
                                        {items[selectedImage.i]?.title || 'Untitled'}
                                    </h3>
                                    <p className="text-sm opacity-80">
                                        {items[selectedImage.i]?.date?.split('T')[0]}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleDownload(items[selectedImage.i]?.profile)}
                                        className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                                        title="Download"
                                    >
                                        <FaDownload className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleShare(items[selectedImage.i])}
                                        className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                                        title="Share"
                                    >
                                        <FaShare className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                                    <BiPhotoAlbum className="text-white text-lg" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-secondary-900">Photo Gallery</h1>
                                    <p className="text-secondary-600">Explore our collection of memories and moments</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => refetch()}
                                    className="btn btn-outline"
                                    title="Refresh Gallery"
                                >
                                    <FaImages className="mr-2" />
                                    Refresh
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <ModernCard className="text-center">
                            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <FaImages className="text-2xl text-primary-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-primary-900 mb-1">
                                {items?.length || 0}
                            </h3>
                            <p className="text-sm text-primary-600">Total Photos</p>
                        </ModernCard>

                        <ModernCard className="text-center">
                            <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <FaCalendarAlt className="text-2xl text-success-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-success-900 mb-1">
                                {items?.length > 0 ? new Date(items[0]?.date).getFullYear() : 'N/A'}
                            </h3>
                            <p className="text-sm text-success-600">Latest Year</p>
                        </ModernCard>

                        <ModernCard className="text-center">
                            <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <FaHeart className="text-2xl text-warning-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-warning-900 mb-1">
                                {items?.length || 0}
                            </h3>
                            <p className="text-sm text-warning-600">Memories</p>
                        </ModernCard>
                    </div>

                    {/* Gallery Grid */}
                    {isLoading ? (
                        <ModernCard className="text-center py-12">
                            <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-secondary-600">Loading gallery...</p>
                        </ModernCard>
                    ) : items?.length === 0 ? (
                        <ModernCard className="text-center py-12">
                            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaImages className="text-3xl text-secondary-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-secondary-900 mb-2">No Photos Yet</h3>
                            <p className="text-secondary-600">Check back later for new photos!</p>
                        </ModernCard>
                    ) : (
                        <div className="space-y-6">
                            <ResponsiveMasonry
                                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}
                            >
                                <Masonry gutter="20px">
                                    {items.map((image, i) => (
                                        <ModernCard
                                            key={i}
                                            className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
                                            onClick={() => viewImage(image, i)}
                                        >
                                            {/* Image */}
                                            <div className="relative overflow-hidden">
                                                <img
                                                    src={`${import.meta.env.VITE_API_URL}/${image?.profile}`}
                                                    alt={image?.title || 'Gallery Image'}
                                                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
                                                />

                                                {/* Overlay */}
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDownload(image?.profile);
                                                            }}
                                                            className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                                                            title="Download"
                                                        >
                                                            <FaDownload className="w-4 h-4 text-secondary-700" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleShare(image);
                                                            }}
                                                            className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                                                            title="Share"
                                                        >
                                                            <FaShare className="w-4 h-4 text-secondary-700" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Image Info */}
                                            <div className="p-4">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <FaCalendarAlt className="w-4 h-4 text-secondary-400" />
                                                    <span className="text-sm text-secondary-500 font-medium">
                                                        {image?.date?.split('T')[0]}
                                                    </span>
                                                </div>
                                                <h3 className="font-semibold text-secondary-900 truncate">
                                                    {image?.title || 'Untitled'}
                                                </h3>
                                            </div>
                                        </ModernCard>
                                    ))}
                                </Masonry>
                            </ResponsiveMasonry>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default PublicGallery;
