import dynamic from 'next/dynamic';
import Loading from '@/components/Loading';

// Dynamic import untuk FinalInspectionDashboard dengan fallback loading
const PartsData = dynamic(() => import('@/components/Dashboard/Admin/PartsData'), {
  loading: () => <Loading />,
});

export default function Report() {
  return <PartsData />;
}
  