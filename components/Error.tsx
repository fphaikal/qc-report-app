interface ErrorProps {
    error: string;
  }
  
  export default function Error({ error }: ErrorProps) {
    return <div className="p-10">Error: {error}</div>;
  }
  