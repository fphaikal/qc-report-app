import dynamic from 'next/dynamic';
import Loading from '@/components/Loading';

// Dynamic import untuk FinalInspectionDashboard dengan fallback loading
const ChartNG = dynamic(() => import('@/components/Dashboard/NG/ChartNG'), {
  loading: () => <Loading />,
});

export default function Report() {
  return <ChartNG />;
}
