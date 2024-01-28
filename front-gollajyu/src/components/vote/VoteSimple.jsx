import React, { useState } from 'react';

const Card = ({ onClick }) => (
    <div className="p-4 max-w-sm" onClick={onClick}>
        {/* card contents */}
    </div>
);

const FileUpload = () => {
    const [preview, setPreview] = useState('');

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        displayPreview(file);
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        displayPreview(file);
    };

    const displayPreview = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPreview(reader.result);
        };
    };
}

const VoteSimple = () => {
    const [isCardClicked, setIsCardClicked] = useState(false);

    const handleCardClick = () => {
        setIsCardClicked(true);
    };

    return (
        <div>
            {isCardClicked ? (
                <FileUpload />
            ) : (
                <div class="flex flex-wrap justify-center mt-10 max-w-4xl mx-auto">
                    <Card onClick={handleCardClick} />
                    <Card onClick={handleCardClick} />
                    <Card onClick={handleCardClick} />
                    <Card onClick={handleCardClick} />
                </div>
            )}
        </div>
    );
};

export default VoteSimple;
