import styles from './Popup.module.css'
import { useState } from "react"
import { useDispatch } from 'react-redux'
import { addImage } from "../../store/redux/slideActionCreators.ts"


type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const dispatch = useDispatch()

  const [img, setImg] = useState("")
  const [res, setRes] = useState<any[]>([])
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null)

  const ACCESS_KEY = 'ierc4Z7l_XqgrFoGJ5Lsp1F21Xo-L2V1TDdD9GkVmAw'

  const fetchRequest = async () => {
    if (!img) return

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${img}&page=1&per_page=10&client_id=${ACCESS_KEY}`
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const dataJ = await response.json()
      const result = dataJ.results || []
      console.log(result)
      setRes(result)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const Submit = () => {
    fetchRequest()
    setImg("")
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  const handleImageClick = (id: number, url: string) => {
    if (selectedImageId === id) {
      setSelectedImageId(null)
      setSelectedImageUrl(null)
    } else {
      setSelectedImageId(id)
      setSelectedImageUrl(url)
    }
  }

  const handleAddImage = async () => {
    if (selectedImageUrl) {
      try {
        const response = await fetch(selectedImageUrl)
        const blob = await response.blob()
        const file = new File([blob], "downloaded_image.jpg", { type: blob.type })

        dispatch(addImage(file))
        console.log('Added Image:', file)
      } catch (error) {
        console.error("Error downloading image:", error)
      }
    }
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.popup}>
        <button className={styles.button} onClick={onClose}>Close</button>
        <div className={styles.search}>
          <h2>What do yoy want to find?</h2>
          <input
            className={styles.input}
            type="text"
            placeholder="Search Anything..."
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
          <button
            type="submit"
            onClick={Submit}
          >
            Search
          </button>
        </div>
        <div className={styles.images}>
          {res.length > 0 ? (
            res.map((val) => (
              <img
                key={val.id}
                className={`${styles.image} ${selectedImageId === val.id ? styles.selected : ''}`}
                src={val.urls.thumb}
                alt={val.alt_description || "Image from Unsplash"}
                onClick={() => handleImageClick(val.id, val.urls.full)}
              />
            ))
          ) : (
            <p>No images found.</p>
          )}
        </div>
        <button 
          className="btn btn-primary" 
          onClick={handleAddImage} 
          disabled={!selectedImageUrl}
        >
          Add Image
        </button>
      </div>
    </div>
  )
}

export { Popup }


/*import styles from './Popup.module.css'
import { useState, useEffect } from "react"

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const Submit = () => {
    fetchRequest()
    setImg("")
  }

  const [img, setImg] = useState("")
  const [res, setRes] = useState<any[]>([])

  const ACCESS_KEY = 'ierc4Z7l_XqgrFoGJ5Lsp1F21Xo-L2V1TDdD9GkVmAw'

  const fetchRequest = async () => {
    const data = await fetch(
     //`https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${Access_Key}`
    `https://api.unsplash.com/search/photos?query=${img}&page=1&per_page=10&client_id=${ACCESS_KEY}`
    )
    const dataJ = await data.json()
    const result = dataJ.results
    console.log(result)
    setRes(result)
  }
  useEffect(() => {
    fetchRequest()
  }, [])

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>Unsplash Images</h2>
        <input
          className="col-3 form-control-sm py-1 fs-4 text-capitalize border border-3 border-dark"
          type="text"
          placeholder="Search Anything..."
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        <button
          type="submit"
          onClick={Submit}
          className="btn bg-dark text-white fs-3 mx-3"
        >
          Search
        </button>
        <div className="col-12 d-flex justify-content-evenly flex-wrap">
          {res.map((val) => {
            return (
              <>
                <img
                  className="col-3 img-fluid img-thumbnail"
                  src={val.urls.small}
                  alt="val.alt_description"
                />
              </>
            );
          })}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export {
  Popup
}*/
