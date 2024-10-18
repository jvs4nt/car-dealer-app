"use client";

import { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Vehicle {
    MakeId: number;
    MakeName: string;
    Year: number;
}

function ResultPage() {
    const router = useRouter();
    const searchParams = useSearchParams(); 
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [makeId, setMakeId] = useState<string | null>(null);
    const [year, setYear] = useState<string | null>(null);

    useEffect(() => {
        const queryMakeId = searchParams.get('makeId'); 
        const queryYear = searchParams.get('year'); 
    
        if (queryMakeId && queryYear) {
          setMakeId(queryMakeId);
          setYear(queryYear);
        }
      }, [searchParams]);

    return (
        <div className="container mx-auto p-4 mt-10">
            <h1 className="text-3xl font-bold mb-4">Vehicle result</h1>
        </div>
    );
}

export default ResultPage;