import React, { useState } from 'react';
import styles from './styles.module.css'

type CheckboxProps = {
    id: string;
    value: number;
    label: string;
    handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckBox: React.FC<CheckboxProps> = ({ id, value, label, handleCheckboxChange }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
        handleCheckboxChange(event);
    };

    return (
        <label className={`${styles.checkboxContainer} ${isChecked ? styles.checked : ''}`}>
            <input
                type="checkbox"
                id={id}
                value={value}
                onChange={handleChange}
                className={styles.checkbox}
            />
            <span>{label}</span>
        </label>
    );
};

export default CheckBox;