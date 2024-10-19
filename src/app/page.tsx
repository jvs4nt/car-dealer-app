"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface VehicleMake {
    MakeId: number;
    MakeName: string;
}

function FilterPage() {
    const [makes, setMakes] = useState<VehicleMake[]>([]);
    const [selectedMake, setSelectedMake] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [years, setYears] = useState<number[]>([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles/GetMakesForVehicleType/car?format=json`)
            .then(response => response.json())
            .then(data => setMakes(data.Results));
    }, []);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const yearsArray = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i);
        setYears(yearsArray);
    }, []);

    const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMake(parseInt(event.target.value));
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(event.target.value);
    };

    const isButtonDisabled = !selectedMake || !selectedYear;

    return (
        <div className="container mx-auto p-4 mt-10">
            <h1 className="text-3xl font-bold mb-4">Vehicle filter</h1>
            <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="make">Brand</label>
                    <select
                        id="make"
                        className="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        value={selectedMake || ''}
                        onChange={handleMakeChange}
                    >
                        <option value="">Select a brand</option>
                        {makes.map((make) => (
                            <option key={make.MakeId} value={make.MakeId}>
                                {make.MakeName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 p-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">Year</label>
                    <select
                        id="year"
                        className="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        value={selectedYear || ''}
                        onChange={handleYearChange}
                    >
                        <option value="">Select a year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <Link href={`/result/${selectedMake}/${selectedYear}`}>
                <button
                    className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-6 ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                    disabled={isButtonDisabled}
                >
                    Next
                </button>
            </Link>
        </div>
    );
}

export default FilterPage;