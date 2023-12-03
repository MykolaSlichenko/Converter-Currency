import React from 'react';

import useFetchCurrencyRates from './components/hooks/useFetchCurrencyRates';
import Converter from './components/Converter/Converter';
import Header from './components/Header/Header';

import './App.css';

const getBaseRates = data => {
    const usd = data?.rates?.UAH ?? 1;
    const eur = usd / (data?.rates?.EUR ?? 1) ?? 1;
    return {usd, eur}
};

const App = () => {
    const {data, isLoading, isError} = useFetchCurrencyRates();
    const {usd, eur} = getBaseRates(data);

    if (isLoading) return <h1> LOADING...</h1>;

    if (isError) console.log('Could not get data.');

    return (
        <div>
            <Header eur={eur} usd={usd} />
            {data?.rates ? <Converter data={data} usd={usd} /> : <div>Loading...</div>}
        </div>
    );
};

export default App;
