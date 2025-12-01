import './ActionGrid.css';

export interface ActionItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  isPrimary?: boolean;
}

interface ActionGridProps {
  actions: ActionItem[];
}

export function ActionGrid({ actions }: ActionGridProps) {
  const primaryAction = actions.find((a) => a.isPrimary);
  const otherActions = actions.filter((a) => !a.isPrimary);

  return (
    <section className="action-grid" aria-label="Quick actions">
      {primaryAction && (
        <button
          onClick={primaryAction.onClick}
          className="action-item action-item-primary"
          aria-label={primaryAction.label}
        >
          <div className="action-icon">{primaryAction.icon}</div>
          <span className="action-label">{primaryAction.label}</span>
        </button>
      )}
      <div className="action-grid-secondary">
        {otherActions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className="action-item"
            aria-label={action.label}
          >
            <div className="action-icon">{action.icon}</div>
            <span className="action-label">{action.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}


