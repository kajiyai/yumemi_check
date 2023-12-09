import React, { useState } from 'react';
import styles from './styles.module.css'

type CheckboxProps = {
    id: string;
    value: number;
    label: string;
    handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading?: boolean;  // 新しいプロパティ
};

const CheckBox: React.FC<CheckboxProps> = ({ id, value, label, handleCheckboxChange, isLoading }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
        handleCheckboxChange(event);
    };

    if (isLoading) {
        return <div className={styles.skeletonCheckbox}></div>;  // スケルトン表示
      }

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