'use client';

import React, { useMemo, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { jsPDF } from 'jspdf';

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

interface ResourceTab {
  id: 'assessment' | 'checklist' | 'calculator';
  name: string;
  icon: string;
}

type YesNoPartial = 'Yes' | 'No' | 'Partial' | null;

interface AssessmentState {
  incidentPlan: YesNoPartial;
  testingFreq: 'Monthly' | 'Quarterly' | 'Annually' | 'Never' | null;
  encryption: 'Both' | 'Transit Only' | 'Neither' | null;

  // Extra questions (for a more professional report)
  mfa: 'All Users' | 'Privileged Only' | 'No MFA' | null;
  patching: 'Automated' | 'Monthly' | 'Ad-hoc' | 'Unknown' | null;
  backups: 'Daily + Tested' | 'Daily' | 'Weekly' | 'No Backups' | null;
  edr: 'Org-wide' | 'Partial' | 'None' | null;
  logging: 'Central SIEM' | 'Basic Logs' | 'Minimal' | null;
  accessReviews: 'Quarterly' | 'Annually' | 'Never' | null;
  vendorRisk: 'Assessed' | 'Somewhat' | 'Not Assessed' | null;
  awareness: 'Quarterly' | 'Annually' | 'Never' | null;
  dataClassification: 'Implemented' | 'Partial' | 'Not Implemented' | null;
}

type FindingSeverity = 'P0-Critical' | 'P1-High' | 'P2-Medium' | 'P3-Low';

type FindingDomain =
  | 'Incident Response'
  | 'Security Testing'
  | 'Data Protection'
  | 'Identity & Access'
  | 'Endpoint Security'
  | 'Logging & Monitoring'
  | 'Vulnerability Management'
  | 'Backups & Resilience'
  | 'Third-Party Risk'
  | 'Security Awareness'
  | 'Data Governance';

type Finding = {
  domain: FindingDomain;
  title: string;
  severity: FindingSeverity;
  rationale: string;
  recommendations: string[];
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

// Load /public image as base64 (works client-side)
const loadImageAsDataURL = (url: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas not supported'));
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });

const InteractiveResources = () => {
  const [activeTab, setActiveTab] = useState<string>('assessment');

  const [assessmentAnswers, setAssessmentAnswers] = useState<AssessmentState>({
    incidentPlan: null,
    testingFreq: null,
    encryption: null,

    mfa: null,
    patching: null,
    backups: null,
    edr: null,
    logging: null,
    accessReviews: null,
    vendorRisk: null,
    awareness: null,
    dataClassification: null,
  });

  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: 1, text: 'Inventory all web applications and APIs', completed: false },
    { id: 2, text: 'Document authentication mechanisms', completed: false },
    { id: 3, text: 'Identify sensitive data storage locations', completed: false },
    { id: 4, text: 'Review access control policies', completed: false },
    { id: 5, text: 'Check encryption implementation', completed: false },
    { id: 6, text: 'Audit third-party integrations', completed: false },
    { id: 7, text: 'Verify logging and monitoring', completed: false },
    { id: 8, text: 'Test incident response procedures', completed: false },
  ]);

  const [riskScore, setRiskScore] = useState({
    authentication: 3,
    dataProtection: 2,
    networkSecurity: 4,
    compliance: 3,
  });

  const tabs: ResourceTab[] = [
    { id: 'assessment', name: 'Security Assessment', icon: 'ClipboardDocumentCheckIcon' },
    { id: 'checklist', name: 'Compliance Checklist', icon: 'CheckCircleIcon' },
    { id: 'calculator', name: 'Risk Calculator', icon: 'CalculatorIcon' },
  ];

  const toggleChecklistItem = (id: number) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleRiskChange = (category: keyof typeof riskScore, value: number) => {
    setRiskScore((prev) => ({ ...prev, [category]: value }));
  };

  const handleAssessmentUpdate = (
    key: keyof AssessmentState,
    value: AssessmentState[keyof AssessmentState]
  ) => {
    setAssessmentAnswers((prev) => ({ ...prev, [key]: value as any }));
  };

  const calculateOverallRisk = () => {
    const total = Object.values(riskScore).reduce((sum, val) => sum + val, 0);
    const avg = total / Object.keys(riskScore).length;

    if (avg <= 2) return { level: 'Low', color: 'text-success', bg: 'bg-success/10' };
    if (avg <= 3) return { level: 'Medium', color: 'text-warning', bg: 'bg-warning/10' };
    return { level: 'High', color: 'text-destructive', bg: 'bg-destructive/10' };
  };

  const completedCount = checklist.filter((item) => item.completed).length;
  const completionPercentage = (completedCount / checklist.length) * 100;

  const getOptionClass = (isSelected: boolean) => {
    return isSelected
      ? 'bg-primary text-primary-foreground shadow-md'
      : 'bg-muted text-foreground hover:bg-muted/80';
  };

  // ---------- Professional posture scoring ----------
  const posture = useMemo(() => {
    const weights: Record<keyof AssessmentState, number> = {
      incidentPlan: 12,
      testingFreq: 10,
      encryption: 12,

      mfa: 12,
      patching: 8,
      backups: 10,
      edr: 10,
      logging: 10,
      accessReviews: 6,
      vendorRisk: 6,
      awareness: 4,
      dataClassification: 10,
    };

    const part = (key: keyof AssessmentState): number => {
      const v = assessmentAnswers[key];

      switch (key) {
        case 'incidentPlan':
          return v === 'Yes' ? 1 : v === 'Partial' ? 0.5 : v === 'No' ? 0 : 0;
        case 'testingFreq':
          return v === 'Monthly'
            ? 1
            : v === 'Quarterly'
              ? 0.8
              : v === 'Annually'
                ? 0.4
                : v === 'Never'
                  ? 0
                  : 0;
        case 'encryption':
          return v === 'Both' ? 1 : v === 'Transit Only' ? 0.5 : v === 'Neither' ? 0 : 0;

        case 'mfa':
          return v === 'All Users' ? 1 : v === 'Privileged Only' ? 0.6 : v === 'No MFA' ? 0 : 0;
        case 'patching':
          return v === 'Automated'
            ? 1
            : v === 'Monthly'
              ? 0.7
              : v === 'Ad-hoc'
                ? 0.3
                : v === 'Unknown'
                  ? 0.1
                  : 0;
        case 'backups':
          return v === 'Daily + Tested'
            ? 1
            : v === 'Daily'
              ? 0.7
              : v === 'Weekly'
                ? 0.4
                : v === 'No Backups'
                  ? 0
                  : 0;
        case 'edr':
          return v === 'Org-wide' ? 1 : v === 'Partial' ? 0.5 : v === 'None' ? 0 : 0;
        case 'logging':
          return v === 'Central SIEM' ? 1 : v === 'Basic Logs' ? 0.5 : v === 'Minimal' ? 0 : 0;
        case 'accessReviews':
          return v === 'Quarterly' ? 1 : v === 'Annually' ? 0.5 : v === 'Never' ? 0 : 0;
        case 'vendorRisk':
          return v === 'Assessed' ? 1 : v === 'Somewhat' ? 0.5 : v === 'Not Assessed' ? 0 : 0;
        case 'awareness':
          return v === 'Quarterly' ? 1 : v === 'Annually' ? 0.5 : v === 'Never' ? 0 : 0;
        case 'dataClassification':
          return v === 'Implemented' ? 1 : v === 'Partial' ? 0.5 : v === 'Not Implemented' ? 0 : 0;
        default:
          return 0;
      }
    };

    const totalW = Object.values(weights).reduce((a, b) => a + b, 0);
    let scoreW = 0;

    (Object.keys(weights) as (keyof AssessmentState)[]).forEach((k) => {
      scoreW += part(k) * weights[k];
    });

    const score = Math.round((scoreW / totalW) * 100);

    let tier: 'Strong' | 'Moderate' | 'Weak' | 'Critical' = 'Moderate';
    if (score >= 80) tier = 'Strong';
    else if (score >= 60) tier = 'Moderate';
    else if (score >= 40) tier = 'Weak';
    else tier = 'Critical';

    return { score, tier };
  }, [assessmentAnswers]);

  const findings = useMemo<Finding[]>(() => {
    const f: Finding[] = [];

    // IR
    if (assessmentAnswers.incidentPlan === 'No') {
      f.push({
        domain: 'Incident Response',
        title: 'No documented Incident Response Plan (IRP)',
        severity: 'P0-Critical',
        rationale:
          'Without an IRP, incident handling is inconsistent, increasing containment time, business impact, and recovery cost.',
        recommendations: [
          'Create an IRP covering roles, escalation, communications, triage, containment, eradication, and recovery.',
          'Run a tabletop exercise quarterly and track remediation actions to closure.',
        ],
      });
    } else if (assessmentAnswers.incidentPlan === 'Partial') {
      f.push({
        domain: 'Incident Response',
        title: 'Incident Response Plan is partial / not validated',
        severity: 'P1-High',
        rationale:
          'Incomplete or untested response plans often fail during real incidents, delaying decision-making and containment.',
        recommendations: [
          'Complete missing playbooks (phishing, ransomware, credential compromise) and contacts.',
          'Test via tabletop + technical simulations; refine based on lessons learned.',
        ],
      });
    }

    // Testing
    if (assessmentAnswers.testingFreq === 'Never') {
      f.push({
        domain: 'Security Testing',
        title: 'Security testing is not performed',
        severity: 'P0-Critical',
        rationale:
          'Unknown vulnerabilities may persist for long periods, increasing the likelihood of exploitation.',
        recommendations: [
          'Start quarterly VAPT for internet-facing assets and critical apps/APIs.',
          'Introduce continuous vulnerability scanning with remediation SLAs.',
        ],
      });
    } else if (assessmentAnswers.testingFreq === 'Annually') {
      f.push({
        domain: 'Security Testing',
        title: 'Security testing is infrequent (annual)',
        severity: 'P2-Medium',
        rationale:
          'Annual testing can miss rapid changes and newly disclosed vulnerabilities affecting your environment.',
        recommendations: [
          'Increase cadence to quarterly for critical assets and after major releases/changes.',
          'Track findings trends and a remediation burn-down.',
        ],
      });
    }

    // Encryption
    if (assessmentAnswers.encryption === 'Neither') {
      f.push({
        domain: 'Data Protection',
        title: 'Data is not encrypted at rest or in transit',
        severity: 'P0-Critical',
        rationale:
          'Data confidentiality and compliance posture are significantly weaker without encryption controls.',
        recommendations: [
          'Enforce TLS 1.2+ for all traffic (web, APIs, service-to-service).',
          'Enable encryption at rest for DBs, object storage, endpoints, and backups; implement KMS + key rotation.',
        ],
      });
    } else if (assessmentAnswers.encryption === 'Transit Only') {
      f.push({
        domain: 'Data Protection',
        title: 'Encryption at rest is missing',
        severity: 'P1-High',
        rationale:
          'If storage/backups are accessed by an attacker, unencrypted data can be read immediately.',
        recommendations: [
          'Enable encryption at rest for databases, object storage, and backups.',
          'Apply strict key access controls and rotation policies.',
        ],
      });
    }

    // MFA
    if (assessmentAnswers.mfa === 'No MFA') {
      f.push({
        domain: 'Identity & Access',
        title: 'Multi-factor authentication (MFA) is not enforced',
        severity: 'P0-Critical',
        rationale:
          'Credential attacks (phishing/password reuse) are significantly more successful without MFA.',
        recommendations: [
          'Enforce MFA for all users across email, SSO, admin portals, and remote access.',
          'Prefer phishing-resistant MFA (FIDO2/WebAuthn) for privileged users where feasible.',
        ],
      });
    } else if (assessmentAnswers.mfa === 'Privileged Only') {
      f.push({
        domain: 'Identity & Access',
        title: 'MFA coverage is limited',
        severity: 'P2-Medium',
        rationale:
          'Non-privileged compromise is commonly used as a stepping stone to privilege escalation.',
        recommendations: ['Expand MFA to all users with conditional access policies.'],
      });
    }

    // Logging
    if (assessmentAnswers.logging === 'Minimal') {
      f.push({
        domain: 'Logging & Monitoring',
        title: 'Logging/monitoring coverage is minimal',
        severity: 'P1-High',
        rationale:
          'Low visibility increases MTTD/MTTR and allows attackers to persist longer.',
        recommendations: [
          'Centralize logs into a SIEM (auth, endpoints, network, cloud, apps).',
          'Implement alerting for high-risk events and define response playbooks.',
        ],
      });
    } else if (assessmentAnswers.logging === 'Basic Logs') {
      f.push({
        domain: 'Logging & Monitoring',
        title: 'Logging exists but is not centralized',
        severity: 'P2-Medium',
        rationale:
          'Distributed logs make correlation difficult and slow down investigations.',
        recommendations: ['Integrate core log sources into a SIEM and tune detections.'],
      });
    }

    // EDR
    if (assessmentAnswers.edr === 'None') {
      f.push({
        domain: 'Endpoint Security',
        title: 'Endpoint detection and response (EDR) is not deployed',
        severity: 'P1-High',
        rationale:
          'EDR is essential for detecting malware, lateral movement, and suspicious behaviors on endpoints/servers.',
        recommendations: [
          'Deploy EDR org-wide for workstations and servers.',
          'Tune policies and define containment actions (isolation/quarantine).',
        ],
      });
    } else if (assessmentAnswers.edr === 'Partial') {
      f.push({
        domain: 'Endpoint Security',
        title: 'EDR is partially deployed',
        severity: 'P2-Medium',
        rationale:
          'Attackers can target unmanaged endpoints/servers with lower detection coverage.',
        recommendations: ['Expand EDR to full coverage and track endpoint coverage KPI.'],
      });
    }

    // Backups
    if (assessmentAnswers.backups === 'No Backups') {
      f.push({
        domain: 'Backups & Resilience',
        title: 'Backups are not in place',
        severity: 'P0-Critical',
        rationale:
          'Ransomware or accidental deletion can cause prolonged downtime and data loss without recoverability.',
        recommendations: [
          'Implement backups using 3-2-1 strategy (including immutable/offline copy).',
          'Test restores and define RPO/RTO targets for critical systems.',
        ],
      });
    } else if (assessmentAnswers.backups === 'Weekly') {
      f.push({
        domain: 'Backups & Resilience',
        title: 'Backups are infrequent (weekly)',
        severity: 'P2-Medium',
        rationale:
          'Weekly backups may not meet acceptable recovery objectives for many business processes.',
        recommendations: ['Increase backup cadence for critical systems and run restore tests.'],
      });
    } else if (assessmentAnswers.backups === 'Daily') {
      f.push({
        domain: 'Backups & Resilience',
        title: 'Backups exist but restore testing is not confirmed',
        severity: 'P3-Low',
        rationale:
          'Backups that are not routinely tested may fail during real recovery scenarios.',
        recommendations: ['Implement periodic restore drills and document recovery runbooks.'],
      });
    }

    // Patching
    if (assessmentAnswers.patching === 'Ad-hoc' || assessmentAnswers.patching === 'Unknown') {
      f.push({
        domain: 'Vulnerability Management',
        title: 'Patch management is inconsistent',
        severity: 'P1-High',
        rationale:
          'Unpatched systems are a common initial access vector. Inconsistent patching increases exploitability.',
        recommendations: [
          'Define patch SLAs (e.g., Critical 7–14 days) and maintain a complete asset inventory.',
          'Automate patching where feasible and report patch compliance metrics.',
        ],
      });
    }

    // Access reviews
    if (assessmentAnswers.accessReviews === 'Never') {
      f.push({
        domain: 'Identity & Access',
        title: 'User access reviews are not conducted',
        severity: 'P2-Medium',
        rationale:
          'Stale access and over-privileged accounts increase risk of unauthorized access and insider misuse.',
        recommendations: [
          'Perform access reviews quarterly for privileged access and annually for general access.',
          'Adopt least privilege and RBAC.',
        ],
      });
    }

    // Vendor risk
    if (assessmentAnswers.vendorRisk === 'Not Assessed') {
      f.push({
        domain: 'Third-Party Risk',
        title: 'Third-party/vendor security is not assessed',
        severity: 'P2-Medium',
        rationale:
          'Vendors can introduce supply-chain risk through integrations, data access, or insecure practices.',
        recommendations: [
          'Perform vendor due diligence (questionnaire + evidence like SOC2/ISO, risk rating).',
          'Update contracts with security clauses, breach notification, and data handling requirements.',
        ],
      });
    }

    // Awareness
    if (assessmentAnswers.awareness === 'Never') {
      f.push({
        domain: 'Security Awareness',
        title: 'Security awareness training is not conducted',
        severity: 'P3-Low',
        rationale:
          'Phishing and social engineering are common. Training reduces likelihood of successful attacks.',
        recommendations: [
          'Run annual awareness training + periodic phishing simulations.',
          'Enable a simple reporting mechanism for suspicious emails/events.',
        ],
      });
    }

    // Data classification
    if (assessmentAnswers.dataClassification === 'Not Implemented') {
      f.push({
        domain: 'Data Governance',
        title: 'Data classification is not implemented',
        severity: 'P2-Medium',
        rationale:
          'Without classification, controls may not align to data sensitivity, increasing leakage and compliance risk.',
        recommendations: [
          'Define data classes (Public/Internal/Confidential/Restricted) and handling rules.',
          'Apply labeling/DLP where appropriate and train staff on handling requirements.',
        ],
      });
    } else if (assessmentAnswers.dataClassification === 'Partial') {
      f.push({
        domain: 'Data Governance',
        title: 'Data classification is partially implemented',
        severity: 'P3-Low',
        rationale:
          'Partial rollout can leave critical data without appropriate controls.',
        recommendations: ['Expand coverage and align access/encryption policies to data class.'],
      });
    }

    return f;
  }, [assessmentAnswers]);

  const severityRank = (s: FindingSeverity) => {
    const order: Record<FindingSeverity, number> = {
      'P0-Critical': 0,
      'P1-High': 1,
      'P2-Medium': 2,
      'P3-Low': 3,
    };
    return order[s];
  };

  const groupedFindings = useMemo(() => {
    const sorted = [...findings].sort((a, b) => severityRank(a.severity) - severityRank(b.severity));
    const groups: Record<FindingDomain, Finding[]> = {
      'Incident Response': [],
      'Security Testing': [],
      'Data Protection': [],
      'Identity & Access': [],
      'Endpoint Security': [],
      'Logging & Monitoring': [],
      'Vulnerability Management': [],
      'Backups & Resilience': [],
      'Third-Party Risk': [],
      'Security Awareness': [],
      'Data Governance': [],
    };
    sorted.forEach((x) => groups[x.domain].push(x));
    return groups;
  }, [findings]);

  const buildRoadmap = () => {
    const p0 = findings.filter((x) => x.severity === 'P0-Critical').length;
    const p1 = findings.filter((x) => x.severity === 'P1-High').length;

    if (p0 > 0) {
      return {
        focus: 'Immediate risk reduction (P0/P1)',
        bullets: [
          '0–30 days: Address critical gaps (MFA, encryption, backups, incident readiness).',
          '30–60 days: Centralize logging into SIEM, deploy/tune EDR, implement patch SLAs.',
          '60–90 days: Formalize access reviews and vendor risk; strengthen governance controls.',
          'Ongoing: Improve awareness, run exercises, and continuously validate security controls.',
        ],
      };
    }
    if (p1 > 0) {
      return {
        focus: 'Stabilize detection + response',
        bullets: [
          '0–30 days: Improve logging/monitoring, patch SLAs, and endpoint controls.',
          '30–60 days: Increase testing cadence and formalize incident playbooks.',
          '60–90 days: Expand governance (data classification, vendor risk) and optimize processes.',
          'Ongoing: Continuous validation and training.',
        ],
      };
    }
    return {
      focus: 'Continuous improvement',
      bullets: [
        'Maintain quarterly technical validation (scan + targeted pentest).',
        'Review IR playbooks and run exercises.',
        'Expand detections/use cases and tune to reduce false positives.',
        'Track KPIs: patch compliance, coverage, MTTD/MTTR, and remediation burn-down.',
      ],
    };
  };

  // ---------------- PDF GENERATION ----------------
  const generateAssessmentPdf = async () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 44;
    const lineGap = 15;

    const companyName = 'Evolution CyberLabs';
    const reportTitle = 'Security Gap Assessment Report';
    const generatedOn = new Date().toLocaleString();

    const brandNavy: [number, number, number] = [12, 26, 52];
    const brandBlue: [number, number, number] = [56, 137, 207];
    const softGray: [number, number, number] = [245, 247, 250];

    let y = margin;
    const headerHeight = 76;

    let logoDataUrl: string | null = null;
    try {
      // Place logo at /public/Logo1.png
      logoDataUrl = await loadImageAsDataURL('/Logo1.png');
    } catch {
      logoDataUrl = null;
    }

    const safe = (v: any) => (v === null || v === undefined || v === '' ? 'Not answered' : String(v));

    const addFooter = () => {
      const footerY = pageHeight - 26;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(120);

      const pageNum = doc.getCurrentPageInfo().pageNumber;
      doc.text(`Page ${pageNum}`, pageWidth - margin, footerY, { align: 'right' });
      doc.text(`Generated on ${generatedOn}`, margin, footerY);

      doc.setTextColor(0);
    };

    const addHeader = () => {
      doc.setFillColor(...softGray);
      doc.rect(0, 0, pageWidth, headerHeight, 'F');

      const box = { x: margin, y: 14, w: 44, h: 44 };
      if (logoDataUrl) {
        doc.addImage(logoDataUrl, 'PNG', box.x, box.y, box.w, box.h);
      } else {
        doc.setFillColor(220, 230, 240);
        doc.rect(box.x, box.y, box.w, box.h, 'F');
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(...brandNavy);
      doc.text(companyName, margin + 58, 36);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(90);
      doc.text('VAPT • Managed SOC • GRC • Threat Detection & Response', margin + 58, 54);

      doc.setDrawColor(220);
      doc.line(margin, headerHeight, pageWidth - margin, headerHeight);

      doc.setTextColor(0);
      y = headerHeight + 30;
    };

    const ensureSpace = (needed: number) => {
      if (y + needed > pageHeight - margin) {
        addFooter();
        doc.addPage();
        addHeader();
      }
    };

    const addDivider = () => {
      ensureSpace(16);
      doc.setDrawColor(230);
      doc.line(margin, y, pageWidth - margin, y);
      y += 16;
    };

    const addH2 = (title: string) => {
      ensureSpace(44);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(...brandNavy);
      doc.text(title, margin, y);
      y += 10;

      doc.setDrawColor(220);
      doc.line(margin, y, pageWidth - margin, y);
      y += 16;
      doc.setTextColor(0);
    };

    const addParagraph = (text: string) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(40);

      const lines = doc.splitTextToSize(text, pageWidth - margin * 2);
      ensureSpace(lines.length * lineGap + 8);
      doc.text(lines, margin, y);
      y += lines.length * lineGap + 8;

      doc.setTextColor(0);
    };

    const addBullet = (text: string) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(40);

      const bullet = `• ${text}`;
      const lines = doc.splitTextToSize(bullet, pageWidth - margin * 2);
      ensureSpace(lines.length * lineGap);
      doc.text(lines, margin, y);
      y += lines.length * lineGap;

      doc.setTextColor(0);
    };

    const addKV = (k: string, v: string) => {
      ensureSpace(18);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...brandNavy);
      doc.text(`${k}:`, margin, y);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(40);
      const valueLines = doc.splitTextToSize(v || '-', pageWidth - margin * 2 - 150);
      doc.text(valueLines, margin + 150, y);
      y += Math.max(18, valueLines.length * lineGap);

      doc.setTextColor(0);
    };

    const addPill = (x: number, y0: number, label: string, fill: [number, number, number]) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      const padX = 10;
      const h = 20;
      const w = clamp(doc.getTextWidth(label) + padX * 2, 66, 140);

      doc.setFillColor(...fill);
      doc.roundedRect(x, y0, w, h, 10, 10, 'F');

      doc.setTextColor(...brandNavy);
      doc.text(label, x + padX, y0 + 14);
      doc.setTextColor(0);

      return w;
    };

    const addScoreCard = () => {
      ensureSpace(92);
      doc.setFillColor(250, 252, 255);
      doc.setDrawColor(215, 230, 245);
      doc.roundedRect(margin, y, pageWidth - margin * 2, 70, 14, 14, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...brandNavy);
      doc.text('Posture Score', margin + 16, y + 22);
      doc.text('Posture Tier', margin + 210, y + 22);
      doc.text('Overall Risk', margin + 370, y + 22);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(...brandBlue);
      doc.text(`${posture.score}/100`, margin + 16, y + 50);

      doc.setFontSize(14);
      doc.setTextColor(...brandNavy);
      doc.text(posture.tier, margin + 210, y + 50);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(...brandNavy);
      doc.text(calculateOverallRisk().level, margin + 370, y + 50);

      doc.setTextColor(0);
      y += 88;
    };

    const addSeverityLegend = () => {
      ensureSpace(36);
      const baseY = y;
      let x = margin;

      x += addPill(x, baseY, 'P0-Critical', [255, 224, 224]) + 8;
      x += addPill(x, baseY, 'P1-High', [255, 238, 214]) + 8;
      x += addPill(x, baseY, 'P2-Medium', [255, 247, 214]) + 8;
      addPill(x, baseY, 'P3-Low', [232, 245, 255]);

      y += 30;
    };

    const roadmap = buildRoadmap();

    // ===================== COVER PAGE =====================
    {
      doc.setFillColor(245, 249, 255);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      doc.setFillColor(...brandNavy);
      doc.rect(0, 0, pageWidth, 110, 'F');

      if (logoDataUrl) {
        doc.addImage(logoDataUrl, 'PNG', margin, 26, 58, 58);
      } else {
        doc.setFillColor(255, 255, 255);
        doc.rect(margin, 26, 58, 58, 'F');
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(255, 255, 255);
      doc.text(companyName, margin + 74, 60);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(220, 235, 255);
      doc.text('Security that scales with your business.', margin + 74, 82);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(26);
      doc.setTextColor(...brandNavy);
      doc.text(reportTitle, margin, 180);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(60);
      doc.text(`Generated: ${generatedOn}`, margin, 205);

      const cardX = margin;
      const cardY = 250;
      const cardW = pageWidth - margin * 2;
      const cardH = 130;

      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(215, 230, 245);
      doc.roundedRect(cardX, cardY, cardW, cardH, 16, 16, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(...brandNavy);
      doc.text('Posture Score', cardX + 18, cardY + 34);
      doc.text('Posture Tier', cardX + 220, cardY + 34);
      doc.text('Overall Risk', cardX + 410, cardY + 34);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(34);
      doc.setTextColor(...brandBlue);
      doc.text(`${posture.score}/100`, cardX + 18, cardY + 82);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(...brandNavy);
      doc.text(posture.tier, cardX + 220, cardY + 82);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(...brandNavy);
      doc.text(calculateOverallRisk().level, cardX + 410, cardY + 82);

      doc.setFillColor(255, 249, 235);
      doc.setDrawColor(245, 225, 170);
      doc.roundedRect(margin, 420, cardW, 70, 14, 14, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(120, 80, 0);
      doc.text('Disclaimer', margin + 14, 445);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(120, 80, 0);
      doc.text(
        doc.splitTextToSize(
          'This is a preliminary, questionnaire-based assessment. A detailed technical validation (VAPT, configuration review, and log analysis) is recommended.',
          cardW - 28
        ),
        margin + 14,
        462
      );

      doc.setFillColor(...brandNavy);
      doc.rect(0, pageHeight - 90, pageWidth, 90, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(255, 255, 255);
      doc.text('Secure today. Stay resilient tomorrow.', margin, pageHeight - 52);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(220, 235, 255);
      doc.text('Get a FREE 30-minute security consultation with Evolution CyberLabs.', margin, pageHeight - 37);

      doc.setTextColor(0);

      addFooter();
      doc.addPage();
    }

    // ===================== HEADERED PAGES =====================
    addHeader();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(...brandNavy);
    doc.text('Executive Summary', margin, y);
    doc.setTextColor(0);
    y += 18;

    addScoreCard();
    addSeverityLegend();

    const p0 = findings.filter((x) => x.severity === 'P0-Critical').length;
    const p1 = findings.filter((x) => x.severity === 'P1-High').length;
    const p2 = findings.filter((x) => x.severity === 'P2-Medium').length;
    const p3 = findings.filter((x) => x.severity === 'P3-Low').length;

    addParagraph(
      `This report summarizes a high-level security gap assessment based on the inputs provided in the interactive tool. ` +
        `Findings are prioritized to support remediation planning. Current findings: ${p0} P0 (Critical), ${p1} P1 (High), ${p2} P2 (Medium), ${p3} P3 (Low).`
    );

    addH2('Assessment Context');
    addKV('Scope', 'High-level security posture & gap identification (questionnaire-based).');
    addKV('Method', 'Weighted scoring + qualitative findings by domain.');
    addKV('Recommended Validation', 'VAPT, configuration review, evidence-based audit, and log analysis.');

    addH2('Inputs Summary');
    addKV('Incident Response Plan', safe(assessmentAnswers.incidentPlan));
    addKV('Security Testing Frequency', safe(assessmentAnswers.testingFreq));
    addKV('Encryption', safe(assessmentAnswers.encryption));
    addKV('MFA', safe(assessmentAnswers.mfa));
    addKV('Patch Management', safe(assessmentAnswers.patching));
    addKV('Backups', safe(assessmentAnswers.backups));
    addKV('EDR', safe(assessmentAnswers.edr));
    addKV('Logging', safe(assessmentAnswers.logging));
    addKV('Access Reviews', safe(assessmentAnswers.accessReviews));
    addKV('Vendor Risk', safe(assessmentAnswers.vendorRisk));
    addKV('Awareness Training', safe(assessmentAnswers.awareness));
    addKV('Data Classification', safe(assessmentAnswers.dataClassification));

    addH2('Risk Calculator (User Ratings)');
    addKV('Authentication', `${riskScore.authentication}/5`);
    addKV('Data Protection', `${riskScore.dataProtection}/5`);
    addKV('Network Security', `${riskScore.networkSecurity}/5`);
    addKV('Compliance', `${riskScore.compliance}/5`);
    addKV('Calculated Overall', calculateOverallRisk().level);

    const done = checklist.filter((i) => i.completed).length;
    const pct = Math.round((done / checklist.length) * 100);
    addH2('Compliance Checklist Progress');
    addKV('Completion', `${done}/${checklist.length} (${pct}%)`);
    addParagraph(
      'Checklist progress reflects preparation level. For an audit-ready posture, each completed item should be supported with evidence (documents, configurations, logs, tickets).'
    );
    checklist.forEach((item) => addBullet(`${item.completed ? '[Done]' : '[Pending]'} ${item.text}`));

    addH2('Key Findings (Grouped by Domain)');
    if (findings.length === 0) {
      addParagraph(
        'No major gaps were detected based on the provided inputs. Consider validating with a technical assessment to confirm.'
      );
    } else {
      (Object.keys(groupedFindings) as FindingDomain[]).forEach((domain) => {
        const list = groupedFindings[domain];
        if (!list || list.length === 0) return;

        ensureSpace(40);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(...brandNavy);
        doc.text(domain, margin, y);
        doc.setTextColor(0);
        y += 14;

        list.forEach((finding) => {
          ensureSpace(140);

          const sevFill: Record<FindingSeverity, [number, number, number]> = {
            'P0-Critical': [255, 224, 224],
            'P1-High': [255, 238, 214],
            'P2-Medium': [255, 247, 214],
            'P3-Low': [232, 245, 255],
          };

          doc.setFillColor(255, 255, 255);
          doc.setDrawColor(230);
          doc.roundedRect(margin, y, pageWidth - margin * 2, 96, 12, 12, 'FD');

          addPill(margin + 14, y + 12, finding.severity, sevFill[finding.severity]);

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(11);
          doc.setTextColor(...brandNavy);
          const titleLines = doc.splitTextToSize(finding.title, pageWidth - margin * 2 - 160);
          doc.text(titleLines, margin + 120, y + 26);
          doc.setTextColor(0);

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          doc.setTextColor(70);
          const ratLines = doc.splitTextToSize(
            `Rationale: ${finding.rationale}`,
            pageWidth - margin * 2 - 28
          );
          doc.text(ratLines.slice(0, 2), margin + 14, y + 56);
          doc.setTextColor(0);

          y += 108;

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(10);
          doc.setTextColor(...brandNavy);
          doc.text('Recommendations:', margin, y);
          doc.setTextColor(0);
          y += 14;

          finding.recommendations.slice(0, 3).forEach((r) => addBullet(r));
          addDivider();
        });
      });
    }

    addH2('Remediation Roadmap');
    addParagraph(`Recommended focus: ${roadmap.focus}`);
    roadmap.bullets.forEach((b) => addBullet(b));

    // ===================== CTA PAGE =====================
    addFooter();
    doc.addPage();
    addHeader();

    addH2('Free Advisory & Service Offer');

    ensureSpace(230);
    doc.setFillColor(238, 247, 255);
    doc.setDrawColor(190, 220, 245);
    doc.roundedRect(margin, y, pageWidth - margin * 2, 190, 18, 18, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(...brandNavy);
    doc.text('“Secure today. Stay resilient tomorrow.”', margin + 18, y + 42);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(40);
    const ad1 =
      'If you want a deeper and evidence-based assessment, Evolution CyberLabs can help you validate controls and close the highest-risk gaps fast.';
    doc.text(doc.splitTextToSize(ad1, pageWidth - margin * 2 - 36), margin + 18, y + 70);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...brandBlue);
    doc.text('What we can deliver:', margin + 18, y + 118);
    doc.setTextColor(40);
    doc.setFont('helvetica', 'normal');

    const services = [
      'VAPT for Web / Mobile / APIs (OWASP aligned) with remediation verification',
      'Managed SOC onboarding: detections, SIEM use-cases, and incident playbooks',
      'Cloud security hardening (AWS/Azure) + continuous posture monitoring',
      'Compliance readiness support (policies, controls mapping, evidence collection)',
    ];

    let sy = y + 140;
    services.forEach((s) => {
      const lines = doc.splitTextToSize(`• ${s}`, pageWidth - margin * 2 - 36);
      doc.text(lines, margin + 18, sy);
      sy += lines.length * 14;
    });

    y += 210;

    ensureSpace(90);
    doc.setFillColor(...brandNavy);
    doc.roundedRect(margin, y, pageWidth - margin * 2, 70, 16, 16, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text('FREE 30-minute security consultation', margin + 18, y + 30);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(220, 235, 255);
    doc.text('Book a call to discuss your results and get a prioritized action plan.', margin + 18, y + 52);
    doc.setTextColor(0);

    // Footer all pages
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      addFooter();
    }

    doc.save(`EvolutionCyberLabs-Security-Assessment-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  // ---------------- UI ----------------
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            Interactive Security Resources
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tools to help you assess and improve your security posture
          </p>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
          {/* Tabs */}
          <div className="flex border-b border-border overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[200px] px-6 py-4 text-sm font-medium transition-colors duration-300 flex items-center justify-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <Icon name={tab.icon as any} size={20} />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* ---------------- ASSESSMENT TAB ---------------- */}
            {activeTab === 'assessment' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                    Quick Security Assessment
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Answer these questions to generate a professional, prioritized PDF report
                  </p>
                </div>

                {/* Summary */}
                <div className="bg-muted/30 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Posture Score</div>
                    <div className="text-2xl font-heading font-bold text-foreground">
                      {posture.score}/100
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Posture Tier</div>
                    <div className="text-lg font-heading font-semibold text-foreground">{posture.tier}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Findings</div>
                    <div className="text-lg font-heading font-semibold text-foreground">{findings.length}</div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Q1 */}
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-foreground mb-4">
                      Do you have a documented incident response plan?
                    </h4>
                    <div className="flex space-x-4">
                      {(['Yes', 'No', 'Partial'] as const).map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAssessmentUpdate('incidentPlan', option)}
                          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${getOptionClass(
                            assessmentAnswers.incidentPlan === option
                          )}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q2 */}
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-foreground mb-4">
                      How often do you conduct security testing (VAPT / scanning)?
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {(['Monthly', 'Quarterly', 'Annually', 'Never'] as const).map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAssessmentUpdate('testingFreq', option)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${getOptionClass(
                            assessmentAnswers.testingFreq === option
                          )}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q3 */}
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-foreground mb-4">
                      Is your data encrypted at rest and in transit?
                    </h4>
                    <div className="flex space-x-4">
                      {(['Both', 'Transit Only', 'Neither'] as const).map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAssessmentUpdate('encryption', option)}
                          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${getOptionClass(
                            assessmentAnswers.encryption === option
                          )}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q4 MFA */}
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-foreground mb-4">
                      MFA enforcement for email/SSO/admin access?
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {(['All Users', 'Privileged Only', 'No MFA'] as const).map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAssessmentUpdate('mfa', option)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${getOptionClass(
                            assessmentAnswers.mfa === option
                          )}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q5 Patching */}
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-foreground mb-4">
                      Patch management approach?
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {(['Automated', 'Monthly', 'Ad-hoc', 'Unknown'] as const).map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAssessmentUpdate('patching', option)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${getOptionClass(
                            assessmentAnswers.patching === option
                          )}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q6 Backups (FIXED TYPO HERE ✅) */}
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-foreground mb-4">
                      Backup cadence & restore testing?
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {(['Daily + Tested', 'Daily', 'Weekly', 'No Backups'] as const).map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAssessmentUpdate('backups', option)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${getOptionClass(
                            assessmentAnswers.backups === option
                          )}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q7 EDR */}
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-foreground mb-4">
                      Endpoint Detection & Response (EDR) coverage?
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {(['Org-wide', 'Partial', 'None'] as const).map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAssessmentUpdate('edr', option)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${getOptionClass(
                            assessmentAnswers.edr === option
                          )}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q8 Logging */}
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-foreground mb-4">
                      Logging & monitoring maturity?
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {(['Central SIEM', 'Basic Logs', 'Minimal'] as const).map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAssessmentUpdate('logging', option)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${getOptionClass(
                            assessmentAnswers.logging === option
                          )}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q9 Access Reviews */}
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-foreground mb-4">
                      How often are access reviews performed?
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {(['Quarterly', 'Annually', 'Never'] as const).map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAssessmentUpdate('accessReviews', option)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${getOptionClass(
                            assessmentAnswers.accessReviews === option
                          )}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q10 Vendor risk */}
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-foreground mb-4">
                      Third-party/vendor security risk assessment?
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {(['Assessed', 'Somewhat', 'Not Assessed'] as const).map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAssessmentUpdate('vendorRisk', option)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${getOptionClass(
                            assessmentAnswers.vendorRisk === option
                          )}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q11 Awareness */}
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-foreground mb-4">
                      Security awareness training frequency?
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {(['Quarterly', 'Annually', 'Never'] as const).map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAssessmentUpdate('awareness', option)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${getOptionClass(
                            assessmentAnswers.awareness === option
                          )}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q12 Data classification */}
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-foreground mb-4">
                      Data classification & handling rules?
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {(['Implemented', 'Partial', 'Not Implemented'] as const).map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAssessmentUpdate('dataClassification', option)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${getOptionClass(
                            assessmentAnswers.dataClassification === option
                          )}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <button
                    onClick={() => generateAssessmentPdf()}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
                  >
                    Get Full Assessment Report (PDF)
                  </button>
                  <p className="text-xs text-muted-foreground mt-3">
                    Includes cover page, severity legend, grouped findings, and a free advisory / CTA page.
                  </p>
                </div>
              </div>
            )}

            {/* ---------------- CHECKLIST TAB ---------------- */}
            {activeTab === 'checklist' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-1">
                      Pre-Audit Compliance Checklist
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Complete these items before your security audit
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-heading font-bold text-foreground">
                      {completedCount}/{checklist.length}
                    </div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Progress</span>
                    <span className="text-sm font-medium text-primary">{completionPercentage.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-colors duration-300 cursor-pointer select-none"
                      onClick={() => toggleChecklistItem(item.id)}
                    >
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          item.completed ? 'bg-success border-success' : 'border-muted-foreground'
                        }`}
                      >
                        {item.completed && <Icon name="CheckIcon" size={16} className="text-white" />}
                      </div>
                      <span
                        className={`text-sm flex-1 transition-all duration-300 ${
                          item.completed ? 'text-muted-foreground line-through' : 'text-foreground'
                        }`}
                      >
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------- CALCULATOR TAB ---------------- */}
            {activeTab === 'calculator' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                    Security Risk Calculator
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Rate your security posture across key areas (1 = Low Risk, 5 = High Risk)
                  </p>
                </div>

                <div className="space-y-6">
                  {Object.entries(riskScore).map(([category, value]) => (
                    <div key={category} className="bg-muted/30 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-medium text-foreground capitalize">
                          {category.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <span className="text-lg font-heading font-bold text-foreground">{value}/5</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={value}
                        onChange={(e) =>
                          handleRiskChange(category as keyof typeof riskScore, parseInt(e.target.value, 10))
                        }
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>Low Risk</span>
                        <span>High Risk</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className={`${calculateOverallRisk().bg} rounded-lg p-6 text-center mt-8 transition-colors duration-500`}
                >
                  <div className="text-sm font-medium text-muted-foreground mb-2">Overall Risk Level</div>
                  <div
                    className={`text-4xl font-heading font-bold transition-colors duration-500 ${calculateOverallRisk().color}`}
                  >
                    {calculateOverallRisk().level}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Based on your ratings, we recommend a comprehensive security assessment
                  </p>
                </div>

                <div className="mt-8 text-center">
                  <button
                    onClick={() => alert('Risk Assessment Scheduled! (Demo)')}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
                  >
                    Schedule Risk Assessment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveResources;
