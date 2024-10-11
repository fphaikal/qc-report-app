import dynamic from 'next/dynamic';
import Loading from '@/components/Loading';

// Dynamic import untuk FinalInspectionDashboard dengan fallback loading
const TypeNG = dynamic(() => import('@/components/Dashboard/NG/TypeNG'), {
  loading: () => <Loading />,
});

export default function Report() {
  return <TypeNG />;
}
