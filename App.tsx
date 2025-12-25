
import React, { useState } from 'react';
import Portal from './components/Portal';
import ThaiSangClear from './components/ThaiSangClear';
import SMEPower from './components/SMEPower';

enum View {
  PORTAL = 'PORTAL',
  CLEAR = 'CLEAR',
  SME = 'SME'
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.PORTAL);

  const renderView = () => {
    switch (currentView) {
      case View.CLEAR:
        return <ThaiSangClear onBack={() => setCurrentView(View.PORTAL)} />;
      case View.SME:
        return <SMEPower onBack={() => setCurrentView(View.PORTAL)} />;
      default:
        return (
          <Portal 
            onSelectClear={() => setCurrentView(View.CLEAR)} 
            onSelectSME={() => setCurrentView(View.SME)} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen">
      {renderView()}
    </div>
  );
};

export default App;
