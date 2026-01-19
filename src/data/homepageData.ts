import { 
  ShieldCheckIcon, 
  CodeBracketIcon, 
  GlobeAltIcon, 
  ClipboardDocumentCheckIcon, 
  ScaleIcon, 
  BoltIcon,
  UserGroupIcon,
  ClockIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';

// =========================================
// 1. SERVICES DATA (Detailed for Modals)
// =========================================
export const servicesData = [
  {
    id: 'vapt',
    icon: 'ShieldCheckIcon',
    title: 'Vulnerability Assessment & Penetration Testing (VAPT)',
    description: 'Comprehensive security testing combining automated scanning with manual penetration testing to identify and validate vulnerabilities in your applications and infrastructure.',
    features: [
      'Manual penetration testing by certified experts',
      'Automated vulnerability scanning',
      'Business logic flaw identification',
      'Detailed remediation guidance'
    ],
    timeline: '3-4 weeks',
    badge: 'Most Popular',
    fullDescription: 'Our VAPT service combines the best of automated vulnerability scanning with expert manual penetration testing. We simulate real-world attack scenarios to identify security weaknesses before malicious actors can exploit them. Our certified ethical hackers use industry-standard methodologies including OWASP, PTES, and NIST guidelines to provide comprehensive security validation.',
    methodology: [
      'Reconnaissance and information gathering',
      'Vulnerability identification and analysis',
      'Exploitation and privilege escalation',
      'Post-exploitation and lateral movement',
      'Reporting and remediation guidance',
      'Re-testing and validation'
    ],
    deliverables: [
      'Executive summary with business impact analysis',
      'Detailed technical vulnerability report with CVSS scores',
      'Proof-of-concept exploits and attack scenarios',
      'Prioritized remediation roadmap with timelines',
      'Secure configuration recommendations',
      'Compliance mapping (PCI DSS, HIPAA, etc.)',
      'Re-test report after remediation'
    ],
    tools: ['Burp Suite Professional', 'Metasploit Framework', 'Nmap', 'OWASP ZAP', 'Nessus', 'Custom exploitation tools'],
    certifications: ['OSCP', 'CEH', 'GPEN', 'OSCE', 'PCI QSA']
  },
  {
    id: 'sast',
    icon: 'CodeBracketIcon',
    title: 'Static Application Security Testing (SAST)',
    description: 'Source code analysis to identify security vulnerabilities during development, enabling early detection and cost-effective remediation before deployment.',
    features: [
      'Source code security analysis',
      'CI/CD pipeline integration',
      'Developer-friendly reporting',
      'Custom rule configuration'
    ],
    timeline: '1-2 weeks',
    badge: null,
    fullDescription: 'Secure your application at the source. Our SAST service scans your source code, bytecode, or binary code to identify vulnerabilities such as SQL injection, Cross-Site Scripting (XSS), and buffer overflows early in the SDLC. We integrate directly into your development pipeline to prevent vulnerabilities from reaching production.',
    methodology: [
      'Requirement analysis & scope definition',
      'Tool configuration & rule customization',
      'Automated source code scanning',
      'Manual false-positive elimination',
      'Vulnerability verification',
      'Reporting & developer workshop'
    ],
    deliverables: [
      'Source code vulnerability report',
      'CI/CD integration documentation',
      'False positive analysis report',
      'Remediation code snippets',
      'Trend analysis for code quality'
    ],
    tools: ['SonarQube', 'Checkmarx', 'Fortify', 'Snyk', 'Semgrep'],
    certifications: ['CSSLP', 'GWEB', 'CASE']
  },
  {
    id: 'dast',
    icon: 'GlobeAltIcon',
    title: 'Dynamic Application Security Testing (DAST)',
    description: 'Runtime security testing of web applications and APIs to identify vulnerabilities in production-like environments without access to source code.',
    features: [
      'Black-box security testing',
      'API security assessment',
      'Authentication testing',
      'Session management analysis'
    ],
    timeline: '2-3 weeks',
    badge: null,
    fullDescription: 'Identify vulnerabilities in your running applications. Our DAST service interacts with your application from the outside, just like a real attacker would, to find runtime issues, configuration errors, and authentication flaws that static analysis might miss.',
    methodology: [
      'Application crawling & mapping',
      'Authentication & session analysis',
      'Input vector identification',
      'Automated & manual attack simulation',
      'Business logic validation',
      'Reporting & verification'
    ],
    deliverables: [
      'Runtime vulnerability report',
      'API security assessment report',
      'Authentication flaw analysis',
      'Remediation guidance',
      'Video evidence of exploits (where applicable)'
    ],
    tools: ['Burp Suite Pro', 'Acunetix', 'Netsparker', 'OWASP ZAP', 'Postman'],
    certifications: ['GWAPT', 'OSWE', 'CEN']
  },
  {
    id: 'audits',
    icon: 'ClipboardDocumentCheckIcon',
    title: 'Security Audits & Architecture Review',
    description: 'In-depth evaluation of your IT infrastructure, cloud configurations, and security policies against industry best practices and standards.',
    features: [
      'Cloud security configuration review',
      'Network architecture review',
      'Firewall rule auditing',
      'Policy gap analysis'
    ],
    timeline: '3-5 weeks',
    badge: 'Essential',
    fullDescription: 'Go beyond finding bugs to fixing the root cause. Our Security Audit service evaluates the fundamental design and configuration of your systems. We review your cloud environments (AWS, Azure, GCP), network architecture, and security policies to ensure they align with the principle of least privilege and defense-in-depth.',
    methodology: [
      'Documentation & diagram review',
      'Stakeholder interviews',
      'Configuration extraction & analysis',
      'Gap analysis against benchmarks (CIS, NIST)',
      'Risk assessment scoring',
      'Roadmap development'
    ],
    deliverables: [
      'Architecture gap analysis report',
      'Cloud security posture report',
      'Network segmentation recommendations',
      'Policy improvement roadmap',
      'Executive presentation'
    ],
    tools: ['Prowler', 'ScoutSuite', 'Wireshark', 'Microsoft Defender for Cloud', 'AWS Security Hub'],
    certifications: ['CISSP', 'CISA', 'CISM', 'CCSP', 'AWS Security Specialty']
  },
  {
    id: 'grc',
    icon: 'ScaleIcon',
    title: 'GRC & Compliance Strategy',
    description: 'Navigate complex regulatory landscapes with confidence. We help you achieve and maintain compliance with GDPR, HIPAA, PCI-DSS, and ISO 27001.',
    features: [
      'Compliance gap assessment',
      'Risk management framework setup',
      'Policy development',
      'Audit preparation support'
    ],
    timeline: '4-8 weeks',
    badge: null,
    fullDescription: 'Compliance is more than just checking boxes; it is about building trust. Our GRC experts help you interpret complex regulations like GDPR, HIPAA, SOC 2, and ISO 27001, translating them into actionable technical controls and organizational policies.',
    methodology: [
      'Regulatory scope definition',
      'Current state assessment',
      'Control gap analysis',
      'Remediation planning',
      'Policy drafting & review',
      'Pre-audit validation'
    ],
    deliverables: [
      'Compliance gap assessment report',
      'Risk register & treatment plan',
      'Customized policy suite',
      'System Security Plan (SSP)',
      'Audit readiness dashboard'
    ],
    tools: ['Vanta', 'Drata', 'OneTrust', 'KnowBe4', 'Standard GRC Platforms'],
    certifications: ['CISA', 'CISM', 'CGEIT', 'CRISC', 'ISO 27001 LA']
  },
  {
    id: 'incident-response',
    icon: 'BoltIcon',
    title: 'Incident Response & Forensics',
    description: 'Rapid response services to contain, investigate, and recover from cyber attacks. We minimize downtime and preserve evidence.',
    features: [
      '24/7 Emergency response',
      'Malware analysis',
      'Digital forensics',
      'Root cause analysis'
    ],
    timeline: 'On-Demand',
    badge: '24/7 Support',
    fullDescription: 'When a breach occurs, every second counts. Our Incident Response team is available 24/7 to help you contain the threat, eradicate the adversary, and recover your systems. We also perform detailed digital forensics to understand the "who, what, and how" of the attack.',
    methodology: [
      'Identification & triage',
      'Containment (Short & Long term)',
      'Eradication of threats',
      'Recovery & restoration',
      'Forensic analysis',
      'Post-incident lessons learned'
    ],
    deliverables: [
      'Incident timeline reconstruction',
      'Root cause analysis report',
      'Malware reverse engineering report',
      'Executive incident briefing',
      'Recommendations for future prevention'
    ],
    tools: ['Velociraptor', 'FTK Imager', 'Volatility', 'Wireshark', 'ELK Stack', 'Splunk'],
    certifications: ['GCIH', 'GCFA', 'GNFA', 'CHFI']
  }
];

// =========================================
// 2. CLIENTS DATA (Logos)
// =========================================
export const clientsData = [
  { id: 1, name: 'TechCorp', logo: '/assets/images/logo.png', alt: 'TechCorp Logo' },
  { id: 2, name: 'FinSecure', logo: '/assets/images/logo.png', alt: 'FinSecure Logo' },
  { id: 3, name: 'HealthSafe', logo: '/assets/images/logo.png', alt: 'HealthSafe Logo' },
  { id: 4, name: 'GlobalNet', logo: '/assets/images/logo.png', alt: 'GlobalNet Logo' },
  { id: 5, name: 'DataFlow', logo: '/assets/images/logo.png', alt: 'DataFlow Logo' },
  { id: 6, name: 'CyberShield', logo: '/assets/images/logo.png', alt: 'CyberShield Logo' },
];

// =========================================
// 3. STATS DATA (For WhyChooseUs)
// =========================================
export const statsData = [
  { value: '500+', label: 'Assessments' },
  { value: '98%', label: 'Satisfaction' },
  { value: '24/7', label: 'Availability' }
];

// =========================================
// 4. BENEFITS DATA (For WhyChooseUs)
// =========================================
export const benefitsData = [
  {
    id: 1,
    icon: 'UserGroupIcon',
    title: 'Expert Team',
    description: 'Certified professionals (OSCP, CISSP, CEH) with years of hands-on experience in offensive and defensive security.'
  },
  {
    id: 2,
    icon: 'ClockIcon',
    title: 'Rapid Response',
    description: 'Quick turnaround times for assessments and 24/7 availability for incident response to minimize your downtime.'
  },
  {
    id: 3,
    icon: 'CheckBadgeIcon',
    title: 'Compliance Ready',
    description: 'Our methodologies align with global standards like ISO 27001, GDPR, HIPAA, and PCI-DSS to ensure you stay compliant.'
  }
];

// =========================================
// 5. TESTIMONIALS DATA
// =========================================
export const testimonialsData = [
  {
    id: 1,
    content: "Evolution CyberLabs transformed our security posture. Their VAPT report was incredibly detailed and helped us fix critical vulnerabilities before our product launch.",
    author: "Sarah Jenkins",
    role: "CTO, FinTech Innovations",
    rating: 5,
    // FIX: Added dynamic image URL
    image: "https://ui-avatars.com/api/?name=Sarah+Jenkins&background=0D8ABC&color=fff&size=128"
  },
  {
    id: 2,
    content: "Professional, thorough, and highly responsive. The team explained complex security issues in a way our board could understand.",
    author: "Michael Chen",
    role: "Director of IT, HealthStream Systems",
    rating: 5,
    // FIX: Added dynamic image URL
    image: "https://ui-avatars.com/api/?name=Michael+Chen&background=0D8ABC&color=fff&size=128"
  },
  {
    id: 3,
    content: "We've used several vendors for penetration testing, but Evolution CyberLabs provided the most actionable insights by far.",
    author: "David Ross",
    role: "CISO, Global Logistics Co",
    rating: 5,
    // FIX: Added dynamic image URL
    image: "https://ui-avatars.com/api/?name=David+Ross&background=0D8ABC&color=fff&size=128"
  }
];