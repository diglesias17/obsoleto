import React, { useState } from 'react';

import './Menu.css';

/* eslint-disable-next-line */
export interface MenuProps {}


interface IMenuItem {
  id: number;
  description: string;
}

export const Menu = (props: MenuProps) => {
  const [currentItem, setCurrentItem] = useState<string>('');
  const [items, setItems] = useState<IMenuItem[]>([
    { id: 101, description: 'Beer glass' },
    { id: 102, description: 'Small Pizza' },
    { id: 103, description: 'Big Pizza' },
    { id: 104, description: 'Fries' },
  ]);

  return (
    <div>
      <h1>Menu</h1>

      <input type="text" value={currentItem} onChange={ev => setCurrentItem(ev.target.value)} />
      <button onClick={() => setItems(
        [
          ...items,
          { id: new Date().getUTCMilliseconds(), description: currentItem }
        ])}>Add</button>

      <ul>
      {items.map(item => <li>{item.description}</li>)}
      </ul>

    </div>
  );
};

export default Menu;
