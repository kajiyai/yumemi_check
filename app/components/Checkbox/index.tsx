import React from 'react';

type CheckboxProps = {
    id: string;
    value: number;
    label: string;
    handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckBox: React.FC<CheckboxProps> = ({ id, value, label, handleCheckboxChange }) => {
    return (
        <div>
            <input
                type="checkbox"
                id={id}
                value={value}
                onChange={handleCheckboxChange}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

export default CheckBox;