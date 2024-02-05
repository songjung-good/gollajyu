import React, { useState, useRef } from 'react';

const ChatList = ({ list, updateList }) => {
  const [value, setValue] = useState('');
  const [update, setUpdate] = useState(null);
  const input = useRef(null);

  const handleClick = i => e => {
    setValue(e.target.innerHTML);
    setUpdate(i);
  };

  const updateChange = e => {
    setValue(e.target.value);
  };

  const updateKeyDown = i => e => {
    if (e.key !== 'Enter') return;
    const newList = [...list];
    newList[i].content = value;
    setUpdate(null);
    updateList(newList);
  };

  const deleteClick = k => {
    const newList = [...list].filter((v, i) => i !== k);
    updateList(newList);
  };

  const items = () => list.map((v, k) => {
    return (
      <ul className='comment-row' key={k}>
        <li className='comment-id'>{v.userid}</li>
        <li className='comment-content'>
          {
            update === k ?
              <input
                type='text'
                className='comment-update-input'
                onChange={updateChange}
                onKeyDown={updateKeyDown(k)}
                value={value}
                ref={input}
              />
              : (<>
                <span onClick={handleClick(k)}>{v.content}</span>
                <span className='comment-delete-btn' onClick={() => deleteClick(k)}>X</span>
              </>)
          }
        </li>
        <li className='comment-date'>{v.date}</li>
      </ul>
    );
  });

  return (
    <li>{items()}</li>
  );
};

export default ChatList;