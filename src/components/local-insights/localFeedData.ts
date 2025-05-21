export type LocalInsight = {
  judge: string;
  show: string;
  insight: string;
};

export const localFeedData: Record<string, LocalInsight[]> = {
  Texas: [
    {
      judge: 'Sam Hill',
      show: 'Houston Livestock Show',
      insight: 'Local judges prioritize structural correctness with strong top lines.'
    },
    {
      judge: 'Lana Greene',
      show: 'Fort Worth Stock Show',
      insight: 'Moderate frame size with ample muscle is rewarded.'
    },
    {
      judge: 'Rick Alvarez',
      show: 'State Fair of Texas',
      insight: 'Clean fronts and bold rib shape stand out in the ring.'
    },
    {
      judge: 'Tina Rogers',
      show: 'San Antonio Stock Show',
      insight: 'Sound feet and legs are a must for top placings.'
    }
  ],
  Ohio: [
    {
      judge: 'Michael Brown',
      show: 'Ohio State Fair',
      insight: 'Balance and conditioning are heavily weighted by local judges.'
    },
    {
      judge: 'Karen Lee',
      show: 'Springfield Jackpot',
      insight: 'Strong toplines with clean hocks are favored.'
    },
    {
      judge: 'Paul Sparks',
      show: 'Buckeye Classic',
      insight: 'Judges look for width through the chest combined with style.'
    }
  ],
  default: [
    {
      judge: 'Local Expert',
      show: 'County Fair',
      insight: 'Focus on overall balance and soundness when presenting your animal.'
    },
    {
      judge: 'Regional Judge',
      show: 'Tri-County Show',
      insight: 'Presentation and grooming can impact final decisions significantly.'
    }
  ]
};
