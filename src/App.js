import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

const works = [
    {
      title: "Lost in Dreams",
      director: "dir. Michael Chen",
      prodCo: "prod co. Dreamscape Films",
      image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
      video: "https://example.com/video1.mp4",
      category: "narrative",
    },
    {
      title: "Nike - Just Do It",
      director: "dir. Sarah Williams",
      prodCo: "prod co. Vision Media",
      image: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?w=800&h=600&fit=crop",
      video: "https://example.com/video2.mp4",
      category: "commercial",
    },
    {
      title: "Echoes of Silence",
      director: "dir. James Rodriguez",
      prodCo: "prod co. Arthaus Productions",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=600&fit=crop",
      video: "https://example.com/video3.mp4",
      category: "music video",
    },
    {
      title: "Urban Rhythms",
      director: "dir. Emma Thompson",
      prodCo: "prod co. City Light Studios",
      image: "https://images.unsplash.com/photo-1544365558-35aa4afcf11f?w=800&h=600&fit=crop",
      video: "https://example.com/video4.mp4",
      category: "on set",
    },
    {
      title: "Mercedes-Benz EQS",
      director: "dir. David Miller",
      prodCo: "prod co. Luxury Visuals",
      image: "https://images.unsplash.com/photo-1506719040632-7d586470c936?w=800&h=600&fit=crop",
      video: "https://example.com/video5.mp4",
      category: "commercial",
    },
    {
      title: "Neon Dreams",
      director: "dir. Alex Wong",
      prodCo: "prod co. Night Owl Films",
      image: "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=800&h=600&fit=crop",
      video: "https://example.com/video6.mp4",
      category: "music video",
    }
];

function Layout({ children }) {
  const [activeFilter, setActiveFilter] = useState('selected work');

  const categories = [
    'SELECTED WORK',
    'NARRATIVE',
    'COMMERCIAL',
    'MUSIC VIDEO',
    'ON SET',
    'CONTACT'
  ];

  return (
    <div className="bg-white min-h-screen">
      <nav className="fixed left-0 top-0 w-64 h-full p-8 z-50">
        <div className="mb-16">
          <h1 className="text-xl font-light tracking-wide mb-1">AUSTIN MORARA</h1>
          <p className="text-sm text-gray-500 tracking-wider">CINEMATOGRAPHER</p>
        </div>

        <div className="space-y-5">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/${category.toLowerCase().replace(/ /g, '-')}`}
              className={`block text-sm tracking-wide ${
                activeFilter === category.toLowerCase()
                  ? 'text-black'
                  : 'text-gray-400'
              } hover:text-black transition-colors duration-300`}
              onClick={() => setActiveFilter(category.toLowerCase())}
            >
              {category}
            </Link>
          ))}
        </div>
      </nav>

      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}

function WorksGrid() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const location = useLocation();

  // Filter works based on current route
  const currentCategory = location.pathname.slice(1).replace(/-/g, ' ') || 'selected work';
  const filteredWorks = currentCategory === 'selected work'
    ? works
    : works.filter(work => work.category === currentCategory);

  const handleVideoClick = (index) => {
    setActiveVideo(activeVideo === index ? null : index);
  };

  return (
    <AnimatePresence>
      <motion.div className="grid grid-cols-3 gap-[2px] relative">
        {activeVideo !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="col-span-3 aspect-video bg-black relative"
          >
            <div className="relative w-full h-full">
              <motion.button
                onClick={() => setActiveVideo(null)}
                className="absolute top-8 left-8 text-white flex items-center group z-10"
                whileHover={{ x: -5 }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  className="w-6 h-6 mr-2 transform transition-transform group-hover:-translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="text-sm tracking-wider">BACK TO GALLERY</span>
              </motion.button>

              <div className="absolute top-8 right-8 text-white text-right z-10">
                <h3 className="text-lg font-light tracking-wider mb-1">
                  {filteredWorks[activeVideo].title}
                </h3>
                <p className="text-sm tracking-wider opacity-75">
                  {filteredWorks[activeVideo].director}
                </p>
              </div>

              <video
                autoPlay
                controls
                className="w-full h-full object-contain"
                src={filteredWorks[activeVideo].video}
              />
            </div>
          </motion.div>
        ) : (
          filteredWorks.map((work, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="aspect-[4/3] overflow-hidden cursor-pointer relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleVideoClick(index)}
            >
              <motion.div
                className="w-full h-full"
                initial={{ scale: 1 }}
                animate={{
                  scale: hoveredIndex === index ? 1.03 : 1,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1.0]
                }}
              >
                <img
                  src={work.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-lg font-light tracking-wider">{work.title}</p>
                <p className="text-sm tracking-wider mt-2">{work.director}</p>
                <p className="text-sm tracking-wider opacity-75">{work.prodCo}</p>
              </motion.div>
            </motion.div>
          ))
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function Contact() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-md">
        <h2 className="text-xl mb-4">Contact</h2>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<WorksGrid />} />
          <Route path="/selected-work" element={<WorksGrid />} />
          <Route path="/narrative" element={<WorksGrid />} />
          <Route path="/commercial" element={<WorksGrid />} />
          <Route path="/music-video" element={<WorksGrid />} />
          <Route path="/on-set" element={<WorksGrid />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
