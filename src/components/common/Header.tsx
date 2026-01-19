'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';
import { clsx } from 'clsx';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    { name: 'Home', href: '/homepage' },
    { name: 'What We Do', href: '/what-we-do' },
    { name: 'Case Studies & Contact', href: '/case-studies-and-contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          isScrolled 
            ? "bg-white/90 backdrop-blur-md border-slate-200 shadow-sm py-2" 
            : "bg-transparent border-transparent py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Section */}
            <Link href="/homepage" className="flex items-center gap-3 group">
              <div className="relative w-14 h-14 overflow-hidden rounded-lg group-hover:scale-105 transition-transform duration-300">
                 <Image 
                    src="/assets/images/logo.png" 
                    alt="Evolution CyberLabs Logo" 
                    fill
                    className="object-cover"
                    priority
                 />
              </div>
              <span className="text-xl md:text-2xl font-heading font-bold text-slate-900 tracking-tight">
                Evolution <span className="text-blue-600">CyberLabs</span>
              </span>
            </Link>

            {/* Desktop Nav - UPDATED TO MATCH SCREENSHOT */}
            <nav className="hidden md:flex items-center gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    "px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200",
                    isActive(item.href)
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200" // Active: Solid Blue Button
                      : "text-slate-600 hover:text-blue-600 hover:bg-blue-50" // Inactive: Clean Text
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link
                href="/case-studies-and-contact"
                className="hidden lg:inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-blue-600 transition-all duration-200 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 active:scale-95"
              >
                Book Consultation
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
                aria-label="Toggle menu"
              >
                <Icon name={isMobileMenuOpen ? "XMarkIcon" : "Bars3Icon"} size={28} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-white pt-28 px-4 md:hidden overflow-hidden"
          >
            <nav className="flex flex-col space-y-3">
              {navigationItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={clsx(
                      "flex items-center justify-between p-4 rounded-xl text-lg font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                    )}
                  >
                    {item.name}
                    <Icon name="ChevronRightIcon" size={20} className={isActive(item.href) ? "opacity-100" : "opacity-40"} />
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <Link
                  href="/case-studies-and-contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full p-4 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-xl"
                >
                  Book Free Consultation
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;