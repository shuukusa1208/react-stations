import React, { useState} from 'react'
import DogImage from "./DogImage"

export const Description = () => {
  const [imageUrl, setimageUrl] = useState(
    'https://images.dog.ceo/breeds/spaniel-brittany/n02101388_6057.jpg'
  );

  const buttonclick= () => {
  fetch('https://dog.ceo/api/breeds/image/random')
  .then(res => res.json())
  .then(data =>setDogUrl(data.message))
  .catch(error => console.error('Error:',error))
  }
return(
  <>
    <DogImage imageUrl={imageUrl}/>
    <button onClick={buttonclick}>更新</button>
  </>
  )
}

export default Description