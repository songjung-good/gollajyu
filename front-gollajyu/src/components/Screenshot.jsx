import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';

function Screenshot() {
  const [isCapturing, setIsCapturing] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const handleMouseDown = (e) => {
    setIsCapturing(true);
    setCoords({ ...coords, x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = (e) => {
    if (isCapturing) {
      setCoords({ ...coords, width: e.clientX - coords.x, height: e.clientY - coords.y });

      // html2canvas로 해당 영역을 캡쳐
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      html2canvas(document.querySelector('div'), {
        canvas: canvas,
        x: coords.x,
        y: coords.y,
        width: coords.width,
        height: coords.height,
      }).then(() => {
        // 캡처된 이미지를 출력
        const img = document.createElement('img');
        img.src = canvas.toDataURL();
        document.body.appendChild(img);
      });
      // 캡처 중지
      setIsCapturing(false);
    }
  };

  const handleMouseMove = (e) => {
    if (isCapturing) {
      setCoords({ ...coords, width: e.clientX - coords.x, height: e.clientY - coords.y });
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isCapturing, coords]);


  return (
    <div>
      <button onClick={() => setIsCapturing(true)}>캡처 시작</button>
      {isCapturing && (
        <div
          style={{
            position: 'absolute',
            border: '2px solid red',
            left: `${coords.x}px`,
            top: `${coords.y}px`,
            width: `${coords.width}px`,
            height: `${coords.height}px`,
          }}
        ></div>
      )}
    </div>
  );
}

export default Screenshot;