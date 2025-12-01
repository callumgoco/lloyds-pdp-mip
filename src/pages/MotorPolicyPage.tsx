import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  QuestionMarkCircleIcon,
  WrenchScrewdriverIcon,
  WindowIcon,
  ChevronRightIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { motorPolicy, CoverSection, Limit } from '../data/policy';
import { TopNav } from '../components/TopNav';
import { PolicySummaryCard } from '../components/PolicySummaryCard';
import { ActionGrid, ActionItem } from '../components/ActionGrid';
import { TabbedContent, Tab } from '../components/TabbedContent';
import { Accordion } from '../components/Accordion';
import { SupportStrip, SupportItem } from '../components/SupportStrip';
import { EmergencyStrip } from '../components/EmergencyStrip';
import { Modal } from '../components/Modal';
import { Toast } from '../components/Toast';
import './MotorPolicyPage.css';

export function MotorPolicyPage() {
  const navigate = useNavigate();
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [documentsModalOpen, setDocumentsModalOpen] = useState(false);
  const [updateDetailsModalOpen, setUpdateDetailsModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [faqsExpanded, setFaqsExpanded] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const handleMakeClaim = () => {
    setClaimModalOpen(true);
  };

  const handleStartClaim = () => {
    setClaimModalOpen(false);
    navigate('/claims');
  };

  const handleCallClaims = () => {
    setClaimModalOpen(false);
    alert('Calling claims line…');
  };

  const handleViewDocuments = () => {
    setDocumentsModalOpen(true);
  };

  const handleViewDocument = (docName: string) => {
    showToast(`Opening ${docName}...`);
  };

  const handleUpdateDetails = () => {
    setUpdateDetailsModalOpen(true);
  };

  const handleGetHelp = () => {
    setHelpModalOpen(true);
  };

  const handleCopyPolicyNumber = () => {
    navigator.clipboard.writeText(motorPolicy.id);
    showToast('Policy number copied to clipboard');
  };

  const actionItems: ActionItem[] = [
    {
      id: 'make-claim',
      label: 'Make a claim',
      icon: <ClipboardDocumentCheckIcon width={24} height={24} />,
      onClick: handleMakeClaim,
      isPrimary: true,
    },
    {
      id: 'view-documents',
      label: 'View documents',
      icon: <DocumentTextIcon width={20} height={20} />,
      onClick: handleViewDocuments,
    },
    {
      id: 'update-details',
      label: 'Update details',
      icon: <PencilSquareIcon width={20} height={20} />,
      onClick: handleUpdateDetails,
    },
    {
      id: 'get-help',
      label: 'Get help',
      icon: <QuestionMarkCircleIcon width={20} height={20} />,
      onClick: handleGetHelp,
    },
  ];

  const documents = [
    {
      name: 'Policy schedule',
      description: 'Your full policy details and terms',
    },
    {
      name: 'Certificate of motor insurance',
      description: 'Proof of insurance for your vehicle',
    },
    {
      name: 'Key Facts',
      description: 'Summary of your cover and important information',
    },
  ];

  const updateOptions = [
    { id: 'change-car', label: 'Change car' },
    { id: 'update-address', label: 'Update address' },
    { id: 'update-drivers', label: 'Update named drivers' },
  ];

  const supportItems: SupportItem[] = [
    {
      id: 'accident',
      label: 'Had an accident?',
      icon: <ClipboardDocumentCheckIcon width={20} height={20} />,
      onClick: handleMakeClaim,
    },
    {
      id: 'breakdown',
      label: 'Breakdown help',
      icon: <WrenchScrewdriverIcon width={20} height={20} />,
      onClick: () => alert('Call roadside assistance: 0800 123 4567'),
    },
    {
      id: 'glass',
      label: 'Glass repair',
      icon: <WindowIcon width={20} height={20} />,
      onClick: () => alert('Connect to approved repairer'),
    },
    {
      id: 'faqs',
      label: 'FAQs',
      icon: <QuestionMarkCircleIcon width={20} height={20} />,
      onClick: () => setFaqsExpanded(!faqsExpanded),
    },
  ];

  const faqs = [
    {
      question: 'How do I make a claim?',
      answer: 'You can start a claim online through this app, or call our 24/7 claims line on 0800 123 4567.',
    },
    {
      question: 'What should I do after an accident?',
      answer: 'Stay safe, exchange details with other parties, take photos if possible, and contact us as soon as you can.',
    },
    {
      question: 'Can I drive abroad with this policy?',
      answer: 'Yes, your comprehensive cover includes driving in EU countries and other specified territories for up to 90 days per trip.',
    },
  ];

  const tabs: Tab[] = [
    {
      id: 'cover',
      label: 'Cover',
      content: (
        <div className="cover-tab">
          <p className="cover-intro">
            Here's what you're covered for. Tap to see details.
          </p>
          <div className="cover-accordions">
            {motorPolicy.coverSections.map((section: CoverSection) => (
              <Accordion
                key={section.id}
                id={section.id}
                title={section.title}
                summary={section.summary}
                statusTag={section.isAddOn ? 'Add-on' : undefined}
              >
                <div className="cover-details">
                  <p className="cover-description">{section.summary}</p>
                  {section.exclusions.length > 0 && (
                    <div className="cover-exclusions">
                      <h4 className="cover-exclusions-title">Key exclusions</h4>
                      <ul className="cover-exclusions-list">
                        {section.exclusions.map((exclusion, idx) => (
                          <li key={idx}>{exclusion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <button
                    className="cover-terms-link"
                    onClick={() => alert('This would show the full terms and conditions')}
                  >
                    See full terms
                  </button>
                </div>
              </Accordion>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'excess',
      label: 'Excess & limits',
      content: (
        <div className="excess-tab">
          <div className="excess-card">
            <div className="excess-item">
              <span className="excess-label">Voluntary excess</span>
              <span className="excess-value">£{motorPolicy.voluntaryExcess}</span>
            </div>
            <div className="excess-item">
              <span className="excess-label">Compulsory excess</span>
              <span className="excess-value">£{motorPolicy.compulsoryExcess}</span>
            </div>
            <div className="excess-item excess-item-total">
              <span className="excess-label">Total excess you'll pay</span>
              <span className="excess-value excess-value-total">
                £{motorPolicy.voluntaryExcess + motorPolicy.compulsoryExcess}
              </span>
            </div>
          </div>
          <div className="limits-section">
            <h3 className="limits-title">Key limits</h3>
            <ul className="limits-list">
              {motorPolicy.limits.map((limit: Limit, idx) => (
                <li key={idx} className="limit-item">
                  <div className="limit-main">
                    <span className="limit-label">{limit.label}</span>
                    <span className="limit-amount">{limit.amount}</span>
                  </div>
                  <span className="limit-per">{limit.per}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'support',
      label: 'Support',
      content: (
        <div className="support-tab">
          <SupportStrip items={supportItems} />
          {faqsExpanded && (
            <div className="faqs-section">
              <h3 className="faqs-title">Frequently asked questions</h3>
              <ul className="faqs-list">
                {faqs.map((faq, idx) => (
                  <li key={idx} className="faq-item">
                    <h4 className="faq-question">{faq.question}</h4>
                    <p className="faq-answer">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="support-actions">
            <button className="support-button-primary">
              Message us 24/7
            </button>
            <div className="support-links">
              <button
                className="support-link"
                onClick={() => alert('Accessibility options')}
              >
                Accessibility options
              </button>
              <button
                className="support-link"
                onClick={() => alert('Make a complaint')}
              >
                Make a complaint
              </button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <TopNav
        title="Motor insurance"
        onBack={() => showToast('Navigate back')}
        onHelp={handleGetHelp}
      />
      <main className="motor-policy-page">
        <section className="motor-policy-section" aria-labelledby="motor-policy-summary-heading">
          <h2 id="motor-policy-summary-heading" className="motor-policy-section-title">
            Your policy
          </h2>
          <PolicySummaryCard
            policy={motorPolicy}
            onCopyPolicyNumber={handleCopyPolicyNumber}
          />
        </section>

        <section className="motor-policy-section" aria-labelledby="motor-actions-heading">
          <h2 id="motor-actions-heading" className="motor-policy-section-title">
            What would you like to do?
          </h2>
          <ActionGrid actions={actionItems} />
        </section>

        <section className="motor-policy-section" aria-labelledby="motor-cover-heading">
          <h2 id="motor-cover-heading" className="motor-policy-section-title">
            Your cover &amp; support
          </h2>
          <TabbedContent tabs={tabs} defaultTabId="cover" />
        </section>

        {/*
        <section className="motor-policy-section" aria-labelledby="motor-emergency-heading">
          <h2 id="motor-emergency-heading" className="motor-policy-section-title">
            In an emergency
          </h2>
          <EmergencyStrip
            phoneNumber="0800 123 4567"
            onCall={() => alert('Calling 24/7 claims line…')}
          />
        </section>
        */}
      </main>

      {/* Modals */}
      <Modal
        isOpen={claimModalOpen}
        onClose={() => setClaimModalOpen(false)}
        title="Make a claim"
      >
        <div className="claim-modal-content">
          <p>We'll guide you through what happened and help you get back on the road.</p>
          <div className="claim-modal-actions">
            <button
              className="claim-button-primary"
              onClick={handleStartClaim}
            >
              Start claim
            </button>
            <button
              className="claim-button-secondary"
              onClick={handleCallClaims}
            >
              Call us instead
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={documentsModalOpen}
        onClose={() => setDocumentsModalOpen(false)}
        title="Your documents"
      >
        <div className="documents-modal-content">
          <ul className="documents-list">
            {documents.map((doc, idx) => (
              <li key={idx} className="document-item">
                <div className="document-info">
                  <h4 className="document-name">{doc.name}</h4>
                  <p className="document-description">{doc.description}</p>
                </div>
                <button
                  className="document-view-button"
                  onClick={() => handleViewDocument(doc.name)}
                >
                  View
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      <Modal
        isOpen={updateDetailsModalOpen}
        onClose={() => setUpdateDetailsModalOpen(false)}
        title="Update details"
      >
        <div className="update-modal-content">
          <ul className="update-options-list">
            {updateOptions.map((option) => (
              <li key={option.id}>
                <button
                  className="update-option-button"
                  onClick={() => {
                    setUpdateDetailsModalOpen(false);
                    showToast(`This would open ${option.label.toLowerCase()}`);
                  }}
                >
                  {option.label}
                  <ChevronRightIcon width={20} height={20} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      <Modal
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
        title="Get help"
      >
        <div className="help-modal-content">
          <p>Need assistance? We're here to help.</p>
          <div className="help-options">
            <button
              className="help-option-button"
              onClick={() => {
                setHelpModalOpen(false);
                handleMakeClaim();
              }}
            >
              <DocumentTextIcon width={20} height={20} />
              <span>Make a claim</span>
            </button>
            <button
              className="help-option-button"
              onClick={() => {
                setHelpModalOpen(false);
                alert('Call support: 0800 123 4567');
              }}
            >
              <PhoneIcon width={20} height={20} />
              <span>Call us</span>
            </button>
            <button
              className="help-option-button"
              onClick={() => {
                setHelpModalOpen(false);
                showToast('Opening chat...');
              }}
            >
              <ChatBubbleLeftRightIcon width={20} height={20} />
              <span>Chat with us</span>
            </button>
          </div>
        </div>
      </Modal>

      <Toast
        message={toastMessage}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
        type="info"
      />
    </>
  );
}

