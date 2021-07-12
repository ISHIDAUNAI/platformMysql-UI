import React from 'react';
import styles from '../index.less';
import numeral from 'numeral';

const MiniRank = props => {
  const {data, title} = props

  return (
    <div className={styles.miniRank}>
      { title? <h4> {title} </h4> : null }

      <ul className={styles.rankingList}>
        {data.map((item, i) => (
          <li key={item.name}>
            <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
              {i + 1}
            </span>
            <span className={styles.rankingItemTitle} title={item.name}>
              {item.name}
            </span>
            <span className={styles.rankingItemValue}>
              {numeral(item.value).format('0,0')}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MiniRank;
