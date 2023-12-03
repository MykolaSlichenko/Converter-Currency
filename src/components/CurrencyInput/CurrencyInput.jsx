import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import './CurrencyInput.css';

const CurrencyInput = ({value, currency, selectedOptions, options, onChange}) => {
  const handlerOnAmountChange = useCallback((event) => options(event.target.value), [options]);
  const handlerOnCurrencyChange = useCallback((event) => onChange(event.target.value), [onChange]);

  return (
    <div className="group">
      <input
        className="input-field"
        type="number"
        value={value.toString()}
        onChange={handlerOnAmountChange}
        min="0"
      />
      <select
        className="select-currency"
        value={currency}
        onChange={handlerOnCurrencyChange}
      >
        {selectedOptions.map((currencyOption, index) => (
          <option key={index} value={currencyOption}>{currencyOption}</option>
        ))}
      </select>
    </div>
  );
};

CurrencyInput.propTypes = {
  value: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  selectedOptions: PropTypes.array,
  options: PropTypes.func,
  onChange: PropTypes.func,
};

export default CurrencyInput;