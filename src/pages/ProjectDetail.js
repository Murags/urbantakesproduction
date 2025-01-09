import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaArrowLeft, FaPlay } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { projects } from '../data/projects';

// Add this helper function at the top of the file to extract YouTube ID
const getYouTubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id));
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('video'); // 'video' or 'photos'

  // Add error handling for non-existent projects
  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-syncopate text-2xl mb-4">Project not found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-[#c70f0f] hover:text-white transition-colors"
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Navigation - Moved above background image and increased z-index */}
        <motion.button
          onClick={() => navigate('/')}
          className="fixed top-8 left-8 z-50 flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
        >
          <FaArrowLeft />
          <span className="font-space-grotesk">Back</span>
        </motion.button>

        {/* Background Image */}
        <div className="absolute inset-0 z-10">
          <img
            src={project.photos[0]}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </div>

        {/* Project Title - Enhanced visibility */}
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
          <motion.span
            className="font-space-grotesk text-[#c70f0f] text-sm tracking-[0.3em] uppercase block mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {project.category}
          </motion.span>
          <motion.h1
            className="font-syncopate text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {project.title}
          </motion.h1>
          <motion.div
            className="flex items-center gap-4 text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">{project.client}</span>
            <span>•</span>
            <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">{project.year}</span>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-6 md:px-12">
          {/* Tabs */}
          <div className="flex justify-center gap-8 mb-16">
            {['video', 'photos'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-space-grotesk text-lg capitalize ${
                  activeTab === tab ? 'text-white' : 'text-white/40'
                }`}
                whileHover={{ y: -2 }}
              >
                {tab}
              </motion.button>
            ))}
          </div>

          {/* Video Content */}
          {activeTab === 'video' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="aspect-video bg-black rounded-lg overflow-hidden relative"
            >
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(project.video)}?vq=hd1080&modestbranding=1&rel=0`}
                title={project.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          )}

          {/* Photos Content */}
          {activeTab === 'photos' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {project.photos.map((photo, index) => (
                <motion.div
                  key={index}
                  className="aspect-video rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <img
                    src={photo}
                    alt={`${project.title} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Project Details */}
          <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Description */}
            <div>
              <h2 className="font-syncopate text-2xl font-bold mb-6">About the Project</h2>
              <p className="font-space-grotesk text-white/60 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Technical Details */}
            <div className="space-y-8">
              <h2 className="font-syncopate text-2xl font-bold">Project Details</h2>
              <div className="grid grid-cols-2 gap-8">
                {Object.entries(project.details).map(([key, value]) => (
                  <div key={key}>
                    <h3 className="font-space-grotesk text-white/40 uppercase text-sm mb-2">
                      {key}
                    </h3>
                    <p className="font-space-grotesk text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProjectDetail;
