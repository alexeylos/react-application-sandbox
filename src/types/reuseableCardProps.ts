export interface ReusableCardProps {
  title: string;
  value: number;
  delta: number;
  currency: string;
}

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonLink?: string;
}
