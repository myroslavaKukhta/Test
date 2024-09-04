"use client";

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';

export default function HomePage() {
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [isNextEnabled, setIsNextEnabled] = useState(false);

    useEffect(() => {
        fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
            .then(response => response.json())
            .then(data => setVehicleTypes(data.Results))
            .catch(error => console.error('Error fetching vehicle types:', error));
    }, []);

    useEffect(() => {
        setIsNextEnabled(selectedType !== '' && selectedYear !== '');
    }, [selectedType, selectedYear]);

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    return (
        <div className="body">
            <div className="card">
                <h1 className="title">Select Vehicle Type and Model Year</h1>
                <Suspense fallback={<div>Loading...</div>}>
                    <div className="mb-4">
                        <label htmlFor="vehicleType" className="label">Vehicle Type:</label>
                        <select
                            id="vehicleType"
                            value={selectedType}
                            onChange={handleTypeChange}
                            className="select"
                        >
                            <option value="">Select a type</option>
                            {vehicleTypes.map(type => (
                                <option key={type.MakeId} value={type.MakeId}>{type.MakeName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="modelYear" className="label">Model Year:</label>
                        <select
                            id="modelYear"
                            value={selectedYear}
                            onChange={handleYearChange}
                            className="select"
                        >
                            <option value="">Select a year</option>
                            {Array.from({ length: new Date().getFullYear() - 2015 + 1 }, (_, i) => 2015 + i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </Suspense>

                <Link href={`/result/${selectedType}/${selectedYear}`}>
                    <button
                        disabled={!isNextEnabled}
                        className={`btn ${!isNextEnabled ? 'btn-disabled' : ''}`}
                    >
                        Next
                    </button>
                </Link>
            </div>
        </div>
    );
}




