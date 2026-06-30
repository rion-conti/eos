import { Skeleton } from "./ui/skeleton";

export default function CustomerSkeleton() {
  return (
    <div className="ml-20 mt-10">
      <div className="flex items-center py-2">
        <div className="space-y-2 mr-4">
          <Skeleton className="h-9  w-50" />
          <Skeleton className="h-9 w-50" />
        </div>
        <div className="space-y-2 mr-4">
          <Skeleton className="h-9 w-50" />
          <Skeleton className="h-9 w-50" />
        </div>
      </div>
      <div className="mt-4">
        <Skeleton className="h-100 w-250" />
      </div>
    </div>
  );
}
