import dynamic from 'next/dynamic';
import Loading from '@/components/Loading';

const NCRDashboard = dynamic(() => import('@/components/Dashboard/NCR/Home'), {
  loading: () => <Loading />,
});

export default function DashboardPage() {
  return <NCRDashboard />;
}
