import React, { useState, useEffect } from 'react'
import './App.css'
import { BreedsSelect } from './BreedsSelect'

export const DogListContainer = () => {
  const [breeds, setBreeds] = useState([])
  const [selectBreed, setSelectBreed] = useState('')
  const [images, setImages] = useState([])
  const [removeableImages, setRemoveableImages] = useState([])

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(res => res.json())
      .then(data => setBreeds(Object.keys(data.message)))
  }, [])

  const handleBreedChange = e => {
    setSelectBreed(e.target.value)
  }

  const fetchImages = () => {
    let apiUrl = 'https://dog.ceo/api/breeds/image/random/12'
    if (selectBreed) {
      apiUrl = `https://dog.ceo/api/breed/${selectBreed}/images/random/12`
    }
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setImages(data.message)
          // 不要なimgタグを追跡するためのロジック
          const removeableImageIds = images.filter(img => !document.getElementById(img)).map(img => img.split('/').pop().split('.')[0])
          setRemoveableImages(removeableImageIds)
        } else {
          console.error('Failed to fetch images:', data.message)
        }
      })
      .catch(error => {
        console.error('Error fetching images:', error)
      })
  }

  useEffect(() => {
    // 定期的に不要なimgタグを削除
    const removeUnusedImages = () => {
      const removeableImageIds = removeableImages
      removeableImageIds.forEach(id => {
        const imgElement = document.getElementById(`image-${id}`)
        if (imgElement) {
          imgElement.remove()
        }
      })
      setRemoveableImages(prevState => prevState.filter(id => !removeableImages.includes(id)))
    }

    // 5秒ごとに不要なimgタグの削除を実行
    const intervalId = setInterval(removeUnusedImages, 5000)

    // コンポーネントがアンマウントされる前にクリア
    return () => clearInterval(intervalId)
  }, [removeableImages])

  return (
    <div>
      <div className="divider"></div>
      <BreedsSelect
        breeds={breeds}
        selectBreed={selectBreed}
        onBreedChange={handleBreedChange}
        fetchImages={fetchImages}
      />
      <button className="button" onClick={fetchImages}>
        表示
      </button>
      <div className="img-grid">
        {images.map((image, index) => (
          <div key={index} className="img-grid-item">
            <img id={`image-${image.split('/').pop().split('.')[0]}`} src={image} alt={`Dog ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DogListContainer