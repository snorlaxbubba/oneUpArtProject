import { useState } from 'react';
import React, { useRef } from 'react';
import { API } from 'aws-amplify';
import axios from 'axios';

function NewPost() {
  	const [color, setColor] = useState('#000000')
  	const [bgColor, setBgColor] = useState('#ffffff')
  	const canvasRef = useRef(null);
  	const APIendpoint = import.meta.env.VITE_APP_API_URL
  	
	const handleColorChange = (e) => {
    	setColor(e.target.value)
  	}
    
  	const handleBgColorChange = (e) => {
		setBgColor(e.target.value)
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		ctx.fillStyle = e.target.value
		ctx.fillRect(0, 0, canvas.width, canvas.height)
  	}
    
  	const handleMouseDown = (e) => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		ctx.strokeStyle = color
		ctx.lineWidth = 5
		ctx.lineCap = 'round'
		ctx.beginPath()
		ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
		canvas.addEventListener('mousemove', handleMouseMove)
  	}
    
  	const handleMouseUp = () => {
		const canvas = canvasRef.current
		canvas.removeEventListener('mousemove', handleMouseMove)
  	}
    
  	const handleMouseMove = (e) => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
		ctx.stroke()
  	}
    
  	const sendDataToServer = async (dataURL) => {
		try {
			await axios.post(APIendpoint+'/images', { dataURL }).then((res) => {
			console.log(res.data);
		});
		} catch (error) {
			console.error(error);
		}
  	};
  
  // Drawing and canvas manipulation functions here
  const saveCanvasAsImage = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    
    // Send dataURL to the server
    sendDataToServer(dataURL);
  };


  return (
  <>
    <div>
      <label htmlFor="color-picker">Color:</label>
      <input
        type="color"
        id="color-picker"
        value={color}
        onChange={handleColorChange} />
  
      <label htmlFor="bg-color-picker">Background color:</label>
      <input
        type="color"
        id="bg-color-picker"
        value={bgColor}
        onChange={handleBgColorChange} />
  
      <canvas
        ref={canvasRef}
        width={400}
        height={800}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp} />
      <button onClick={saveCanvasAsImage}>Save Image</button>
    </div>
  </>
  );
}
  
export default NewPost;