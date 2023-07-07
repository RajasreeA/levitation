// src/components/common/ProgressBar.tsx

import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div>
      Step {currentStep} of {totalSteps}:
      <progress value={progressPercentage} max={100} />
    </div>
  );
};

export default ProgressBar;
