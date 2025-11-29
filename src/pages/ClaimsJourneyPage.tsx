import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { TopNav } from '../components/TopNav';
import { Toast } from '../components/Toast';
import './ClaimsJourneyPage.css';

interface ClaimFormData {
  incidentType: string;
  date: string;
  time: string;
  location: string;
  description: string;
  otherParties: string;
  damageDescription: string;
  photosUploaded: boolean;
}

const STEPS = [
  { id: 'incident', label: 'What happened?', number: 1 },
  { id: 'when', label: 'When did it happen?', number: 2 },
  { id: 'where', label: 'Where did it happen?', number: 3 },
  { id: 'details', label: 'Tell us more', number: 4 },
  { id: 'review', label: 'Review', number: 5 },
];

export function ClaimsJourneyPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ClaimFormData>({
    incidentType: '',
    date: '',
    time: '',
    location: '',
    description: '',
    otherParties: '',
    damageDescription: '',
    photosUploaded: false,
  });
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const updateFormData = (field: keyof ClaimFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    showToast('Claim submitted successfully!');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.incidentType !== '';
      case 1:
        return formData.date !== '' && formData.time !== '';
      case 2:
        return formData.location !== '';
      case 3:
        return formData.description !== '';
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="claims-step-content">
            <p className="claims-step-intro">
              Select the type of incident that best describes what happened.
            </p>
            <div className="claims-options">
              {[
                { id: 'accident', label: 'Road traffic accident', icon: '🚗' },
                { id: 'theft', label: 'Theft or attempted theft', icon: '🔒' },
                { id: 'vandalism', label: 'Vandalism', icon: '💥' },
                { id: 'fire', label: 'Fire damage', icon: '🔥' },
                { id: 'weather', label: 'Weather damage', icon: '🌧️' },
                { id: 'other', label: 'Other', icon: '📋' },
              ].map((option) => (
                <button
                  key={option.id}
                  className={`claims-option ${formData.incidentType === option.id ? 'claims-option-selected' : ''}`}
                  onClick={() => updateFormData('incidentType', option.id)}
                >
                  <span className="claims-option-icon">{option.icon}</span>
                  <span className="claims-option-label">{option.label}</span>
                  {formData.incidentType === option.id && (
                    <CheckIcon width={20} height={20} />
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="claims-step-content">
            <p className="claims-step-intro">
              When did the incident occur?
            </p>
            <div className="claims-form-group">
              <label htmlFor="date" className="claims-label">
                Date
              </label>
              <input
                id="date"
                type="date"
                className="claims-input"
                value={formData.date}
                onChange={(e) => updateFormData('date', e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="claims-form-group">
              <label htmlFor="time" className="claims-label">
                Time (approximate)
              </label>
              <input
                id="time"
                type="time"
                className="claims-input"
                value={formData.time}
                onChange={(e) => updateFormData('time', e.target.value)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="claims-step-content">
            <p className="claims-step-intro">
              Where did the incident occur?
            </p>
            <div className="claims-form-group">
              <label htmlFor="location" className="claims-label">
                Location
              </label>
              <input
                id="location"
                type="text"
                className="claims-input"
                placeholder="Enter address or postcode"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
              />
            </div>
            <div className="claims-form-group">
              <label htmlFor="otherParties" className="claims-label">
                Were other parties involved? (Optional)
              </label>
              <textarea
                id="otherParties"
                className="claims-textarea"
                placeholder="If other vehicles or people were involved, provide details here"
                value={formData.otherParties}
                onChange={(e) => updateFormData('otherParties', e.target.value)}
                rows={4}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="claims-step-content">
            <p className="claims-step-intro">
              Please provide more details about what happened.
            </p>
            <div className="claims-form-group">
              <label htmlFor="description" className="claims-label">
                Description of the incident
              </label>
              <textarea
                id="description"
                className="claims-textarea"
                placeholder="Describe what happened in as much detail as possible"
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                rows={6}
              />
            </div>
            <div className="claims-form-group">
              <label htmlFor="damageDescription" className="claims-label">
                Damage description (Optional)
              </label>
              <textarea
                id="damageDescription"
                className="claims-textarea"
                placeholder="Describe any damage to your vehicle or property"
                value={formData.damageDescription}
                onChange={(e) => updateFormData('damageDescription', e.target.value)}
                rows={4}
              />
            </div>
            <div className="claims-form-group">
              <button
                className={`claims-upload-button ${formData.photosUploaded ? 'claims-upload-button-uploaded' : ''}`}
                onClick={() => {
                  updateFormData('photosUploaded', true);
                  showToast('Photos uploaded (simulated)');
                }}
              >
                <ArrowUpTrayIcon width={20} height={20} />
                {formData.photosUploaded ? 'Photos uploaded' : 'Upload photos (optional)'}
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="claims-step-content">
            <p className="claims-step-intro">
              Please review your claim details before submitting.
            </p>
            <div className="claims-review">
              <div className="claims-review-section">
                <h3 className="claims-review-title">Incident type</h3>
                <p className="claims-review-value">
                  {[
                    { id: 'accident', label: 'Road traffic accident' },
                    { id: 'theft', label: 'Theft or attempted theft' },
                    { id: 'vandalism', label: 'Vandalism' },
                    { id: 'fire', label: 'Fire damage' },
                    { id: 'weather', label: 'Weather damage' },
                    { id: 'other', label: 'Other' },
                  ].find((opt) => opt.id === formData.incidentType)?.label || 'Not specified'}
                </p>
              </div>
              <div className="claims-review-section">
                <h3 className="claims-review-title">Date & time</h3>
                <p className="claims-review-value">
                  {formData.date ? new Date(formData.date).toLocaleDateString('en-GB') : 'Not specified'} at{' '}
                  {formData.time || 'Not specified'}
                </p>
              </div>
              <div className="claims-review-section">
                <h3 className="claims-review-title">Location</h3>
                <p className="claims-review-value">{formData.location || 'Not specified'}</p>
              </div>
              {formData.otherParties && (
                <div className="claims-review-section">
                  <h3 className="claims-review-title">Other parties</h3>
                  <p className="claims-review-value">{formData.otherParties}</p>
                </div>
              )}
              <div className="claims-review-section">
                <h3 className="claims-review-title">Description</h3>
                <p className="claims-review-value">{formData.description || 'Not specified'}</p>
              </div>
              {formData.damageDescription && (
                <div className="claims-review-section">
                  <h3 className="claims-review-title">Damage</h3>
                  <p className="claims-review-value">{formData.damageDescription}</p>
                </div>
              )}
              {formData.photosUploaded && (
                <div className="claims-review-section">
                  <h3 className="claims-review-title">Photos</h3>
                  <p className="claims-review-value">Uploaded</p>
                </div>
              )}
            </div>
            <div className="claims-review-actions">
              <button
                className="claims-edit-button"
                onClick={() => setCurrentStep(0)}
              >
                Edit details
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <TopNav
        title="Make a claim"
        onBack={handleBack}
        onHelp={() => showToast('Help: Call 0800 123 4567 for assistance')}
      />
      <main className="claims-journey-page">
        <div 
          className="claims-progress"
          role="progressbar"
          aria-valuenow={currentStep + 1}
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-label={`Claim form progress: step ${currentStep + 1} of ${STEPS.length}`}
        >
          <div className="claims-progress-bar">
            <div
              className="claims-progress-fill"
              style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
              aria-hidden="true"
            />
          </div>
          <div className="claims-progress-steps" role="list" aria-label="Claim form steps">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`claims-progress-step ${index <= currentStep ? 'claims-progress-step-active' : ''} ${index === currentStep ? 'claims-progress-step-current' : ''}`}
                role="listitem"
              >
                <div className="claims-progress-step-number" aria-hidden="true">{step.number}</div>
                <span className="claims-progress-step-label" aria-label={`Step ${step.number}: ${step.label}`}>{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="claims-content">
          <h2 className="claims-step-title" id={`step-${currentStep}-title`}>{STEPS[currentStep].label}</h2>
          <div role="region" aria-labelledby={`step-${currentStep}-title`}>
            {renderStepContent()}
          </div>
        </div>

        <div className="claims-actions">
          {currentStep < STEPS.length - 1 ? (
            <>
              <button
                className="claims-button-secondary"
                onClick={handleBack}
              >
                {currentStep === 0 ? 'Cancel' : 'Back'}
              </button>
              <button
                className="claims-button-primary"
                onClick={handleNext}
                disabled={!canProceed()}
              >
                Continue
              </button>
            </>
          ) : (
            <>
              <button
                className="claims-button-secondary"
                onClick={handleBack}
              >
                Back
              </button>
              <button
                className="claims-button-primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit claim'}
              </button>
            </>
          )}
        </div>
      </main>

      <Toast
        message={toastMessage}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
        type="info"
      />
    </>
  );
}

