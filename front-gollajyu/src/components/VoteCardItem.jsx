import React from 'react';
import { Link } from 'react-router-dom';

function VoteCardItem(props) {
  return (
    <>
      <li className='cards__item'> 카드 제목
        <Link className='cards__item__link' to={props.path}> 투표 링크
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            ??
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={props.src}
            /> 투표 이미지
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>투표설명{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default VoteCardItem;