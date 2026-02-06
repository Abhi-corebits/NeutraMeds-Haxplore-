import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselDemo({ arr }: { arr: any[] }) {
    return (
        <Carousel className="w-full ">
            <CarouselContent>
                {arr.map((ele:any) => (
                    <CarouselItem key={ele}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex items-center justify-center">
                                    <img src={ele} width={800}/>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
