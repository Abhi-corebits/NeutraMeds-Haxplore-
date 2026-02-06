import { Item, ItemGroup, ItemHeader } from "../ui/item";
import { Skeleton } from "../ui/skeleton";
import Fadein from "../ui/fadein";

export default function LPSkeleton() {
    const array = new Array(5).fill(null)
    return (
        <div className="flex mx-auto flex-col gap-6 pt-2 pb-2">
            
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 place-content-center px-6 md:px-12 gap-5 sm:gap-10">

                    {array.map((_, i) => (
                        <div
                            key={i}
                            className="transition duration-300 ease-in-out w-auto h-auto"
                        >
                            {/* Image */}
                            <Skeleton className="w-full h-[200px] lg:h-[260px]" />

                            {/* Content */}
                            <div className="mt-3">
                                <div className="flex justify-between gap-3">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-6 w-6 rounded-full" />
                                </div>

                                <Skeleton className="h-4 w-1/2 mt-2" />
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-center items-end pb-20">
                        <Skeleton className="h-10 w-40 rounded-md" />
                    </div>

                </div>
            
        </div>
    )
}
