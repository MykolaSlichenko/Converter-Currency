import { useState, useEffect } from 'react';
import axios from 'axios';

const URL = 'https://api.apilayer.com/fixer/';
const API_KEY = process.env.REACT_APP_EXCHANGE_API_KEY;
const EMPTY_OBJECT = {};
const LOCAL_STORAGE_KEY = 'Currency_rates';
const THREE_HOURS = 3600 * 3;

const getDataFromLocalStorage = () => {
    try {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    } catch (e) {
        console.error('Failed to read local storage!');
        return null;
    }
};

const setDataToLocalStorage = response => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response));

const useFetchCurrencyRates = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState(EMPTY_OBJECT);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setIsError(false);
                const response = await axios.get(`${URL}latest?base=USD&apikey=${API_KEY}`);
                setDataToLocalStorage(response?.data);
                setData(response?.data);
            } catch (err) {
                console.error('err: ', err);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        const storedData = getDataFromLocalStorage();
        // logic to check if data is actual
        if (!storedData || (storedData?.timestamp + THREE_HOURS) < Date.now() / 1000) {
            fetchData();
        } else {
            setData(storedData);
        }
    }, []);

    return { isLoading, isError, data }
};

export default useFetchCurrencyRates;