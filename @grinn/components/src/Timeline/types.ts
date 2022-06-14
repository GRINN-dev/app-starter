export interface TimelineProps {
  step: number[];
  steps: {
    icon?: any;
    title: string;
    completed: boolean;
    active: boolean;
  }[];
}
