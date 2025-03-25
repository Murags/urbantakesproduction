import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTimes } from 'react-icons/fa';
import { photos, photoCategories } from '../data/photosData';

function Photos() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const navigate = useNavigate();

  // Get all photos with optimized Cloudinary URLs
  const allPhotos = photos.map(photo => {
    // Optimize Cloudinary URL for better performance
    const optimizedUrl = photo.url.replace('upload/', 'upload/w_800,f_auto,q_auto/')
    // Create a low-quality placeholder
    const placeholderUrl = photo.url.replace('upload/', 'upload/w_50,e_blur:100,f_auto,q_auto/')

    return {
      ...photo,
      url: optimizedUrl,
      placeholderUrl
    };
  });

  // Filter photos based on active category
  const filteredPhotos = activeCategory === 'All'
    ? allPhotos
    : allPhotos.filter(photo => photo.category === activeCategory);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      setLoading(true);
      const imagePromises = filteredPhotos.map(photo => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = photo.url;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setLoading(false);
      } catch (error) {
        console.error('Error preloading images:', error);
        setLoading(false);
      }
    };

    preloadImages();
  }, [activeCategory]);

  const PhotoModal = ({ photo, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
      onClick={onClose}
    >
      <motion.button
        className="absolute top-4 right-4 text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        onClick={onClose}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
      >
        <FaTimes className="w-6 h-6" />
      </motion.button>

      <motion.div
        className="relative max-w-7xl w-full max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <img
          src={photo.url}
          alt={photo.title}
          className="max-h-[80vh] w-auto object-contain rounded-lg"
        />
        <div className="mt-4 text-center">
          <h3 className="text-xl font-medium text-white">{photo.title}</h3>
          <p className="text-sm text-white/70 mt-1">{photo.category}</p>
          {photo.client && (
            <p className="text-sm text-white/50 mt-1">Client: {photo.client}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Category Navigation with Back Button */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Categories */}
            <div className="flex-1 flex items-center gap-4 overflow-x-auto no-scrollbar">
              {photoCategories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-300
                    ${activeCategory === category
                      ? 'bg-[#c70f0f] text-white'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Back Button */}
            <motion.button
              onClick={() => navigate(-1)}
              className="ml-4 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-white hover:bg-white/20 transition-colors"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: 5 }}
            >
              <span className="font-space-grotesk text-sm">Back</span>
              <FaArrowLeft className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Photos Grid */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={`${photo.url}-${index}`}
              className="aspect-square relative group cursor-pointer overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedPhoto(photo)}
            >
              {/* Progressive Image Loading */}
              <div className="relative w-full h-full">
                {/* Blurred placeholder */}
                <img
                  src={photo.placeholderUrl}
                  alt={photo.title}
                  className="absolute inset-0 w-full h-full object-cover blur-sm"
                  style={{ opacity: loading ? 1 : 0 }}
                />
                {/* Main image with zoom effect */}
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500 transform group-hover:scale-110"
                  style={{ opacity: loading ? 0 : 1 }}
                  loading="lazy"
                />
              </div>
              {/* Overlay with improved transition */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <div className="text-center transform transition-transform duration-300 group-hover:scale-105">
                  <p className="text-sm font-medium">{photo.title}</p>
                  <p className="text-xs text-white/70">{photo.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <PhotoModal
            photo={selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Photos;
