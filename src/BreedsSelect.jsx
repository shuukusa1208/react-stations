// @ts-check

export const BreedsSelect = (props) => {
  let newDogList = props.breeds;
  let values = props.value;
  let onChange = props.onChange;
  console.log(newDogList);
  console.log(values);
  console.log(onChange);
  const listItems=newDogList.map((newDogList)=>
  <option value={newDogList} key={newDogList}>{newDogList}</option>
  );
  return (
    <>
  <select value={values} onChange={e=>onChange(e.target.value)}>
    {listItems}
    </select>
    </>
  )
}

export default BreedsSelect
