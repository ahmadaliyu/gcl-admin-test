import UserDashboardWrapper from "@/components/layout/user/user-dashboard-wrapper";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-[56px]">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>

      <div className="w-full flex gap-[16px] mb-6">
        <Skeleton className="h-10 w-[160px]" />
        <Skeleton className="h-10 w-[180px]" />
      </div>

      <div className="space-y-4">
        {/* Table Header */}
        <div className="flex bg-[#FCE8E9] p-4 rounded-t-lg">
          <Skeleton className="h-6 w-[120px] mx-2" />
          <Skeleton className="h-6 w-[100px] mx-2" />
          <Skeleton className="h-6 w-[100px] mx-2" />
          <Skeleton className="h-6 w-[100px] mx-2" />
          <Skeleton className="h-6 w-[100px] mx-2" />
        </div>

        {/* Table Rows */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center p-4 border-b border-[#E3E3E3]"
          >
            <div className="flex-1 flex items-center gap-2">
              <Skeleton className="h-6 w-[150px]" />
            </div>
            <div className="flex-1">
              <Skeleton className="h-10 w-[106px] rounded-full" />
            </div>
            <div className="flex-1">
              <Skeleton className="h-6 w-[80px]" />
            </div>
            <div className="flex-1">
              <Skeleton className="h-6 w-[100px]" />
            </div>
            <div className="flex-1 flex gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LoadingSkeleton;
