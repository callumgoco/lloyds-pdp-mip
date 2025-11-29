import { PhoneIcon } from '@heroicons/react/24/outline';
import './EmergencyStrip.css';

interface EmergencyStripProps {
  phoneNumber: string;
  onCall?: () => void;
}

export function EmergencyStrip({ phoneNumber, onCall }: EmergencyStripProps) {
  return (
    <div className="emergency-strip" role="banner" aria-label="Emergency contact">
      <div className="emergency-strip-content">
        <PhoneIcon
          className="emergency-icon"
          width={20}
          height={20}
          aria-hidden="true"
        />
        <span className="emergency-text">In an emergency call our 24/7 claims line</span>
        <button
          onClick={onCall}
          className="emergency-button"
          aria-label={`Call ${phoneNumber}`}
        >
          {phoneNumber}
        </button>
      </div>
    </div>
  );
}

