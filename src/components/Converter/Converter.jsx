import React, {useState, useCallback} from 'react';
import PropTypes from 'prop-types';

import CurrencyInput from '../CurrencyInput/CurrencyInput';
import {format} from '../../utils';

import './Converter.css';

const Converter = ({ data, usd }) => {
    const ratesList = Object.keys(data?.rates ?? {});
    const rates = data?.rates;
    const [currencyInitial, setCurrencyInitial] = useState('USD');
    const [currencyTarget, setCurrencyTarget] = useState('UAH');
    const [amountCurrent, setAmountCurrent] = useState(1);
    const [amountTarget, setAmountTarget] = useState(format(usd));

    const handleAmountCurrentChange = useCallback((amountCurrent) => {
      setAmountTarget(format(amountCurrent * rates[currencyTarget] / rates[currencyInitial]));
      setAmountCurrent(Number(amountCurrent));
    }, [rates, currencyInitial, currencyTarget]);

    const handleCurrencyCurrentChange = useCallback((currencyInitial) => {
      setAmountTarget(format(amountCurrent * rates[currencyTarget] / rates[currencyInitial]));
      setCurrencyInitial(currencyInitial);
    }, [rates, amountCurrent, currencyTarget]);

    const handleAmountTargetChange = useCallback((amountTarget) => {
      setAmountCurrent(format(amountTarget * rates[currencyInitial] / rates[currencyTarget]));
      setAmountTarget(Number(amountTarget));
    }, [rates, currencyInitial, currencyTarget]);

    const handleCurrencyTargetChange = useCallback((currencyTarget) => {
      setAmountTarget(format(amountCurrent * rates[currencyTarget] / rates[currencyInitial]));
      setCurrencyTarget(currencyTarget);
    }, [rates, amountTarget, currencyInitial]);

    return (
        <div className="converter">
            <h1 className="header-converter">Currency Converter</h1>
            <CurrencyInput
                options={handleAmountCurrentChange}
                onChange={handleCurrencyCurrentChange}
                selectedOptions={ratesList}
                value={amountCurrent}
                currency={currencyInitial}
            />
            <CurrencyInput
                options={handleAmountTargetChange}
                onChange={handleCurrencyTargetChange}
                selectedOptions={ratesList}
                value={amountTarget}
                currency={currencyTarget}
            />
        </div>
    )
};

Converter.propTypes = {
    usd: PropTypes.number,
    data: PropTypes.object,
};

export default Converter;