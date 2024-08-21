import { Skeleton } from "@/components/ui/skeleton";

function AdminSkeleton() {
  return (
    <div>
      <div className="flex justify-between">
        <Skeleton className="w-56 h-10 bg-white" />
        <Skeleton className="w-28 h-10 bg-white" />
      </div>

      <div className="border border-slate-500/50 rounded-xl mt-5 space-y-5 p-3">
        <div className="w-full flex justify-evenly">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton className="w-56 h-10 bg-white" key={i} />
          ))}
        </div>
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton className="w-full h-10 bg-white" key={i} />
        ))}
      </div>
    </div>
  );
}

export default AdminSkeleton;
