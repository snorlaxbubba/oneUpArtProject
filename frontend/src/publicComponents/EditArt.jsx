import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditArt({ artwork, setArtwork }) {
  const [color, setColor] = useState('#000000')
  const canvasRef = useRef(null)
  const { index } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const canvas = canvasRef.current
    const img = new Image()
    img.src = `data:image/png;base64,${artwork[index]}`
    img.onload = () => {
      canvas.getContext('2d').drawImage(img, 0, 0)
    }
  }, [artwork, index])

  const handleColorChange = (e) => {
    setColor(e.target.value)
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
    const newArtwork = [...artwork]
    newArtwork[index] = dataUrl
    const updatedArtwork = newArtwork.join(',')
    localStorage.setItem('artwork', updatedArtwork)
    setArtwork(newArtwork)
    navigate.push('/art')
  }

  return (
    <div className="App">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{ border: '1px solid black' }}
      />
      <div>
        <label htmlFor="color-picker">Color:</label>
        <input
          type="color"
          id="color-picker"
          value={color}
          onChange={handleColorChange}
        />
        <button onClick={saveImage}>Save</button>
      </div>
    </div>
  )
}

export default EditArt;