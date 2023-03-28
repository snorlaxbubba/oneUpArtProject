import { useState, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Paint() {
  const [color, setColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [artworks, setArtworks] = useState([])
  const canvasRef = useRef(null)
  const navigate = useNavigate()
  const APIendpoint = import.meta.env.VITE_APP_API_URL

  console.log(APIendpoint)
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

  const saveImage = () => {
    const canvas = canvasRef.current
    const dataUrl = canvas.toDataURL().split(',')[1] // remove the data type prefix
    const savedArtwork = localStorage.getItem('artwork') || ''
    const newArtwork = `${savedArtwork},${dataUrl}` // append the new artwork to the existing string
    localStorage.setItem('artwork', newArtwork)
    navigate('/art')
  }
  
  return (
    <div className="App">
      <h1>{APIendpoint}</h1>
      <div>
        <label htmlFor="color-picker">Color:</label>
        <input
          type="color"
          id="color-picker"
          value={color}
          onChange={handleColorChange}
        />
        <label htmlFor="bg-color-picker">Background color:</label>
        <input
          type="color"
          id="bg-color-picker"
          value={bgColor}
          onChange={handleBgColorChange}
        />
      </div>
      <canvas
        ref={canvasRef}
        width={400}
        height={800}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
      <button onClick={saveImage}>Save Image</button>
      <NavLink to="/art">View Art</NavLink>
    </div>
  )
}

export default Paint;