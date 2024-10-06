import dynamic from 'next/dynamic';
import Loading from '@/components/Loading';

// Dynamic import untuk FinalInspectionDashboard dengan fallback loading
const IPReport = dynamic(() => import('@/components/Dashboard/IPR/Report'), {
  loading: () => <Loading />,
});

export default function Report() {
  return <IPReport />;
}