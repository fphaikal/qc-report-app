import dynamic from 'next/dynamic';
import Loading from '@/components/Loading';

// Dynamic import untuk FinalInspectionDashboard dengan fallback loading
const TotalQTYNG = dynamic(() => import('@/components/Dashboard/NG/TotalQTYNG'), {
  loading: () => <Loading />,
});

export default function Report() {
  return <TotalQTYNG />;
}
