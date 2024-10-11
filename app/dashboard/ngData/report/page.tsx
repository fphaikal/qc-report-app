import dynamic from 'next/dynamic';
import Loading from '@/components/Loading';

// Dynamic import untuk FinalInspectionDashboard dengan fallback loading
const NGReport = dynamic(() => import('@/components/Dashboard/NG/Report'), {
  loading: () => <Loading />,
});

export default function Report() {
  return <NGReport />;
}
