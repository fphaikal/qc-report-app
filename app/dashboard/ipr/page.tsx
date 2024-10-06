import dynamic from 'next/dynamic';
import Loading from '@/components/Loading';

const IPRDashboard = dynamic(() => import('@/components/Dashboard/IPR/Home'), {
  loading: () => <Loading />,
});

export default function DashboardPage() {
  return <IPRDashboard />;
}
