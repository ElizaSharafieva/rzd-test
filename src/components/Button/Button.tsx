import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './Button.css'

function Button(props) {

  const trains = useSelector(state => state.trains.trains)
  const selectedTrain = useSelector(state => state.trains.selectedTrain)

  const [originalObject, setOriginalObject] = useState(trains);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (selectedTrain && JSON.stringify(originalObject[selectedTrain.id].characteristics) !== JSON.stringify(trains[selectedTrain.id].characteristics))
      {setIsButtonDisabled((props.invalidFieldCoordinate.some((item) => {
        return (Number(item.substring(item.lastIndexOf('-')+1)) === selectedTrain.id)
      })))} else setIsButtonDisabled(true)
  }, [props.invalidFieldCoordinate, selectedTrain])

  const handleSubmit = () => { 
    const speed = [];    
    trains[selectedTrain.id].characteristics.forEach((item) => {
      speed.push(Number(item.speed))
    })
    console.log(speed.sort((a,b) => a-b))
    setIsButtonDisabled(true)
    setOriginalObject(Object.assign({}, originalObject, trains))
  };

  return (
    <button 
      className='button' 
      type='submit' 
      disabled={isButtonDisabled}
      onClick={handleSubmit}
    >
      Отправить данные
    </button>
  )
}

export default Button;