import { Card, Skeleton } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex flex-col gap-5 p-5 md:p-10">
      <Skeleton className="rounded-lg">
        <div className="h-14 rounded-lg bg-default-300" />
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-32 rounded-lg bg-default-300" />
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-32 rounded-lg bg-default-300" />
      </Skeleton>

    </div>
  );
}
