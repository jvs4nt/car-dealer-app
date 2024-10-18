"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Vehicle {
    MakeId: number;
    MakeName: string;
    Year: number;
}

function ResultPage() {
    const router = useRouter();
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    return (
        <div className="container mx-auto p-4 mt-10">
            <h1 className="text-3xl font-bold mb-4">Vehicle result</h1>
        </div>
    );
}

export default ResultPage;