import Link from 'next/link';
import Image from 'next/image';
import Icon, { IconName } from '@/components/ui/AppIcon';

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

  const socialLinks: { name: string; icon: IconName; href: string }[] = [
    { name: 'LinkedIn', icon: 'GlobeAltIcon', href: '#' },
    { name: 'Twitter', icon: 'HashtagIcon', href: '#' },
    { name: 'GitHub', icon: 'CodeBracketIcon', href: '#' },
  ];

  return (
    <footer className="bg-muted/30 border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/homepage" className="flex items-center gap-4">
              {/* UPDATED: Increased size from w-10 h-10 to w-16 h-16 */}
              <div className="relative w-16 h-16 overflow-hidden rounded-lg">
                 <Image 
                    src="/assets/images/logo.png" 
                    alt="Evolution CyberLabs Logo" 
                    fill
                    className="object-cover"
                 />
              </div>
              <span className="text-2xl font-heading font-bold text-foreground">
                Evolution <span className="text-primary">CyberLabs</span>
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Protecting businesses through intelligent, adaptive cybersecurity solutions. 
              Security that evolves as fast as the threats do.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:scale-110 transition-all duration-300 shadow-sm"
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h4 className="font-heading font-bold text-foreground mb-6">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 block w-fit"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Evolution CyberLabs. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;