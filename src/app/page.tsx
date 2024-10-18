"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface VehicleMake {
    MakeId: number;
    MakeName: string;
  }

function FilterPage() {
    const [makes, setMakes] = useState<VehicleMake[]>([]);
    const [selectedMake, setSelectedMake] = useState<string | null>(null);

    useEffect(() => {
        fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
          .then(response => response.json())
          .then(data => setMakes(data.Results));
      }, []);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Vehicle filter</h1>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="make">Brand</label>
        <select
            id="make"
            className="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={selectedMake || ''}
            
          >
            <option value="">Selecione uma marca</option>
            {makes.map((make) => (
              <option key={make.MakeId} value={make.MakeName}>
                {make.MakeName}
              </option>
            ))}
          </select>
      </div>
    </div>
  );
}

export default FilterPage;