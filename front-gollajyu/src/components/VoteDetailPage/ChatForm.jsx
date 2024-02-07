// ChatForm.jsx
import React, { useState } from 'react';

const ChatForm = ({ onSubmit, userid, choiced }) => {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value, userid, choiced);
    setValue('');
  };
  // enter키로도 입력 가능
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white p-4 flex items-center">
      <input
        type="text"
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
        placeholder="댓글을 입력해 주세요."
        onChange={handleChange}
        value={value}
        onKeyPress={handleKeyPress}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-full p-2 ml-2 hover:bg-blue-600 focus:outline-none"
        onClick={handleSubmit}
      >
        전송
      </button>
    </div>
  );
};

export default ChatForm;