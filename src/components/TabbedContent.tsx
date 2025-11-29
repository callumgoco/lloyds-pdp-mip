import { useState, useRef, useEffect, ReactNode } from 'react';
import './TabbedContent.css';

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabbedContentProps {
  tabs: Tab[];
  defaultTabId?: string;
}

export function TabbedContent({ tabs, defaultTabId }: TabbedContentProps) {
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id);
  const tabListRef = useRef<HTMLDivElement>(null);

  const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0];

  // Keyboard navigation for tabs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!tabListRef.current) return;
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

      const currentIndex = tabs.findIndex((tab) => tab.id === activeTabId);
      let newIndex = currentIndex;

      if (e.key === 'ArrowLeft') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
      } else if (e.key === 'ArrowRight') {
        newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
      }

      setActiveTabId(tabs[newIndex].id);
      const newTabButton = tabListRef.current.querySelector(
        `[role="tab"][aria-controls="tabpanel-${tabs[newIndex].id}"]`
      ) as HTMLElement;
      newTabButton?.focus();
    };

    const tabList = tabListRef.current;
    tabList?.addEventListener('keydown', handleKeyDown);

    return () => {
      tabList?.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeTabId, tabs]);

  return (
    <div className="tabbed-content">
      <div
        ref={tabListRef}
        className="tab-list"
        role="tablist"
        aria-label="Policy information tabs"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
              className={`tab-button ${isActive ? 'tab-button-active' : ''}`}
              onClick={() => setActiveTabId(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`tabpanel-${activeTabId}`}
        aria-labelledby={`tab-${activeTabId}`}
        className="tab-panel"
      >
        {activeTab.content}
      </div>
    </div>
  );
}

