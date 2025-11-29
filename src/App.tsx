import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  HomeIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { MotorPolicyPage } from './pages/MotorPolicyPage';
import { ClaimsJourneyPage } from './pages/ClaimsJourneyPage';
import { BottomNav } from './components/BottomNav';
import './App.css';

function App() {
  const bottomNavItems = [
    {
      id: 'home',
      label: 'Home',
      icon: <HomeIcon width={24} height={24} />,
    },
    {
      id: 'insure',
      label: 'Insure',
      icon: <ShieldCheckIcon width={24} height={24} className="icon-black" />,
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: <CreditCardIcon width={24} height={24} />,
    },
    {
      id: 'search',
      label: 'Search',
      icon: <MagnifyingGlassIcon width={24} height={24} />,
    },
    {
      id: 'more',
      label: 'More',
      icon: <EllipsisVerticalIcon width={24} height={24} />,
    },
  ];

  return (
    <BrowserRouter>
      <div className="device-frame" aria-label="Lloyds Bank Motor Insurance application">
        <Routes>
          <Route path="/" element={<MotorPolicyPage />} />
          <Route path="/claims" element={<ClaimsJourneyPage />} />
        </Routes>
        <BottomNav activeId="insure" items={bottomNavItems} />
      </div>
    </BrowserRouter>
  );
}

export default App;

