
export interface JudgeInsights {
  criteria: Criteria[];
  trends: Trend[];
  preparationTips: Tip[];
}

export type Criteria = {
  name: string;
  description: string;
  importance: string;
};

export type Trend = {
  title: string;
  description: string;
};

export type Tip = {
  title: string;
  description: string;
};
