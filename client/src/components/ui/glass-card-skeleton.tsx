import Skeleton from "react-loading-skeleton";

function GlassCardSkeleton() {
  return (
    <div className="flex justify-center p-4">
      <div className="w-full glass-effect rounded-xl flex flex-col overflow-hidden p-2">
        <div className="flex justify-between items-center">
          <div className="text-lg font-medium leading-normal text-white border-b border-b-red-700 w-3/4 flex items-center gap-2">
            <Skeleton circle width={40} height={40} />
            <Skeleton width="30%" />
          </div>
          <Skeleton width={24} height={24} />
        </div>
        <div className="flex justify-between items-center pl-8 p-2 mt-5 font-light text-sm">
          <Skeleton width="60%" />
          <Skeleton width="40%" />
        </div>
      </div>
    </div>
  );
}

export default GlassCardSkeleton;
