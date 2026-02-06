import { Skeleton } from "../ui/skeleton";

export default function UserProjectsSkeleton() {
    const cards = Array.from({ length: 6 });
    const badges = Array.from({ length: 3 });

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-10 lg:gap-6">
            {cards.map((_, i) => (
                <div
                    key={i}
                    className="bg-white p-4 rounded-lg shadow-sm overflow-hidden"
                >
                    {/* Image */}
                    <Skeleton className="w-full aspect-video mb-4" />

                    {/* Title */}
                    <Skeleton className="h-6 w-3/4 mb-2" />

                    {/* Description */}
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-5/6 mb-4" />

                    {/* Badges */}
                    <div className="flex gap-2 mb-4">
                        {badges.map((_, j) => (
                            <Skeleton key={j} className="h-5 w-16 rounded-xl" />
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center pt-4 border-t">
                        <div className="flex gap-2">
                            <Skeleton className="h-8 w-20 rounded-2xl" />
                            <Skeleton className="h-8 w-24 rounded-2xl" />
                        </div>

                        <Skeleton className="h-9 w-32 rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
}
