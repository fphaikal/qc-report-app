import dynamic from 'next/dynamic';
import Loading from '@/components/Loading';

// Dynamic import untuk FinalInspectionDashboard dengan fallback loading
const FinalInspectionDashboard = dynamic(() => import('@/components/Dashboard/FinalInspection/Home'), {
  loading: () => <Loading />,
});

export default function DashboardPage() {
  return <FinalInspectionDashboard />;
}
