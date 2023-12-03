import React from 'react';
import PropTypes from 'prop-types';

import {format} from '../../utils';

import './Header.css';

const Header = ({ eur, usd }) => (
    <h2 className="header">
        <p>Current exchange rate relative to the UAH.</p>
        <div>
            <span>USD: </span>
            <span className="header-currency">{format(usd)}</span>
        </div>
        <div>
            <span>EUR: </span>
            <span className="header-currency">{format(eur)}</span>
        </div>
    </h2>
);

Header.propTypes = {
    eur: PropTypes.number.isRequired,
    usd: PropTypes.number.isRequired,
};

Header.defaultProps = {
    eur: 0,
    usd: 0,
};

export default Header;