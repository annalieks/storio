import React from 'react';
import styles from './styles.module.sass';
import { PieChart } from 'react-minimal-pie-chart';

interface ICoursesBlockProps {
  one: number;
  oneText: string;
  two: number;
  twoText: string;
  colorOne?: string;
  colorTwo?: string;
}

const Statistics: React.FC<ICoursesBlockProps> = ({
  one,
  oneText,
  two,
  twoText,
  colorOne,
  colorTwo
}) => {
  const defaultLabelStyle = {
    fontSize: '0.7em',
    fill: 'white'
  };

  return (
    <div className={styles.stats_container}>
      <div className={styles.title}>
        <div className={styles.posts}
             style={{ borderBottomColor: colorOne || '#28208c' }}
        >{oneText}</div>
        <p className={styles.space}/>
        <div
          className={styles.assignments}
          style={{ borderBottomColor: colorTwo || '#F8A353'}}
        >{twoText} </div>
      </div>
      <div className={styles.chart_container}>
        <PieChart
          label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
          labelStyle={defaultLabelStyle}
          data={[
            {
              value: one,
              color: colorOne || '#28208c'
            },
            {
              value: two,
              color: colorTwo || '#F8A353'
            }
          ]}
        />
      </div>
    </div>
  );
};

export default Statistics;
