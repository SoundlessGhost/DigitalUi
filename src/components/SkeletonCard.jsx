import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 border border-gray-100 rounded-lg p-4">
      <Skeleton className="h-[150px] w-[150px]" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-[130px]" />
        <div className=" flex items-center">
          <Skeleton className="h-3 w-[75px]" />
          <Skeleton className="ml-4 h-3 w-[55px]" />
        </div>
        <div className=" flex items-center">
          <Skeleton className="h-3 w-[90px]" />
          <Skeleton className="ml-4 h-3 w-[40px]" />
        </div>
      </div>
    </div>
  );
}
