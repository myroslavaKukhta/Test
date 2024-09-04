"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ResultPage() {
    const params = useParams();
    const { makeId, year } = params;
    const [models, setModels] = useState([]);

    useEffect(() => {
        if (makeId && year) {
            fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`)
                .then(response => response.json())
                .then(data => {
                    setModels(data.Results);
                })
                .catch(error => {
                    console.error('Error fetching vehicle models:', error);
                });
        }
    }, [makeId, year]);

    if (!makeId || !year) {
        return <div className="min-h-screen flex items-center justify-center text-red-600 font-bold">Missing parameters</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center p-4">
            <div className="card">
                <h1 className="title">Vehicle Models for {year}</h1>
                {models.length === 0 ? (
                    <p className="message">No models found for the selected type and year.</p>
                ) : (
                    <ul className="list-items">
                        {models.map(model => (
                            <li key={model.Model_ID}>{model.Model_Name}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}




