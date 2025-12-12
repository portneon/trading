import Dashboard from '@/components/Dashboard';
import { TradingProvider } from '@/context/TradingContext';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <TradingProvider>
        <Dashboard />
      </TradingProvider>
    </div>
  );
}
