import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../axios';

const ServicesContext = createContext();

export const useServices = () => {
    return useContext(ServicesContext);
};

export const ServicesProvider = ({ children }) => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                // Assuming your API endpoint for services is '/services'
                const response = await axios.get('/api/services');
                setServices(response.data);
                console.log('Services fetched successfully:', response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    return (
        <ServicesContext.Provider value={{ services }}>
            {children}
        </ServicesContext.Provider>
    );
};