import { ChartLineIcon, Icon, LucideIcon, RocketIcon, UserIcon } from "lucide-react";

interface statsprops {
    icon: LucideIcon;
    data: string;
    info: string;
    isMid?: boolean;
}

//Theirs a concept of props and components
//In react , components are always representedd by PascalCase eg.Match() whereas props are represented by camelCase eg.info
//So , we pass icon as a prop , but since it actually is a component and react only recognise components
//      if they are in PascalCase , thus we rename/destructure the prop in a PascalCase eg.icon:Icon
function StatsCard({icon:Icon , data , info , isMid}:statsprops){
    return (
        <div className="flex flex-col items-center text-center m-10 ">
            <Icon className="size-6 -translate-x-1 sm:size-8 md:size-10"/>
            <p className="text-2xl font-extrabold sm:text-4xl md:text-4xl pt-1">{data}</p>
            <p className="text-sm font-medium pr-3 opacity-60">{info}</p>
        </div>
    )
}

export default StatsCard