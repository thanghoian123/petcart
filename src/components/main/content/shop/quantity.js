import React, { useState } from 'react';

import PropTypes from 'prop-types';

Quantity.propTypes = {

};

function Quantity(props) {
    const [value, setvalue] = useState(1);
    const { onReciveValue } = props;

    const onHanldeChange = (evt) => {
        console.log(evt.target.value)
    }

    const increment = () => {
        const newValue = value + 1;
        setvalue(newValue);
        onReciveValue(newValue);
    }

    const decrement = () => {
        if (value > 0) {
            const newValue = value - 1;
            setvalue(newValue)
            onReciveValue(newValue);
        }

    }
    return (
        <div className="quantity">
            <button className="plus-btn" type="button" name="button" onClick={decrement}>
                -
        </button>
            <input type="text" name="name" value={value} onChange={onHanldeChange} />
            <button className="minus-btn" type="button" name="button" onClick={increment}>
                +
        </button>
        </div>
    );
}

export default Quantity;