import Link from 'next/link';
import { Suspense } from 'react';

interface Vehicle {
    Make_ID: number;
    Make_Name: string;
    Model_ID: number;
    Model_Name: string;
}

async function getVehicles(makeId: string, year: string): Promise<Vehicle[]> {
    const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`);
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
        <div>
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
                <p>No vehicles found for this brand and year.</p>
            )}
        </div>
    );
};

export default function ResultPage({ params }: ResultPageProps) {
    const { makeId, year } = params;

    return (
        <div className="container mx-auto p-4 mt-10">
            <Suspense fallback={<p>Loading vehicles...</p>}>
                <VehiclesList makeId={makeId} year={year} />
            </Suspense>
            <Link href={`/`}>
                <button
                    className={'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6 bg-blue-500 hover:bg-blue-700 text-white'}
                >
                    Go Back
                </button>
            </Link>
        </div>
    );
}
