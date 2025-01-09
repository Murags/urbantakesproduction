import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { projects, categories } from '../data/projects';

function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const projectsPerPage = 6;

  // Filter and paginate projects
  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Reset to first page when category changes
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        {/* Back Button */}
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

        {/* Background Elements */}
        <motion.div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
          <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:24px_24px]" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <motion.span
            className="font-space-grotesk text-[#c70f0f] text-sm tracking-[0.3em] uppercase block mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Portfolio
          </motion.span>
          <motion.h1
            className="font-syncopate text-4xl md:text-6xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            ALL PROJECTS
          </motion.h1>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          {/* Category Filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-2 rounded-full border text-sm font-space-grotesk tracking-wider transition-all duration-300
                  ${activeCategory === category
                    ? 'border-[#c70f0f] bg-[#c70f0f]/20 text-white'
                    : 'border-white/10 text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                whileHover={{ scale: 1.05 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid - Updated to match landing page design */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative aspect-[16/9] overflow-hidden rounded-lg cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                onClick={() => navigate(`/project/${project.id}`)}
              >
                {/* Project Image with Overlay */}
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Project Content */}
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end transform transition-transform duration-300 group-hover:translate-y-0">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="inline-block px-3 py-1 bg-[#c70f0f] rounded-full text-xs font-space-grotesk tracking-wider text-white mb-3">
                        {project.category}
                      </span>
                      <h3 className="font-syncopate text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-white drop-shadow-lg">
                        {project.title}
                      </h3>
                      <span className="text-white/80 text-xs sm:text-sm font-space-grotesk">
                        {project.client}
                      </span>
                    </div>
                    <motion.button
                      className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full font-space-grotesk text-sm text-white group/btn"
                      whileHover={{ x: 5 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/project/${project.id}`);
                      }}
                    >
                      View
                      <FaArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>
                {/* Year Label */}
                <div className="absolute top-6 right-6 z-20 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="font-space-grotesk text-sm text-white">
                    {project.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              className="flex justify-center items-center gap-4 mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                className={`p-2 rounded-full ${currentPage === 1 ? 'text-white/20' : 'text-white hover:text-[#c70f0f]'}`}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                whileHover={currentPage !== 1 ? { scale: 1.1 } : {}}
              >
                <FaArrowLeft className="w-5 h-5" />
              </motion.button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <motion.button
                    key={i}
                    className={`w-10 h-10 rounded-full font-space-grotesk text-sm
                      ${currentPage === i + 1
                        ? 'bg-[#c70f0f] text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    onClick={() => setCurrentPage(i + 1)}
                    whileHover={{ scale: 1.1 }}
                  >
                    {i + 1}
                  </motion.button>
                ))}
              </div>

              <motion.button
                className={`p-2 rounded-full ${currentPage === totalPages ? 'text-white/20' : 'text-white hover:text-[#c70f0f]'}`}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                whileHover={currentPage !== totalPages ? { scale: 1.1 } : {}}
              >
                <FaArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Projects;
