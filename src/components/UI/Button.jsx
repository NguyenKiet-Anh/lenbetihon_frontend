import React from 'react';
const Button = (props) => {
    return (
        <button
            onClick={props.onClick}
            className={`text-base rounded-full font-semibold py-2 px-4 hover:opacity-80 cursor-pointer outline-none ${props.className}`}
        >
            {props.title}
        </button>
    );
};

export default Button;
