import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMenu,
  addMenu,
  selectAllMenu,
} from '../../app/repository/menu.slice';
import './Menu.css';

/* eslint-disable-next-line */
export interface MenuProps {}

interface IMenuItem {
  id: number;
  description: string;
}

export const Menu = (props: MenuProps) => {
  const dispatch = useDispatch();
  const [currentItem, setCurrentItem] = useState<string>('');
  //const [items, setItems] = useState<IMenuItem[]>([
  //  { id: 101, description: 'Beer glass' },
  //  { id: 102, description: 'Small Pizza' },
  //  { id: 103, description: 'Big Pizza' },
  //  { id: 104, description: 'Fries' },
  //]);

  const items = useSelector(selectAllMenu);
  //console.log(dbItems);

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  return (
    <div>
      <h1>Menu</h1>

      <input
        type="text"
        value={currentItem}
        onChange={(ev) => setCurrentItem(ev.target.value)}
      />
      <button
        onClick={() =>
          dispatch(
            addMenu({
              id: new Date().getUTCMilliseconds(),
              description: currentItem,
            })
          )
        }
      >
        Add
      </button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
