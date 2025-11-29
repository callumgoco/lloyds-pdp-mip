import { ChevronRightIcon } from '@heroicons/react/24/outline';
import './SupportStrip.css';

export interface SupportItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface SupportStripProps {
  items: SupportItem[];
  title?: string;
}

export function SupportStrip({ items, title }: SupportStripProps) {
  return (
    <section className="support-strip" aria-labelledby={title ? 'support-strip-title' : undefined}>
      {title && (
        <h3 id="support-strip-title" className="support-strip-title">
          {title}
        </h3>
      )}
      <div className="support-strip-grid">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            className="support-item"
            aria-label={item.label}
          >
            <div className="support-icon">{item.icon}</div>
            <div className="support-content">
              <span className="support-label">{item.label}</span>
              {item.description && (
                <span className="support-description">{item.description}</span>
              )}
            </div>
            <ChevronRightIcon
              className="support-arrow"
              width={20}
              height={20}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </section>
  );
}

