import dynamic from 'next/dynamic';
import Loading from '@/components/Loading';

const NGDashboard = dynamic(() => import('@/components/Dashboard/NG/Home'), {
  loading: () => <Loading />,
});

export default function DashboardPage() {
  return <NGDashboard />;
}
