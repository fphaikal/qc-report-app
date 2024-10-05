import dynamic from 'next/dynamic';
import Loading from '@/components/Loading';

// Dynamic import untuk FinalInspectionDashboard dengan fallback loading
const NCReport = dynamic(() => import('@/components/Dashboard/NCR/Report'), {
  loading: () => <Loading />,
});

export default function Report() {
  return <NCReport />;
}
