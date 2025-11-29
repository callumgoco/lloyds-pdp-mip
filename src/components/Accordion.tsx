import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import './Accordion.css';

interface AccordionProps {
  id: string;
  title: string;
  summary?: string;
  children: React.ReactNode;
  statusTag?: string;
  defaultOpen?: boolean;
}

export function Accordion({
  id,
  title,
  summary,
  children,
  statusTag,
  defaultOpen = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [contentHeight, setContentHeight] = useState<number | string>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        // Use requestAnimationFrame to ensure DOM has updated
        requestAnimationFrame(() => {
          if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
          }
        });
      } else {
        setContentHeight(0);
      }
    }
  }, [isOpen]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <button
        className="accordion-header"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
        id={`accordion-header-${id}`}
      >
        <div className="accordion-header-content">
          <h3 className="accordion-title">{title}</h3>
          {summary && !isOpen && (
            <p className="accordion-summary">{summary}</p>
          )}
        </div>
        <div className="accordion-header-right">
          {statusTag && (
            <span className="accordion-tag">{statusTag}</span>
          )}
          <ChevronDownIcon
            className={`accordion-icon ${isOpen ? 'accordion-icon-open' : ''}`}
            width={24}
            height={24}
            aria-hidden="true"
          />
        </div>
      </button>
      <div
        id={`accordion-content-${id}`}
        ref={contentRef}
        className="accordion-content"
        style={{ height: contentHeight }}
        aria-labelledby={`accordion-header-${id}`}
        role="region"
      >
        <div className="accordion-content-inner">{children}</div>
      </div>
    </div>
  );
}

