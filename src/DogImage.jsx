// @ts-check


export const DogImage =(props)=> {
  console.log(props)
  return (
  <div>
   <img src={props.imageUrl} alt="犬の画像"/>
  </div>
  )
}

export default DogImage