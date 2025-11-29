import './BottomNav.css';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface BottomNavProps {
  activeId: string;
  items: NavItem[];
  onNavigate?: (id: string) => void;
}

export function BottomNav({ activeId, items, onNavigate }: BottomNavProps) {
  return (
    <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate?.(item.id)}
            className={`bottom-nav-item ${isActive ? 'bottom-nav-item-active' : ''}`}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <div className="bottom-nav-icon" aria-hidden="true">{item.icon}</div>
            <span className="bottom-nav-label" aria-hidden="true">{item.label}</span>
            {isActive && <div className="bottom-nav-indicator" aria-hidden="true"></div>}
          </button>
        );
      })}
    </nav>
  );
}

