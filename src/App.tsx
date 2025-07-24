import React, { useEffect, useState, useRef } from 'react';
import { 
  ArrowRight, 
  Code, 
  Palette, 
  Zap, 
  Users, 
  Mail, 
  Github, 
  Quote,
  CheckCircle,
  Star,
  Menu,
  X,
  ChevronDown,
  Award,
  Target,
  Rocket,
  Shield,
  Globe,
  Smartphone,
  Monitor,
  Coffee
} from 'lucide-react';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);
      
      // Update active section based on scroll position
      const sections = [
        { id: 'home', ref: heroRef },
        { id: 'features', ref: featuresRef },
        { id: 'about', ref: aboutRef },
        { id: 'services', ref: servicesRef },
        { id: 'testimonials', ref: testimonialsRef },
        { id: 'contact', ref: contactRef }
      ];
      
      for (const section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const refs: { [key: string]: React.RefObject<HTMLElement> } = {
      home: heroRef,
      features: featuresRef,
      about: aboutRef,
      services: servicesRef,
      testimonials: testimonialsRef,
      contact: contactRef
    };
    
    refs[sectionId]?.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <span className={`text-xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  Ajay Dhangar
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      activeSection === item.id
                        ? isScrolled 
                          ? 'text-blue-600' 
                          : 'text-white'
                        : isScrolled 
                          ? 'text-gray-700 hover:text-blue-600' 
                          : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <div className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-colors duration-300 ${
                        isScrolled ? 'bg-blue-600' : 'bg-white'
                      }`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-white/95 backdrop-blur-lg border-t border-gray-100`}>
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 animate-fade-in">
                ✨ Welcome to the Future of Web Development
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white mb-8 leading-tight">
              Crafting Digital
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                Masterpieces
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transforming ideas into stunning, high-performance web experiences with 
              cutting-edge technology and pixel-perfect design.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => scrollToSection('contact')}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 flex items-center gap-3"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => scrollToSection('about')}
                className="group border-2 border-white/30 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
              >
                Discover More
                <ChevronDown className="inline-block w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-4">
              Why Choose Excellence
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Unmatched Development
              <span className="block text-blue-600">Expertise</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Delivering world-class web solutions with cutting-edge technologies, 
              meticulous attention to detail, and industry-leading best practices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Code,
                title: "Clean Architecture",
                description: "Scalable, maintainable code following SOLID principles and modern design patterns.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Palette,
                title: "Stunning Design",
                description: "Award-winning visual designs that captivate users and elevate brand identity.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Optimized performance with 99+ PageSpeed scores and sub-second load times.",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level security implementations protecting your data and users.",
                color: "from-green-500 to-emerald-500"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-blue-600 text-sm font-medium mb-4">
              Complete Solutions
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Full-Stack Development
              <span className="block text-blue-600">Services</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Monitor,
                title: "Web Applications",
                description: "Custom web applications built with React, Next.js, and modern frameworks.",
                features: ["Responsive Design", "PWA Support", "SEO Optimized", "Performance Focused"]
              },
              {
                icon: Smartphone,
                title: "Mobile Development",
                description: "Cross-platform mobile apps using React Native and Flutter.",
                features: ["iOS & Android", "Native Performance", "Offline Support", "Push Notifications"]
              },
              {
                icon: Globe,
                title: "E-Commerce Solutions",
                description: "Complete e-commerce platforms with payment integration and analytics.",
                features: ["Payment Gateway", "Inventory Management", "Analytics Dashboard", "Multi-vendor Support"]
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                    <div className="text-6xl">👨‍💻</div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-4">
                      <Award className="w-6 h-6" />
                      <span className="text-lg font-semibold">5+ Years Experience</span>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                      <Target className="w-6 h-6" />
                      <span className="text-lg font-semibold">100+ Projects Delivered</span>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                      <Coffee className="w-6 h-6" />
                      <span className="text-lg font-semibold">∞ Cups of Coffee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="inline-block px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-4">
                Meet the Developer
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Hi, I'm
                <span className="block text-blue-600">Ajay Dhangar</span>
              </h2>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                A passionate full-stack developer with expertise in modern web technologies. 
                I specialize in creating scalable, high-performance applications that deliver 
                exceptional user experiences and drive business growth.
              </p>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                With a focus on clean architecture, beautiful design, and optimal performance, 
                I help startups and enterprises build digital products that make a lasting impact.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://github.com/ajay-dhangar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  View GitHub Profile
                </a>
                
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center gap-3 border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  <Rocket className="w-5 h-5" />
                  Let's Collaborate
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-24 bg-gradient-to-br from-blue-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-4">
              Client Success Stories
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              What Clients Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "Working with Ajay was transformative for our business. The attention to detail and technical expertise delivered results beyond our expectations.",
                author: "Sarah Johnson",
                role: "CEO, TechStart Inc.",
                avatar: "SJ"
              },
              {
                quote: "Exceptional developer who combines technical brilliance with creative vision. Our website performance improved by 300% after the redesign.",
                author: "Michael Chen",
                role: "CTO, InnovateLab",
                avatar: "MC"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <Quote className="w-12 h-12 text-blue-400 mb-6" />
                <blockquote className="text-xl font-medium mb-8 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-white/70">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/90 to-purple-600/90"></div>
          <div className="absolute top-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-4">
            Ready to Start?
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Let's Build Something
            <span className="block">Amazing Together</span>
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Ready to transform your ideas into reality? Get in touch and let's discuss 
            how we can create something extraordinary for your business.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 backdrop-blur-sm"
              />
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105">
                <Mail className="w-5 h-5" />
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Ajay Dhangar</span>
              </div>
              
              <h3 className="text-xl font-semibold mb-6">Let's Connect & Create</h3>
              
              <div className="flex justify-center gap-6">
                <a 
                  href="https://github.com/ajay-dhangar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-110"
                >
                  <Github className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                </a>
                <a 
                  href="#" 
                  className="group w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-110"
                >
                  <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
            
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400 mb-2">
                © 2024 Ajay Dhangar. All rights reserved.
              </p>
              <p className="text-gray-400">
                Designed with ❤️ by{' '}
                <a 
                  href="https://github.com/ajay-dhangar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 transition-colors duration-300 font-medium"
                >
                  ajay-dhangar
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;