import { ClipboardIcon } from '@heroicons/react/24/outline';
import { MotorPolicy } from '../data/policy';
import './PolicySummaryCard.css';

interface PolicySummaryCardProps {
  policy: MotorPolicy;
  onCopyPolicyNumber?: () => void;
}

export function PolicySummaryCard({ policy, onCopyPolicyNumber }: PolicySummaryCardProps) {
  const renewalDate = new Date(policy.renewalDate);
  const startDate = new Date(policy.startDate);
  const today = new Date();
  const totalDays = Math.ceil((renewalDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysElapsed = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const progress = Math.min(Math.max((daysElapsed / totalDays) * 100, 0), 100);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <section className="policy-summary-card" aria-labelledby="policy-summary-title">
      <div className="policy-summary-header">
        <div className="policy-summary-header-main">
          <h2 id="policy-summary-title" className="sr-only">
            Policy summary
          </h2>
          <div className="policy-vehicle-details" aria-label="Vehicle details">
            <div className="policy-vehicle-detail">
              <span className="policy-vehicle-label">Vehicle model</span>
              <span className="policy-vehicle-value">{policy.vehicle.nickname}</span>
            </div>
            <div className="policy-vehicle-detail">
              <span className="policy-vehicle-label">License plate</span>
              <span className="policy-vehicle-value">{policy.vehicle.registration}</span>
            </div>
          </div>
        </div>
        <div className="policy-summary-header-status">
          <span className="policy-badge policy-badge-status">{policy.status}</span>
        </div>
      </div>

      <div className="policy-summary-dates">
        <div className="policy-date-item">
          <span className="policy-date-label">Renews</span>
          <span className="policy-date-value">{formatDate(renewalDate)}</span>
        </div>
      </div>

      <div className="policy-progress">
        <div className="policy-progress-bar">
          <div
            className="policy-progress-fill"
            style={{ width: `${progress}%` }}
            aria-hidden="true"
          ></div>
        </div>
        <span className="policy-progress-text">
          {Math.ceil((renewalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))} days remaining
        </span>
      </div>

      <div className="policy-summary-meta">
        <div className="policy-meta-cover">
          <span className="policy-badge policy-badge-type">{policy.coverType}</span>
        </div>
        <div className="policy-meta-item">
          <span className="policy-meta-label">Policy number</span>
          <div className="policy-meta-value-group">
            <span className="policy-meta-value">{policy.id}</span>
            <button
              onClick={onCopyPolicyNumber}
              className="policy-copy-button"
              aria-label="Copy policy number"
            >
              <ClipboardIcon width={16} height={16} />
            </button>
          </div>
        </div>
        {policy.protectedNcd && (
          <div className="policy-meta-item">
            <span className="policy-meta-label">Protected No Claims Discount</span>
            <span className="policy-meta-value policy-meta-value-success">Yes</span>
          </div>
        )}
      </div>
    </section>
  );
}

