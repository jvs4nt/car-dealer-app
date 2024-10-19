import Link from 'next/link';
import { Suspense } from 'react';

interface Vehicle {
    Make_ID: number;
    Make_Name: string;
    Model_ID: number;
    Model_Name: string;
}

async function getVehicles(makeId: string, year: string): Promise<Vehicle[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`);
    const data = await res.json();

    if (data.Results) {
        const vehiclesData = data.Results.map((item: any) => ({
            Make_ID: item.Make_ID,
            Make_Name: item.Make_Name,
            Model_ID: item.Model_ID,
            Model_Name: item.Model_Name
        }));

        const uniqueVehiclesData = vehiclesData.filter((vehicle: Vehicle, index: number, self: Vehicle[]) =>
            index === self.findIndex((v: Vehicle) => (
                v.Model_ID === vehicle.Model_ID
            ))
        );

        return uniqueVehiclesData;
    }

    return [];
}

interface ResultPageProps {
    params: { makeId: string; year: string };
}

const VehiclesList = async ({ makeId, year }: { makeId: string; year: string }) => {
    const vehicles = await getVehicles(makeId, year);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4 text-center">Filtered Vehicle Result List:</h1>
            
            {vehicles.length > 0 ? (
                <ul className="space-y-4">
                {vehicles.map(vehicle => (
                    <li key={vehicle.Model_ID} className="bg-slate-800 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex justify-between items-center">
                        <div>
                        <h2 className="text-xl font-semibold">
                            {vehicle.Make_Name} {vehicle.Model_Name}
                        </h2>
                        <p className="text-gray-500">ID: {vehicle.Model_ID}</p>
                        </div>
                        <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">{year}</span> {/* Supondo que o veículo tenha um ano */}
                    </div>
                    </li>
                ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No vehicles found for this brand and year.</p>
            )}
        </div>
    );
};

export default function ResultPage({ params }: ResultPageProps) {
    const { makeId, year } = params;

    return (
        <div className="container mx-auto flex flex-col items-center p-4 mt-10">
            <Suspense fallback={<p>Loading vehicles...</p>}>
                <VehiclesList makeId={makeId} year={year} />
            </Suspense>
            <Link href={`/`}>
                <button
                    className={'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6 bg-blue-500 hover:bg-blue-700 text-white'}
                >
                    Filter again
                </button>
            </Link>
        </div>
    );
}
