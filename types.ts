
export enum Category {
  LLSX = 'LLSX',
  QHSX = 'QHSX'
}

export interface Factor {
  id: string;
  name: string;
  description: string;
  weight: number;
  category: Category;
  icon: string;
  tooltip: string;
  type?: 'positive' | 'negative';
}

export interface Fact {
  id: number;
  content: string;
  source: string;
}
