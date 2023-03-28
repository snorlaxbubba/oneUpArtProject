import { Link, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import EditArt from './EditArt'

function Art() {
  const [artwork, setArtwork] = useState([])

  useEffect(() => {
    const savedArtwork = localStorage.getItem('artwork') || ''
    const artworkArray = savedArtwork.split(',')
    setArtwork(artworkArray.filter(Boolean))
  }, [])

  const handleDeleteArtwork = (index) => {
    const newArtwork = [...artwork]
    newArtwork.splice(index, 1)
    const updatedArtwork = newArtwork.join(',')
    localStorage.setItem('artwork', updatedArtwork)
    setArtwork(newArtwork)
  }

  return (
    <div className="App">
      <Routes>
        <Route path={'/edit/:index'} element={<EditArt artwork={artwork} setArtwork={setArtwork} />} />

        <Route path={'/art'} element={artwork && artwork.map((dataUrl, index) => (
            <div key={index}>
              <img src={`data:image/png;base64,${dataUrl}`} alt={`Artwork ${index}`} />
              <button onClick={() => handleDeleteArtwork(index)}>Delete</button>
              <Link to={`/edit/${index}`}>Edit</Link>
            </div>
          ))} />

      </Routes>
    </div>
  )
}

export default Art;
