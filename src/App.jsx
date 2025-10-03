import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { PetRecords } from './components/PetRecords';
import { BehaviorLogs } from './components/BehaviorLogs';
import { Reports } from './components/Reports';
import { SummaryGraphs } from './components/SummaryGraphs';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'pets':
        return <PetRecords onNavigate={setCurrentPage} />;
      case 'logs':
        return <BehaviorLogs />;
      case 'reports':
        return <Reports />;
      case 'graphs':
        return <SummaryGraphs />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div >
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
