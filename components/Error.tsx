import { CircleAlert } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

interface ErrorProps {
  error: string;
}

export default function Error({ error }: ErrorProps) {
  return (
    <div className="h-fit p-5 w-full">
      <Alert className="flex items-center bg-red-500 text-white">
        <CircleAlert className="w-4 h-4" color="white" />
        <h1>{error}</h1>
      </Alert>
    </div>
  )
}
