// components/MapView.tsx
"use client";

import { GoogleMap, Circle, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import { mapData } from "@/lib/testpoints";

const containerStyle = {
    width: "100%",
    height: "500px",
};

export default function MapView({ selectedDate }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey:process.env.MAP,
    });

    const filteredData = useMemo(() => {
        return mapData.filter((item) => item.date === selectedDate);
    }, [selectedDate]);

    if (!isLoaded) return <p>Loading Map...</p>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: 28.6139, lng: 77.209 }}
            zoom={10}
        >
            {filteredData.map((point) => (
                <Circle
                    key={point.id}
                    center={{ lat: point.lat, lng: point.lng }}
                    radius={point.radius}
                    options={{
                        fillColor: "#3b82f6",
                        fillOpacity: 0.35,
                        strokeColor: "#2563eb",
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                    }}
                />
            ))}
        </GoogleMap>
    );
}
