export interface CardProps {
  image?: any | null;
  alt?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}
