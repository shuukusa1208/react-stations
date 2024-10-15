// DO NOT DELETE
import './App.css'
import React, {useState} from 'react';
import Description from './Description';
import Header from './Header';
import DogListContainer from './DogListContainer'

/**
 * @type {() => JSX.Element}
 */


export const App = () => {
  const [dogUrl, setDogUrl] = useState("https://images.dog.ceo/breeds/cockapoo/Guri6.jpg")
  const ChangeImageDog = () =>{
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response=>{
      return response.json()
      })
      .then(data=>{
        setDogUrl(data.message)
      })
      .catch(error=>{
        console.error('fetch error:',error)
      })
  };

  return (
    <div>
      <DogListContainer/>
      <Header/>
      <Description dogUrl={dogUrl} ChangeDogImage={ChangeImageDog}/>
      <Description dogUrl={dogUrl} ChangeDogImage={ChangeImageDog}/>

    </div>
  )
}