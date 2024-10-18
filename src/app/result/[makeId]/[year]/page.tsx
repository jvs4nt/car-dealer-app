"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

interface Vehicle {
    Make_ID: number;
    Make_Name: string;
    Model_ID: number;
    Model_Name: string;
}

function ResultPage() {
    const { makeId, year } = useParams(); 
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    useEffect(() => {
        if (makeId && year) {
            fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`)
                .then(response => response.json())
                .then(data => {
                    console.log("Dados da API:", data);
                    if (data.Results) {
                        const vehiclesData = data.Results.map((item: any) => ({
                            Make_ID: item.Make_ID,
                            Make_Name: item.Make_Name,
                            Model_ID: item.Model_ID,
                            Model_Name: item.Model_Name
                        }));
                        setVehicles(vehiclesData);
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar os veículos:', error);
                });
        } else {
            console.log("makeId and year are not set");
        }
    }, [makeId, year]);

    return (
        <div className="container mx-auto p-4 mt-10">
            <h1 className="text-3xl font-bold mb-4">Vehicle result for {makeId} - {year}</h1>
            {vehicles.length > 0 ? (
                <ul>
                    {vehicles.map(vehicle => (
                        <li key={vehicle.Model_ID}>
                            {vehicle.Make_Name} {vehicle.Model_Name} (ID: {vehicle.Model_ID})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum veículo encontrado para esta marca e ano.</p>
            )}
        </div>
    );
}

export default ResultPage;