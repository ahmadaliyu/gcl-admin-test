export const LoadingSkeleton = () => {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
      <div className="h-4 w-2/3 bg-gray-200 rounded"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {/* Left - Timeline Skeleton */}
        <div className="space-y-6">
          <div className="border-l-2 border-gray-200 pl-4 relative">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="mb-6">
                <div className="absolute -left-2 w-4 h-4 rounded-full bg-gray-200"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                <div className="h-3 w-3/4 mt-2 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Details Skeleton */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 text-sm gap-6">
            <div className="space-y-2">
              <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div
                  key={index}
                  className="h-3 w-full bg-gray-200 rounded"
                ></div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div
                  key={index}
                  className="h-3 w-full bg-gray-200 rounded"
                ></div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
            <div className="pl-6 mt-2 space-y-2">
              {[1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className="h-3 w-full bg-gray-200 rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="h-10 w-full bg-gray-200 rounded-full"></div>
        <div className="h-10 w-full bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};
