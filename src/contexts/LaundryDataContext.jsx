import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../axios'; // Make sure this path is correct

const LaundryDataContext = createContext();

export const useLaundryData = () => {
    return useContext(LaundryDataContext);
};

export const LaundryDataProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [services, setServices] = useState([]);
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
        const fetchLaundryData = async () => {
            try {
                // Use Promise.all to fetch items and services in parallel for efficiency
                const [itemsResponse, servicesResponse, PriceResponse] = await Promise.all([
                    axios.get('/api/items/'),
                    axios.get('/api/services/'),
                    axios.get('/api/items-service-price/')
                ]);
                
                setItems(itemsResponse.data);
                setServices(servicesResponse.data);
                setPrices(PriceResponse.data);
                console.log('Items, services, and prices fetched successfully.');

            } catch (error) {
                console.error('Error fetching laundry data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLaundryData();
    }, []); // Empty array ensures this runs only once on mount

    // 4. Provide all the data in a single value object
    const value = {
        items,
        services,
        prices,
        loading,
    };

    return (
        <LaundryDataContext.Provider value={value}>
            {children}
        </LaundryDataContext.Provider>
    );
};