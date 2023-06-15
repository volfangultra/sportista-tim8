import React from 'react';

function RecommendedFields() {
    // Dummy data for recommended fields
    const recommendedFields = [
        { id: 1, name: 'Field 1', address: 'Address 1', details: 'Details 1', price: 10 },
        { id: 2, name: 'Field 2', address: 'Address 2', details: 'Details 2', price: 20 },
        { id: 3, name: 'Field 3', address: 'Address 3', details: 'Details 3', price: 30 },
    ];

    return (
        <div>
            <h2>Recommended Fields</h2>
            {recommendedFields.map((field) => (
                <div key={field.id}>
                    <h3>{field.name}</h3>
                    <p>Address: {field.address}</p>
                    <p>Details: {field.details}</p>
                    <p>Price: {field.price}</p>
                    {/* Add additional content or components as needed */}
                </div>
            ))}
        </div>
    );
}

export default RecommendedFields;
