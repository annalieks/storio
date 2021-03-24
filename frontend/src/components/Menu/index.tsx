import React, { useState } from 'react';
import styles from './styles.module.sass';

interface IMenuItem {
  text: string;
  onClick: () => any;
}

interface IMenuProps {
  menuItems: IMenuItem[];
  activeIndex?: number;
}

const Menu: React.FC<IMenuProps> = ({
  menuItems,
  activeIndex
}) => {
  const [active, setActive] = useState(activeIndex || 0);
  const menuItemStyle = (i: number) => `${styles.menu_item} ${
    isItemActive(i)
      ? styles.active_menu
      : styles.inactive_menu}`;

  const handleOnClick = (i: number, onClick: () => any) => {
    setActive(i);
    onClick();
  };

  const isItemActive = (index: number): boolean => active === index;
  return (
    <div className={styles.menu_container}>
      {menuItems.map((item, i) =>
        <div className={styles.menu_item_container}>
          <button
            className={menuItemStyle(i)}
            onClick={() => handleOnClick(i, item.onClick)}
          >
            {item.text}
          </button>
          <div className={styles.item_separator}/>
        </div>)}
    </div>
  );
};

export default Menu;
