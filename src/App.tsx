import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import HowItWorks from './pages/HowItWorks';
import ContractBuilder from './pages/ContractBuilder';
import Templates from './pages/Templates';
import Deployments from './pages/Deployments';
import Marketplace from './pages/Marketplace';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/builder" element={<ContractBuilder />} />
        <Route path="/builder/:templateId" element={<ContractBuilder />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/deployments" element={<Deployments />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}

export default App;
