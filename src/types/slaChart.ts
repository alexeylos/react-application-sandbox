export interface IndicatorValue {
  value: number;
  date: string;
  category?: string;
}

export interface Indicator {
  id: string;
  name: string;
  type: string;
  title: string;
  unit: string;
  description: string;
  internal_objective: number;
  external_objective: number;
  values: IndicatorValue[];
}

export interface Agreement {
  id: string;
  name: string;
  indicators: Indicator[];
}
