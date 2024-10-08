import dynamic from 'next/dynamic';
import Loading from '@/components/Loading';

// Dynamic import untuk FinalInspectionDashboard dengan fallback loading
const MyReport = dynamic(() => import('@/components/Dashboard/FinalInspection/MyReport'), {
  loading: () => <Loading />,
});

export default function Report() {
  return <MyReport />;
}
