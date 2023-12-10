import React from "react";
import styles from "./styles.module.css";

const SkeletonScreen: React.FC = () => {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonCheckbox}>
        {/* チェックボックスのスケルトン */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className={styles.skeletonElement}></div>
        ))}
      </div>
      <div className={styles.skeletonSelect}>
        {/* セレクトボックスのスケルトン */}
        <div className={styles.skeletonElement}></div>
      </div>
      <div className={styles.skeletonChart}>
        {/* チャートのスケルトン */}
        <div className={styles.skeletonElement}></div>
      </div>
    </div>
  );
};

export default SkeletonScreen;
