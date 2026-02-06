import { Skeleton } from "../ui/skeleton"

export default function SkeletonProfile() {

    return (
        <div className="rounded-lg p-6 mb-6 bg-white shadow-black/30 shadow-2xl">
            <div className="flex items-start gap-4">
                <div className="text-6xl bg-gradient-to-br from-blue-100 to-purple-100 rounded-full w-24 h-24 flex items-center justify-center">
                   <Skeleton className="h-6 w-10" />
                </div>
                <div className="flex-1">
                    <Skeleton className="text-5xl font-semibold mb-1"></Skeleton>
                    <p className="text-gray-500 mb-3"></p>
                    <p className="text-gray-700 mb-2 text-lg"></p>

                </div>
            </div>
        </div>
    )
}