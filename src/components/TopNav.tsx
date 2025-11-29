import { ArrowLeftIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import './TopNav.css';

interface TopNavProps {
  onBack?: () => void;
  onHelp?: () => void;
  title: string;
}

export function TopNav({ onBack, onHelp, title }: TopNavProps) {
  return (
    <header className="top-nav">
      <button
        onClick={onBack}
        className="top-nav-button"
        aria-label="Go back"
      >
        <ArrowLeftIcon width={24} height={24} />
      </button>
      <h1 className="top-nav-title">{title}</h1>
      <button
        onClick={onHelp}
        className="top-nav-button"
        aria-label="Get help"
      >
        <QuestionMarkCircleIcon width={24} height={24} />
      </button>
    </header>
  );
}

