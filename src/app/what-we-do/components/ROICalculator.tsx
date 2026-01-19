'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface CalculatorInputs {
  employees: number;
  revenue: number;
  incidents: number;
}

interface ROIResults {
  potentialLoss: number;
  securityInvestment: number;
  roi: number;
  breakEven: number;
}

const ROICalculator = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [inputs, setInputs] = useState<CalculatorInputs>({
    employees: 100,
    revenue: 1000000,
    incidents: 2,
  });
  const [results, setResults] = useState<ROIResults>({
    potentialLoss: 0,
    securityInvestment: 0,
    roi: 0,
    breakEven: 0,
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const avgIncidentCost = 150000;
    const potentialLoss = inputs.incidents * avgIncidentCost;
    const securityInvestment = Math.min(inputs.revenue * 0.05, 250000);
    const roi = ((potentialLoss - securityInvestment) / securityInvestment) * 100;
    const breakEven = securityInvestment / (potentialLoss / 12);

    setResults({
      potentialLoss,
      securityInvestment,
      roi: Math.max(roi, 0),
      breakEven: Math.max(breakEven, 0),
    });
  }, [inputs, isHydrated]);

  const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
    const numValue = parseInt(value) || 0;
    setInputs((prev) => ({ ...prev, [field]: numValue }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (!isHydrated) {
    return (
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-xl border border-border p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            Security Investment ROI Calculator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate the potential return on investment for your cybersecurity initiatives
          </p>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div className="space-y-6">
              <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                Your Business Metrics
              </h3>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Number of Employees
                </label>
                <input
                  type="number"
                  value={inputs.employees}
                  onChange={(e) => handleInputChange('employees', e.target.value)}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Annual Revenue (USD)
                </label>
                <input
                  type="number"
                  value={inputs.revenue}
                  onChange={(e) => handleInputChange('revenue', e.target.value)}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  min="0"
                  step="100000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Expected Security Incidents/Year
                </label>
                <input
                  type="number"
                  value={inputs.incidents}
                  onChange={(e) => handleInputChange('incidents', e.target.value)}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  min="0"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                Projected Results
              </h3>

              <div className="bg-destructive/10 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="ExclamationTriangleIcon" size={20} className="text-destructive" />
                  <span className="text-sm font-medium text-destructive">Potential Loss</span>
                </div>
                <p className="text-3xl font-heading font-bold text-foreground">
                  {formatCurrency(results.potentialLoss)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Without security measures
                </p>
              </div>

              <div className="bg-primary/10 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="ShieldCheckIcon" size={20} className="text-primary" />
                  <span className="text-sm font-medium text-primary">Security Investment</span>
                </div>
                <p className="text-3xl font-heading font-bold text-foreground">
                  {formatCurrency(results.securityInvestment)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended annual budget
                </p>
              </div>

              <div className="bg-success/10 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="ChartBarIcon" size={20} className="text-success" />
                  <span className="text-sm font-medium text-success">Return on Investment</span>
                </div>
                <p className="text-3xl font-heading font-bold text-foreground">
                  {results.roi.toFixed(0)}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Break-even in {results.breakEven.toFixed(1)} months
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 px-8 py-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              * Calculations based on industry averages. Actual costs may vary based on specific business needs and threat landscape.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;