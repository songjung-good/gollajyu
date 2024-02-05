import React, { useState } from 'react';

const ChatForm = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
    setValue('');
  }

  return(
    <li className='chat-form'>
      <form onSubmit={handleSubmit}>
        <span className='ps_box'>
          <input 
            type="text" 
            className='int'
            placeholder='댓글을 입력해 주세요.'
            onChange={handleChange}
            value={value}
          />
        </span>
        <input type="submit" className='btn' value='submit'/>
      </form>
    </li>
  )
};

export default ChatForm;
