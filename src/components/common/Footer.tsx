'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Services',
      links: [
        { name: 'VAPT Services', href: '/what-we-do#vapt' },
        { name: 'Security Audits', href: '/what-we-do#audits' },
        { name: 'GRC & Compliance', href: '/what-we-do#grc' },
        { name: 'Incident Response', href: '/what-we-do#incident-response' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/homepage#about' },
        { name: 'Case Studies', href: '/case-studies-and-contact' },
        { name: 'Careers', href: '/homepage#careers' },
        { name: 'Blog', href: '/homepage#blog' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#' },
        { name: 'Security Guides', href: '#' },
        { name: 'FAQ', href: '/what-we-do#faq' },
        { name: 'Support', href: '/case-studies-and-contact' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' },
  ];

  // Animation variants for staggered entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          
          {/* Brand Column */}
          <motion.div className="lg:col-span-5 space-y-6" variants={itemVariants}>
            <Link href="/homepage" className="flex items-center gap-3 group">
              <div className="relative w-14 h-14 overflow-hidden rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300 bg-white p-1">
                <Image 
                  // 👇 Your Fixed Logo Link
                  src="https://Death-Vader.github.io/evolution-cyberlabs/assets/images/logo.png"
                  alt="Evolution CyberLabs" 
                  fill
                  className="object-contain"
                  priority
                  unoptimized={true}
                />
              </div>
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                Evolution <span className="text-blue-600">CyberLabs</span>
              </span>
            </Link>
            
            <p className="text-slate-500 leading-relaxed max-w-sm text-sm">
              Protecting businesses through intelligent, adaptive cybersecurity solutions. 
              Security that evolves as fast as the threats do.
            </p>
            
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          <motion.div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8" variants={itemVariants}>
            {sections.map((section) => (
              <div key={section.title}>
                <h4 className="font-bold text-slate-900 mb-6">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-sm text-slate-500 hover:text-blue-600 transition-colors duration-200 flex items-center gap-1 group w-fit"
                      >
                        <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 opacity-0 group-hover:opacity-100 text-blue-400">
                          <ArrowRight size={12} />
                        </span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            © {currentYear} Evolution CyberLabs. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <Link href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;