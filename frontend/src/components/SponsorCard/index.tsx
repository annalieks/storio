import React from 'react';
import styles from './styles.module.sass';

interface ISponsorCardProps {
  name: string;
  description: string;
}

const SponsorCard: React.FC<ISponsorCardProps> = ({
  name,
  description
}) => (
  <div className={styles.sponsor_container}>
    <div className={styles.sponsor_name}>{name}</div>
    <div className={styles.sponsor_description}>{description}</div>
  </div>
);

export default SponsorCard;
