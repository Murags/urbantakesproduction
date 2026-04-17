import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaPlay, FaTimes } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { showcaseSections } from '../data/showcaseSections';

const getYouTubeId = (url = '') => {
  if (url.includes('/shorts/')) {
    return url.split('/shorts/')[1].split('?')[0];
  }

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const getEmbedUrl = (url = '') => {
  const videoId = getYouTubeId(url);

  if (!videoId) {
    return '';
  }

  return `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&playsinline=1`;
};

const getCardLayout = (count) => {
  if (count === 1) {
    return 'grid-cols-1 max-w-sm mx-auto';
  }

  if (count <= 4) {
    return 'grid-cols-1 sm:grid-cols-2 max-w-5xl mx-auto';
  }

  return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
};

function SectionShowcasePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const currentSection = showcaseSections.find((section) => section.slug === slug);

  if (!currentSection) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-syncopate text-3xl mb-4">Section not found</h1>
          <button
            onClick={() => navigate('/')}
            className="font-space-grotesk text-[#c70f0f] hover:text-white transition-colors"
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-[760px] h-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#c70f0f]/20 to-yellow-500/15 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff33_1px,transparent_1px),linear-gradient(to_bottom,#ffffff33_1px,transparent_1px)] bg-[size:28px_28px]" />
      </div>

      <motion.button
        onClick={() => navigate('/')}
        className="fixed top-8 left-6 md:left-8 z-50 flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <FaArrowLeft />
        <span className="font-space-grotesk">Back</span>
      </motion.button>

      <section className="relative z-10 pt-28 pb-10">
        <div className="container mx-auto px-6 md:px-12">
          <motion.span
            className="font-space-grotesk text-[#c70f0f] text-sm tracking-[0.3em] uppercase block mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {currentSection.eyebrow}
          </motion.span>
          <motion.h1
            className="font-syncopate text-4xl md:text-6xl lg:text-7xl font-bold max-w-4xl mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {currentSection.label}
          </motion.h1>
          <motion.p
            className="font-space-grotesk text-white/65 text-base md:text-lg max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {currentSection.description}
          </motion.p>
        </div>
      </section>

      <div className="sticky top-0 z-30 border-y border-white/10 bg-black/75 backdrop-blur-md">
        <div className="container mx-auto px-6 md:px-12 py-4">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/')}
              className="px-5 py-2 rounded-full border border-[#c70f0f] bg-[#c70f0f]/20 text-sm font-space-grotesk tracking-wide text-white"
            >
              All
            </button>
            {showcaseSections.map((section) => (
              <button
                key={section.slug}
                onClick={() => navigate(`/work/${section.slug}`)}
                className={`px-5 py-2 rounded-full border text-sm font-space-grotesk tracking-wide transition-all duration-300 ${
                  section.slug === currentSection.slug
                    ? 'border-white/20 bg-white/10 text-white'
                    : 'border-white/10 text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {section.label}
              </button>
            ))}
            <button
              onClick={() => navigate('/photos')}
              className="px-5 py-2 rounded-full border border-white/10 text-sm font-space-grotesk tracking-wide text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              Photography
            </button>
          </div>
        </div>
      </div>

      <section className="relative z-10 py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className={`grid ${getCardLayout(currentSection.items.length)} gap-6 md:gap-8`}>
            {currentSection.items.map((item, index) => (
              <motion.article
                key={item.title}
                className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] ${item.videoUrl ? 'cursor-pointer' : ''}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                onClick={() => item.videoUrl && setSelectedItem(item)}
                onKeyDown={(event) => {
                  if ((event.key === 'Enter' || event.key === ' ') && item.videoUrl) {
                    event.preventDefault();
                    setSelectedItem(item);
                  }
                }}
                role={item.videoUrl ? 'button' : undefined}
                tabIndex={item.videoUrl ? 0 : undefined}
              >
                <div className={`relative overflow-hidden ${item.aspectRatio === 'short' ? 'aspect-[9/16]' : 'aspect-[4/5]'}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/5" />
                  {item.videoUrl && (
                    <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-2 text-[11px] font-space-grotesk uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
                      <FaPlay className="w-3 h-3" />
                      Play
                    </div>
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-space-grotesk uppercase tracking-[0.22em] text-white/70 backdrop-blur-sm">
                    {currentSection.shortLabel}
                  </span>
                  <h2 className="mt-4 font-syncopate text-xl md:text-2xl font-bold leading-tight text-white">
                    {item.title}
                  </h2>
                  <p className="mt-2 font-space-grotesk text-sm text-white/65">
                    {item.subtitle}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            className="mt-12 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              className="group relative inline-flex items-center gap-3 px-8 py-4"
              whileHover={{ scale: 1.03 }}
              onClick={() => navigate('/projects')}
            >
              <div className="absolute inset-0 rounded-full bg-[#c70f0f] opacity-75 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative font-space-grotesk text-lg tracking-wide">
                View All Projects
              </span>
              <FaArrowRight className="relative w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>

            <motion.button
              className="group relative inline-flex items-center gap-3 px-8 py-4"
              whileHover={{ scale: 1.03 }}
              onClick={() => navigate('/photos')}
            >
              <div className="absolute inset-0 rounded-full bg-white/10 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative font-space-grotesk text-lg tracking-wide">
                View Photography
              </span>
              <FaArrowRight className="relative w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="relative w-full max-w-5xl rounded-[32px] border border-white/10 bg-[#090909] p-4 md:p-6 shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                onClick={() => setSelectedItem(null)}
              >
                <FaTimes className="w-4 h-4" />
              </button>

              <div className="mb-5 pr-12">
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-space-grotesk uppercase tracking-[0.22em] text-white/70 backdrop-blur-sm">
                  {currentSection.label}
                </span>
                <h2 className="mt-4 font-syncopate text-2xl md:text-3xl font-bold text-white">
                  {selectedItem.title}
                </h2>
                <p className="mt-2 font-space-grotesk text-sm md:text-base text-white/65">
                  {selectedItem.subtitle}
                </p>
              </div>

              <div className="flex justify-center">
                <div className={`w-full overflow-hidden rounded-[24px] bg-black ${selectedItem.aspectRatio === 'short' ? 'max-w-sm aspect-[9/16]' : 'max-w-4xl aspect-video'}`}>
                  <iframe
                    src={getEmbedUrl(selectedItem.videoUrl)}
                    title={selectedItem.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SectionShowcasePage;
