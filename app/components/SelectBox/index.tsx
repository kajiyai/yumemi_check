import styles from "./styles.module.css"

type SelectBoxProps = {
    selectedLabel: string;
    setSelectedLabel: (value: string) => void;
};

const SelectBox: React.FC<SelectBoxProps> = ({ selectedLabel, setSelectedLabel }) => {
    return (
        <div className={styles.selectContainer}>
            <select
                className={styles.selectBox}
                value={selectedLabel}
                onChange={(e) => setSelectedLabel(e.target.value)}
            >
                <option value="総人口">総人口</option>
                <option value="年少人口">年少人口</option>
                <option value="生産年齢人口">生産年齢人口</option>
                <option value="老年人口">老年人口</option>
            </select>
        </div>
    )
};

export default SelectBox;