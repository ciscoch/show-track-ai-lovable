
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAppContext } from '@/contexts/AppContext';

const JudgeTrendAnalysis = () => {
  const navigate = useNavigate();

  // Mock data for demonstration
  const trends = [
    { trait: 'Muscle', insight: 'Judges are favoring animals with more pronounced muscle definition.' },
    { trait: 'Structure', insight: 'Sound structure is critical; animals with structural flaws are penalized.' },
    { trait: 'Balance', insight: 'Animals need to exhibit overall balance and eye appeal.' },
  ];

  const { userSubscription } = useAppContext();

  // Fix subscription level check
  const isProOrElite = userSubscription && (userSubscription.level === 'pro' || userSubscription.level === 'elite');

  if (!isProOrElite) {
    return (
      <div className="p-6 border rounded-lg bg-muted/30">
        <h3 className="text-lg font-semibold mb-2">Judge Trend Analysis</h3>
        <p className="text-muted-foreground mb-4">
          Get insights into judging trends and preferences to improve your show strategy.
        </p>
        <Button onClick={() => navigate('/subscription')}>
          Upgrade to Pro or Elite
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-lg bg-muted/30">
      <h3 className="text-lg font-semibold mb-4">Judge Trend Analysis</h3>
      {trends.map((trend, index) => (
        <div key={index} className="mb-4">
          <h4 className="font-semibold">{trend.trait}</h4>
          <p className="text-muted-foreground">{trend.insight}</p>
        </div>
      ))}
    </div>
  );
};

export default JudgeTrendAnalysis;
