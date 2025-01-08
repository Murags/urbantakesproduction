import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FaArrowRight, FaPlay } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { projects, categories } from '../data/projects';

function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Add scroll state for navbar
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // Add scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();

    setMousePosition({
      x: clientX - left - currentTarget.offsetWidth / 2,
      y: clientY - top - currentTarget.offsetHeight / 2
    });
  };

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigate = useNavigate();

  return (
    <motion.div ref={containerRef} className="relative bg-black min-h-screen overflow-x-hidden">
      {/* Fixed Navigation Bar with dynamic background */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-12 py-4 transition-all duration-300 ${
          isScrolled ? 'backdrop-blur-sm bg-black/50 border-b border-white/5' : 'bg-transparent'
        }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6 sm:gap-12">
            <motion.img
              src="/logo.png"
              alt="Urban Takes Production"
              className="h-16 sm:h-20 md:h-24 w-16 sm:w-20 md:w-24 rounded-full object-cover -my-4"
              whileHover={{ scale: 1.05 }}
            />
            <div className="hidden lg:flex items-center gap-8">
              {[
                { name: 'Work', section: 'work' },
                { name: 'Services', section: 'services' },
                { name: 'About', section: 'about' },
                { name: 'Contact', section: 'contact' }
              ].map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.section)}
                  className="text-sm font-space-grotesk text-white/60 hover:text-white transition-colors cursor-pointer"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </div>
          <motion.button
            className="px-4 py-2 md:px-6 md:py-3 rounded-full border border-white/10 text-sm font-space-grotesk tracking-wider hover:bg-white/5 transition-colors text-white"
            whileHover={{ scale: 1.02 }}
          >
            Menu
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section with adjusted spacing */}
      <div id="home" className="relative min-h-screen">
        <div className="pt-16"> {/* Reduced from pt-24 to pt-16 */}
          {/* Animated Background Grid */}
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 grid grid-cols-6 gap-px opacity-[0.08]">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-white h-full"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                />
              ))}
            </div>
          </div>

          {/* Gradient Background - Keeping it the same */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-0 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.15, scale: 1 }}
              transition={{ duration: 2 }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#c70f0f] to-yellow-500 blur-[120px]" />
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="relative h-screen flex flex-col justify-center items-center px-4">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-0 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ duration: 2 }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#c70f0f] to-yellow-500 blur-[120px]" />
              </motion.div>
            </div>

              {/* Side Social Links */}
              <motion.div
                className="fixed left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                {['Vimeo', 'Instagram', 'LinkedIn'].map((social, index) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="text-sm font-space-grotesk text-white/40 hover:text-white transition-colors"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                  >
                    {social}
                  </motion.a>
                ))}
              </motion.div>

              {/* Main Title Section */}
              <motion.div
                className="relative max-w-7xl mx-auto text-center"
                style={{ y, opacity }}
              >
                {/* Small Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-6"
                >
                  <span className="font-space-grotesk text-white/60 tracking-[0.3em] uppercase text-xs sm:text-sm">
                    UrbanTakesProduction
                  </span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                  className="font-syncopate text-4xl sm:text-7xl md:text-8xl lg:text-[150px] font-bold leading-none tracking-tighter mb-8"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <motion.span
                    className="text-[#c70f0f] inline-block"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    CINEMATIC
                  </motion.span>
                  <br />
                  <motion.span
                    className="text-white inline-block"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    STORIES
                  </motion.span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  className="font-syne text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 max-w-2xl mx-auto mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  We craft compelling visual narratives that captivate audiences and leave lasting impressions.
                </motion.p>

                {/* CTA Section with adjusted spacing */}
                <motion.div
                  className="flex items-center justify-center gap-8 mb-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {/* Primary CTA */}
                  <motion.button
                    className="group relative px-8 py-4 overflow-hidden"
                    onMouseMove={handleMouseMove}
                    whileHover={{ scale: 1.05 }}
                    animate={{
                      x: mousePosition.x * 0.1,
                      y: mousePosition.y * 0.1
                    }}
                  >
                    <div className="absolute inset-0 bg-[#c70f0f] rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center gap-3">
                      <span className="font-space-grotesk text-lg tracking-wide">View Our Work</span>
                      <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.button>

                  {/* Secondary CTA */}
                  <motion.button
                    className="font-space-grotesk text-lg text-white/60 hover:text-white transition-colors flex items-center gap-3"
                    whileHover={{ x: 5 }}
                  >
                  </motion.button>
                </motion.div>
              </motion.div>

            {/* Scroll Indicator with enhanced animation */}
            <motion.div
              className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span className="font-space-grotesk text-white/40 text-sm tracking-widest">
                SCROLL
              </span>
              <motion.div
                className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-[#c70f0f] to-white/0"
                animate={{
                  scaleY: [0.3, 1, 0.3],
                  opacity: [0, 1, 0],
                  y: [0, 10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      <section id="work" className="relative min-h-screen bg-black/90 py-24">
        {/* Background Elements - Lower z-index */}
        <motion.div
          className="absolute inset-0 opacity-20 z-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-[#c70f0f]/20 blur-[120px]" />
          <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-yellow-500/20 blur-[120px]" />
        </motion.div>

        {/* Section Content - Higher z-index */}
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="font-space-grotesk text-[#c70f0f] text-sm tracking-[0.3em] uppercase">
                Our Latest Work
              </span>
            </motion.div>
            <motion.h2
              className="font-syncopate text-4xl md:text-6xl font-bold mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              FEATURED PROJECTS
            </motion.h2>

            {/* Category Filters - Ensure it's clickable */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12 relative z-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full border text-sm font-space-grotesk tracking-wider transition-all duration-300 relative z-20
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
          </div>

          {/* Projects Grid - Lower z-index than filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative aspect-[16/9] overflow-hidden rounded-lg cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
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
                        e.stopPropagation(); // Prevent triggering parent onClick
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

          {/* View All Projects CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              className="group relative inline-flex items-center gap-3 px-8 py-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-[#c70f0f] rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative font-space-grotesk text-lg tracking-wide">
                View All Projects
              </span>
              <FaArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative min-h-screen bg-black py-24">
        {/* Enhanced Background Elements */}
        <motion.div className="absolute inset-0">
          <div className="absolute left-0 top-0 w-1/2 h-1/2 bg-[#c70f0f]/20 blur-[120px] rotate-12 opacity-40" />
          <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-yellow-500/20 blur-[120px] -rotate-12 opacity-40" />
          <div className="absolute inset-0 bg-black/40" /> {/* Overlay for depth */}
        </motion.div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Section Header with enhanced animation */}
          <div className="text-center mb-20">
            <motion.span
              className="font-space-grotesk text-[#c70f0f] text-sm tracking-[0.3em] uppercase block mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              What We Do
            </motion.span>
            <motion.h2
              className="font-syncopate text-4xl md:text-6xl font-bold mb-8 relative inline-block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-white via-white to-white/50 text-transparent bg-clip-text">
                OUR SERVICES
              </span>
            </motion.h2>
          </div>

          {/* Enhanced Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Commercial Production",
                description: "Compelling brand stories that resonate with your audience",
                icon: "🎬",
                gradient: "from-[#c70f0f]/20 to-transparent"
              },
              {
                title: "Corporate Films",
                description: "Professional company narratives and promotional content",
                icon: "🏢",
                gradient: "from-yellow-500/20 to-transparent"
              },
              {
                title: "Music Videos",
                description: "Creative visual storytelling for artists and bands",
                icon: "🎵",
                gradient: "from-[#c70f0f]/20 to-transparent"
              },
              {
                title: "Documentary",
                description: "In-depth storytelling that captures real-life moments",
                icon: "📽",
                gradient: "from-yellow-500/20 to-transparent"
              },
              {
                title: "Event Coverage",
                description: "Dynamic capture of live events and experiences",
                icon: "🎥",
                gradient: "from-[#c70f0f]/20 to-transparent"
              },
              {
                title: "Post Production",
                description: "Expert editing, color grading, and visual effects",
                icon: "✨",
                gradient: "from-yellow-500/20 to-transparent"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                className="group relative p-8 rounded-lg backdrop-blur-sm border border-white/10 hover:border-[#c70f0f]/50 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg`} />
                <div className="relative z-10">
                  <motion.span
                    className="text-4xl mb-6 block"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {service.icon}
                  </motion.span>
                  <h3 className="font-syncopate text-xl font-bold mb-4 bg-gradient-to-r from-white to-white/90 text-transparent bg-clip-text">
                    {service.title}
                  </h3>
                  <p className="font-space-grotesk text-white/60 group-hover:text-white/80 transition-colors">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Clients Section */}
      <section className="relative py-24 bg-black/90">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
          <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            <motion.span
              className="font-space-grotesk text-[#c70f0f] text-sm tracking-[0.3em] uppercase block mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Clients
            </motion.span>
            <motion.h2
              className="font-syncopate text-4xl md:text-6xl font-bold relative inline-block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-white via-white to-white/50 text-transparent bg-clip-text">
                TRUSTED BY
              </span>
            </motion.h2>
          </div>

          {/* Enhanced Clients Logo Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <motion.div
                key={index}
                className="group relative flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#c70f0f]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg blur-xl" />
                <motion.div
                  className="w-32 h-12 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 relative overflow-hidden group-hover:border-[#c70f0f]/50 transition-all duration-500"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Placeholder for client logos */}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative min-h-screen bg-black py-24">
        {/* Background Elements */}
        <motion.div className="absolute inset-0">
          <div className="absolute left-0 top-0 w-1/2 h-1/2 bg-[#c70f0f]/20 blur-[120px] rotate-12 opacity-40" />
          <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-yellow-500/20 blur-[120px] -rotate-12 opacity-40" />
          <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:24px_24px]" />
        </motion.div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.span
              className="font-space-grotesk text-[#c70f0f] text-sm tracking-[0.3em] uppercase block mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Get In Touch
            </motion.span>
            <motion.h2
              className="font-syncopate text-4xl md:text-6xl font-bold relative inline-block mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-white via-white to-white/50 text-transparent bg-clip-text">
                LET'S CREATE TOGETHER
              </span>
            </motion.h2>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contact Form */}
            <motion.div
              className="backdrop-blur-sm border border-white/10 rounded-lg p-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-space-grotesk text-white/60">Name</label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c70f0f] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-space-grotesk text-white/60">Email</label>
                  <input
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c70f0f] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-space-grotesk text-white/60">Message</label>
                  <textarea
                    rows={6}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#c70f0f] transition-colors"
                  />
                </div>
                <motion.button
                  className="w-full bg-[#c70f0f] text-white rounded-lg px-6 py-3 font-space-grotesk hover:bg-[#c70f0f]/90 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {[
                {
                  title: "Location",
                  info: "Nairobi, Kenya",
                  icon: "📍"
                },
                {
                  title: "Email",
                  info: "urbantakesproductions@gmail.com",
                  icon: "✉️"
                },
                {
                  title: "Phone",
                  info: "+254 712 677 131",
                  icon: "📞"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-6 p-6 rounded-lg border border-white/10 backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="font-syncopate text-lg font-bold mb-2">{item.title}</h3>
                    <p className="font-space-grotesk text-white/60">{item.info}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black/95 border-t border-white/10">
        {/* Quote Section - Added before the main footer content */}
        <div className="container mx-auto px-6 md:px-12 py-20 border-b border-white/10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-space-grotesk text-xl md:text-2xl lg:text-3xl text-white/80 italic mb-4">
              "If light was music then Cinematography is a dance"
            </p>
            <span className="font-syncopate text-sm tracking-wider text-[#c70f0f]">
              ~ AUSTIN MORARA ~
            </span>
          </motion.div>
        </div>

        {/* Rest of the footer content */}
        <div className="container mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="space-y-6">
              <img src="/logo.png" alt="Urban Takes Production" className="h-12 w-12 rounded-full" />
              <p className="font-space-grotesk text-white/60 max-w-xs">
                Crafting compelling visual narratives that captivate audiences and leave lasting impressions.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-syncopate text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 font-space-grotesk">
                {[
                  { name: 'Work', section: 'work' },
                  { name: 'Services', section: 'services' },
                  { name: 'About', section: 'about' },
                  { name: 'Contact', section: 'contact' }
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                  >
                    <button
                      onClick={() => scrollToSection(item.section)}
                      className="text-white/60 hover:text-white transition-colors cursor-pointer"
                    >
                      {item.name}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h4 className="font-syncopate text-lg font-bold mb-6">Services</h4>
              <ul className="space-y-4 font-space-grotesk">
                {[
                  { name: 'Commercial', section: 'services' },
                  { name: 'Corporate', section: 'services' },
                  { name: 'Music Videos', section: 'services' },
                  { name: 'Documentary', section: 'services' }
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                  >
                    <button
                      onClick={() => scrollToSection(item.section)}
                      className="text-white/60 hover:text-white transition-colors cursor-pointer"
                    >
                      {item.name}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-syncopate text-lg font-bold mb-6">Follow Us</h4>
              <div className="flex gap-4">
                {['Instagram', 'Twitter', 'LinkedIn', 'Vimeo'].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#c70f0f] transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    {social[0]}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-space-grotesk text-white/40 text-sm">
              © 2024 Urban Takes Production. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-space-grotesk text-white/40 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-space-grotesk text-white/40 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

    </motion.div>
  );
}

export default LandingPage;
