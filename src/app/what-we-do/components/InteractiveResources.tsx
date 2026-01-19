'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

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

// Interface for the new Assessment State
interface AssessmentState {
  incidentPlan: 'Yes' | 'No' | 'Partial' | null;
  testingFreq: 'Monthly' | 'Quarterly' | 'Annually' | 'Never' | null;
  encryption: 'Both' | 'Transit Only' | 'Neither' | null;
}

const InteractiveResources = () => {
  const [activeTab, setActiveTab] = useState<string>('assessment');

  // 1. NEW: State to track Assessment selections
  const [assessmentAnswers, setAssessmentAnswers] = useState<AssessmentState>({
    incidentPlan: null,
    testingFreq: null,
    encryption: null,
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
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleRiskChange = (category: keyof typeof riskScore, value: number) => {
    setRiskScore((prev) => ({ ...prev, [category]: value }));
  };

  // 2. NEW: Handler for Assessment updates
  const handleAssessmentUpdate = (key: keyof AssessmentState, value: any) => {
    setAssessmentAnswers(prev => ({ ...prev, [key]: value }));
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

  // Helper function to get button styles based on selection
  const getOptionClass = (isSelected: boolean) => {
    return isSelected
      ? 'bg-primary text-primary-foreground shadow-md'
      : 'bg-muted text-foreground hover:bg-muted/80';
  };

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
          {/* Tab Navigation */}
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
                    Answer these questions to get a preliminary security evaluation
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Question 1 */}
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-foreground mb-4">
                      Do you have a documented incident response plan?
                    </h4>
                    <div className="flex space-x-4">
                      {['Yes', 'No', 'Partial'].map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAssessmentUpdate('incidentPlan', option)}
                          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${getOptionClass(assessmentAnswers.incidentPlan === option)}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question 2 */}
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-foreground mb-4">
                      How often do you conduct security testing?
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {['Monthly', 'Quarterly', 'Annually', 'Never'].map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAssessmentUpdate('testingFreq', option)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${getOptionClass(assessmentAnswers.testingFreq === option)}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question 3 */}
                  <div className="bg-muted/30 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-foreground mb-4">
                      Is your data encrypted at rest and in transit?
                    </h4>
                    <div className="flex space-x-4">
                      {['Both', 'Transit Only', 'Neither'].map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAssessmentUpdate('encryption', option)}
                          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${getOptionClass(assessmentAnswers.encryption === option)}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <button 
                    onClick={() => alert("Assessment Report Generated! (This is a demo action)")}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
                  >
                    Get Full Assessment Report
                  </button>
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
                    <span className="text-sm font-medium text-primary">
                      {completionPercentage.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
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
                          item.completed
                            ? 'bg-success border-success'
                            : 'border-muted-foreground'
                        }`}
                      >
                        {item.completed && (
                          <Icon name="CheckIcon" size={16} className="text-white" />
                        )}
                      </div>
                      <span
                        className={`text-sm flex-1 transition-all duration-300 ${
                          item.completed
                            ? 'text-muted-foreground line-through'
                            : 'text-foreground'
                        }`}
                      >
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <button 
                    onClick={() => alert("Checklist Downloaded! (This is a demo action)")}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
                  >
                    Download Full Checklist
                  </button>
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
                        <span className="text-lg font-heading font-bold text-foreground">
                          {value}/5
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={value}
                        onChange={(e) =>
                          handleRiskChange(
                            category as keyof typeof riskScore,
                            parseInt(e.target.value)
                          )
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
                  className={`${
                    calculateOverallRisk().bg
                  } rounded-lg p-6 text-center mt-8 transition-colors duration-500`}
                >
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    Overall Risk Level
                  </div>
                  <div
                    className={`text-4xl font-heading font-bold transition-colors duration-500 ${
                      calculateOverallRisk().color
                    }`}
                  >
                    {calculateOverallRisk().level}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Based on your ratings, we recommend a comprehensive security assessment
                  </p>
                </div>

                <div className="mt-8 text-center">
                  <button 
                     onClick={() => alert("Risk Assessment Scheduled! (This is a demo action)")}
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