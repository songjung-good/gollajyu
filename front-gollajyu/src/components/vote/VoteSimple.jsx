import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const categories = ['카테고리1', '카테고리2', '카테고리3', '카테고리4'];

const Modal = ({ children }) => {
    return ReactDOM.createPortal(
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded shadow-lg">
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

const VoteMakeSimple = ({ isOpen, closeModal }) => {
    if (!isOpen) {
        return null;
    }
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [items, setItems] = useState([{}, {}]);

    const handleAddItem = () => {
        if (items.length < 4) {
            setItems([...items, {}]);
        } else {
            alert('최대 4개의 투표 항목까지만 추가할 수 있습니다.');
        }
    };

    return (
        <Modal>
            <div className="flex justify-between items-center">
                <div>간단투표 만들기</div>
                <div>
                    <button>투표게시</button>
                    <button onClick={closeModal}>닫기</button>
                </div>
            </div>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력하세요"/>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">카테고리를 선택하세요</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
            <div className="grid grid-cols-2 gap-4">
                {items.map((item, index) => (
                    <div key={index}>
                        <input type="file" name="file" id={`file${index}`} />
                        <label htmlFor={`file${index}`}>사진 첨부</label>
                        <input type="text" placeholder="텍스트를 입력하세요" />
                    </div>
                ))}
            </div>
            {items.length < 4 && <button onClick={handleAddItem}>+</button>}
        </Modal>
    );
};

const VoteSimpleButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button onClick={handleOpenModal}>간단투표 만들기</button>
            <VoteMakeSimple isOpen={isModalOpen} closeModal={handleCloseModal} />
        </div>
    );
};

export default VoteSimpleButton;
