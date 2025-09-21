import { Bot, CalendarCheck2, Users, ArrowRight, Star, Heart, Shield, Zap, ChevronUp, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 300);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-neutral-dark font-sans">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-x-0 top-0 z-50"
      >
        <nav className="container mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex lg:flex-1"
          >
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2 group">
              <motion.img 
                src="/logo.png" 
                alt="Vritti Logo" 
                className="h-8 w-8 p-0 m-0"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <span className="text-2xl font-bold group-hover:text-primary transition-colors">Vritti</span>
            </a>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <Link 
              to="/dashboard" 
              className="group relative rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-bold text-white shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Explore Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </Link>
            <Link 
              to="/counsellor" 
              className="hidden sm:block px-4 py-2 text-sm font-medium text-neutral-dark hover:text-primary transition-colors"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Counsellor Portal
              </motion.span>
            </Link>
            <Link 
              to="/admin" 
              className="hidden sm:block px-4 py-2 text-sm font-medium text-neutral-dark hover:text-primary transition-colors"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Admin Portal
              </motion.span>
            </Link>
          </motion.div>
        </nav>
      </motion.header>
      
      {/* Hero Section */}
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative isolate pt-20 pb-16 sm:pt-32 sm:pb-24 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div 
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              rotate: [360, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              x: [0, 10, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-2xl"
          />
        </div>

        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-8"
            >
              <Star className="w-4 h-4 fill-current" />
              Trusted by 50+ Universities
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-primary rounded-full"
              />
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-dark mb-6"
            >
              Your Mental Wellness
              <br />
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient"
              >
                Companion Reimagined
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl text-neutral-medium max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Vritti provides <span className="font-semibold text-primary">confidential, AI-powered support</span> and seamless access to university counselors, designed for the unique pressures of student life.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link 
                to="/dashboard" 
                className="group relative rounded-2xl bg-gradient-to-r from-primary to-secondary px-8 py-4 text-lg font-bold text-white shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Zap className="w-5 h-5" />
                  Start Free Demo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-2 px-8 py-4 text-lg font-semibold text-neutral-dark border-2 border-neutral-300 rounded-2xl hover:border-primary hover:text-primary transition-all duration-300"
              >
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-neutral-medium"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span>10,000+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span>4.9/5 Rating</span>
              </div>
            </motion.div>
          </div>

          {/* Enhanced App Mockup */}
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20 relative"
          >
            <motion.div 
              animate={{ 
                y: [0, -15, 0],
                rotateX: [0, 2, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/30">
                {/* Mockup Header */}
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Vritti Logo" className="h-8 w-8" />
                    <span className="font-bold text-lg">Vritti</span>
                  </div>
                  <div className="flex gap-2">
                    <motion.div 
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-3 h-3 bg-green-500 rounded-full"
                    />
                    <motion.div 
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="w-3 h-3 bg-yellow-500 rounded-full"
                    />
                    <motion.div 
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      className="w-3 h-3 bg-red-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Mockup Content Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Mood Tracker */}
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
                  >
                    <h3 className="font-bold text-neutral-dark mb-4 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      Daily Check-in
                    </h3>
                    <p className="text-sm text-neutral-medium mb-4">How are you feeling today?</p>
                    <div className="flex justify-around">
                      {['😊', '🙂', '😐', '😕', '😥'].map((emoji, index) => (
                        <motion.span 
                          key={emoji}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            duration: 0.5, 
                            delay: 1.4 + index * 0.1,
                            type: "spring",
                            stiffness: 200
                          }}
                          whileHover={{ scale: 1.4, rotate: 15 }}
                          className={`text-4xl cursor-pointer transition-all duration-200 ${
                            index === 0 ? 'opacity-100' : 'opacity-40 hover:opacity-80'
                          }`}
                        >
                          {emoji}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* AI Chat */}
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
                  >
                    <h3 className="font-bold text-neutral-dark mb-4 flex items-center gap-2">
                      <Bot className="w-5 h-5 text-primary" />
                      AI Companion
                    </h3>
                    <div className="space-y-3">
                      <motion.div 
                        animate={{ width: ["0%", "85%"] }}
                        transition={{ duration: 2, delay: 1.6 }}
                        className="bg-gradient-to-r from-primary/20 to-primary/40 h-3 rounded-full"
                      />
                      <motion.div 
                        animate={{ width: ["0%", "60%"] }}
                        transition={{ duration: 2, delay: 1.8 }}
                        className="bg-gradient-to-r from-secondary/20 to-secondary/40 h-3 rounded-full"
                      />
                      <motion.div 
                        animate={{ width: ["0%", "70%"] }}
                        transition={{ duration: 2, delay: 2 }}
                        className="bg-gradient-to-r from-primary/20 to-primary/40 h-3 rounded-full"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Quick Actions */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  className="mt-6 flex justify-center gap-4"
                >
                  {[
                    { icon: CalendarCheck2, label: "Book Session", color: "bg-green-500" },
                    { icon: Users, label: "Peer Support", color: "bg-blue-500" },
                    { icon: Shield, label: "Resources", color: "bg-purple-500" }
                  ].map((action, index) => (
                    <motion.button
                      key={action.label}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 1.8 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={`${action.color} text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      <action.icon className="w-5 h-5" />
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.main>

      {/* Features Section */}
      <motion.section 
        id="features" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="py-24 sm:py-32 bg-neutral-light"
      >
          <div className="container mx-auto px-6 lg:px-8">
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                  <h2 className="text-4xl font-bold tracking-tight text-neutral-dark sm:text-5xl">
                    A Proactive Approach to <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Student Wellness</span>
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-neutral-medium max-w-3xl mx-auto">
                      Vritti isn't just a tool; it's a complete ecosystem designed to provide support before challenges become overwhelming.
                  </p>
              </motion.div>
              <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                      { 
                        icon: Bot, 
                        title: "AI First-Aid", 
                        description: "Get immediate, evidence-based coping strategies from our AI companion, trained on CBT principles.",
                        color: "from-blue-500 to-cyan-500"
                      },
                      { 
                        icon: CalendarCheck2, 
                        title: "Confidential Booking", 
                        description: "Seamlessly and privately schedule appointments with on-campus counselors in just a few taps.",
                        color: "from-green-500 to-emerald-500"
                      },
                      { 
                        icon: Users, 
                        title: "Peer Support Network", 
                        description: "Connect with trained student volunteers in a safe, moderated environment to share experiences.",
                        color: "from-purple-500 to-pink-500"
                      },
                  ].map((feature, index) => (
                      <motion.div 
                        key={feature.title}
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        whileHover={{ 
                          y: -10,
                          scale: 1.02,
                          transition: { duration: 0.2 }
                        }}
                        className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                      >
                          <motion.div 
                            whileHover={{ rotate: 5, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${feature.color} text-white rounded-2xl flex items-center justify-center shadow-lg`}
                          >
                              <feature.icon className="w-8 h-8" />
                          </motion.div>
                          <h3 className="mt-6 text-2xl font-semibold text-neutral-dark group-hover:text-primary transition-colors">
                            {feature.title}
                          </h3>
                          <p className="mt-4 text-neutral-medium leading-relaxed">
                            {feature.description}
                          </p>
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                            className="mt-6 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                          />
                      </motion.div>
                  ))}
              </div>
          </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="py-24 sm:py-32 bg-white"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold tracking-tight text-neutral-dark sm:text-5xl mb-6">
              How <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Vritti Works</span>
            </h2>
            <p className="text-lg leading-8 text-neutral-medium max-w-3xl mx-auto">
              Get started in minutes with our simple, secure, and effective mental wellness platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Sign Up & Assessment",
                description: "Create your account and complete a brief, confidential wellness assessment to personalize your experience.",
                icon: Shield,
                color: "from-blue-500 to-cyan-500"
              },
              {
                step: "02", 
                title: "AI-Powered Support",
                description: "Access 24/7 AI companion for immediate support, coping strategies, and mood tracking.",
                icon: Bot,
                color: "from-green-500 to-emerald-500"
              },
              {
                step: "03",
                title: "Professional Care",
                description: "Connect with licensed counselors when you need additional support through our secure platform.",
                icon: Users,
                color: "from-purple-500 to-pink-500"
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                    className={`w-16 h-16 bg-gradient-to-br ${item.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  >
                    <item.icon className="w-8 h-8" />
                  </motion.div>
                  
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
                      className="w-8 h-8 bg-gradient-to-r from-primary to-secondary text-white rounded-full flex items-center justify-center text-sm font-bold"
                    >
                      {item.step}
                    </motion.div>
                  </div>

                  <h3 className="text-xl font-semibold text-neutral-dark mb-4 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-neutral-medium leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>

                {/* Connecting Line */}
                {index < 2 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                    className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-secondary origin-left"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-gradient-to-r from-primary to-secondary"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Students Helped", icon: Users },
              { number: "95%", label: "Satisfaction Rate", icon: Star },
              { number: "24/7", label: "AI Support", icon: Heart },
              { number: "50+", label: "Universities", icon: Shield }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center text-white"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <stat.icon className="w-8 h-8" />
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="text-3xl font-bold mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-white/90 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonial Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="py-24 sm:py-32 bg-white"
      >
        <div className="container mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-48 h-48 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center"
                    >
                      <Heart className="w-16 h-16 text-primary" />
                    </motion.div>
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2 className="text-3xl font-bold tracking-tight text-neutral-dark sm:text-4xl">
                      Built for Students, <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">by Students</span>
                    </h2>
                    <motion.figure 
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="mt-8"
                    >
                        <blockquote className="text-lg leading-8 text-neutral-medium relative">
                          <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-full"
                          />
                          <p className="pl-6">"Vritti helped me manage my anxiety during finals week. The AI companion was there when I needed it most at 2 AM, offering breathing exercises that actually worked. It felt like having a supportive friend available 24/7."</p>
                        </blockquote>
                        <figcaption className="mt-6 flex items-center gap-x-4">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"
                          >
                            <span className="text-white font-bold text-lg">S</span>
                          </motion.div>
                          <div>
                              <div className="font-semibold text-neutral-dark">Sarah M.</div>
                              <div className="text-neutral-medium">Psychology Major, 2nd Year</div>
                          </div>
                        </figcaption>
                    </motion.figure>
                </motion.div>
            </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="py-24 sm:py-32 bg-white"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold tracking-tight text-neutral-dark sm:text-5xl mb-6">
              Frequently Asked <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-lg leading-8 text-neutral-medium max-w-3xl mx-auto">
              Everything you need to know about Vritti and how it can help your institution.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "Is Vritti HIPAA compliant?",
                  answer: "Yes, Vritti is fully HIPAA compliant and follows all healthcare data protection standards. We use enterprise-grade encryption and secure servers to protect all student data."
                },
                {
                  question: "How does the AI companion work?",
                  answer: "Our AI companion is trained on evidence-based therapeutic techniques including CBT and mindfulness practices. It provides immediate support, coping strategies, and can escalate to human counselors when needed."
                },
                {
                  question: "Can students remain anonymous?",
                  answer: "Absolutely. Students can use Vritti completely anonymously. We only collect necessary data for service delivery and never share personal information without explicit consent."
                },
                {
                  question: "What kind of support do you provide?",
                  answer: "We provide 24/7 AI support, mood tracking, stress management tools, access to licensed counselors, peer support networks, and comprehensive wellness resources."
                },
                {
                  question: "How quickly can we get started?",
                  answer: "Most institutions can be up and running within 24-48 hours. We provide full onboarding support, training materials, and dedicated account management."
                },
                {
                  question: "Do you offer custom integrations?",
                  answer: "Yes, our Enterprise plan includes API access and custom integrations with existing student information systems, learning management platforms, and other campus tools."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-neutral-light rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-neutral-dark mb-3 flex items-center gap-3">
                    <motion.div
                      whileHover={{ rotate: 90 }}
                      className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0"
                    >
                      <span className="text-white text-sm font-bold">+</span>
                    </motion.div>
                    {faq.question}
                  </h3>
                  <p className="text-neutral-medium leading-relaxed pl-9">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gradient-to-br from-neutral-dark to-neutral-900"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Transform Your Campus's <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Wellness?</span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-neutral-light max-w-2xl mx-auto">
              Join leading institutions in providing proactive mental health support. Start your journey towards a healthier, happier campus community.
            </p>
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link 
                to="/dashboard" 
                className="group relative rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Free Demo
                  <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-base font-semibold text-white border-2 border-white/20 rounded-xl hover:border-white/40 transition-all duration-300"
              >
                Contact Sales
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-neutral-dark text-white"
      >
          <div className="container mx-auto px-6 lg:px-8 py-16">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="md:col-span-2"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <img src="/logo.png" alt="Vritti Logo" className="h-8 w-8" />
                    <span className="text-2xl font-bold">Vritti</span>
                  </div>
                  <p className="text-neutral-light max-w-md">
                    Empowering students with AI-powered mental wellness support and seamless access to professional counseling services.
                  </p>
                </motion.div>
                
                {[
                  { title: "Product", links: ["Features", "Pricing", "Demo", "API"] },
                  { title: "Support", links: ["Help Center", "Contact", "Privacy", "Terms"] }
                ].map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                  >
                    <h3 className="font-semibold mb-4">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.links.map((link) => (
                        <li key={link}>
                          <a href="#" className="text-neutral-light hover:text-white transition-colors">
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="border-t border-white/10 pt-8 text-center text-sm text-neutral-medium"
              >
                  <p>&copy; 2025 Vritti Wellness. All rights reserved.</p>
              </motion.div>
          </div>
      </motion.footer>

      {/* Floating Scroll to Top Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isVisible ? 1 : 0, 
          opacity: isVisible ? 1 : 0 
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
      >
        <ChevronUp className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default LandingPage;