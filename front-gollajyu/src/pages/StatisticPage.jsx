import React, { useState } from 'react';
import VoteMakeSimple from '../components/vote/VoteSimple';

const StatisticPage = () => {
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
            {isModalOpen && <VoteMakeSimple isOpen={isModalOpen} closeModal={handleCloseModal} />}
        </div>
    );
};
  
export default StatisticPage;
