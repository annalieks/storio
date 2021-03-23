import React from 'react';
import styles from './styles.module.sass';

interface IGradientButtonProps {
  text: string;
  onClick: () => any;
}

const GradientButton: React.FC<IGradientButtonProps> = ({
  text,
  onClick,
}) => (
  <button onClick={onClick} className={styles.button_container}>{text}</button>
);

export default GradientButton;
