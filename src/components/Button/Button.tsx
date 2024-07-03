import { useState, useEffect, FC, useCallback } from 'react'
import { useSelector } from 'react-redux'
import './Button.css'
import { RootState } from '../../store/store'
import _isEqual from 'lodash/isEqual'
import {ITrain} from '../../store/trainsReducer'

interface IButtonProps {
  invalidFieldCoordinate: string[] | undefined
}

const Button: FC<IButtonProps> = ({ invalidFieldCoordinate = [] }) => {

  const { trains, selectedTrain } = useSelector((state: RootState) => state.trains)

  const [originalObject, setOriginalObject] = useState<Record<number, ITrain>>(trains)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const deepEqual = useCallback(<T,>(obj1: T, obj2: T): boolean => {
    return _isEqual(obj1, obj2)
  }, [])

  useEffect(() => {
    if (selectedTrain && !deepEqual(originalObject[selectedTrain.id].characteristics, trains[selectedTrain.id].characteristics)) {
      setIsButtonDisabled(
        invalidFieldCoordinate.some((item) => Number(item.substring(item.lastIndexOf('-')+1)) === selectedTrain.id)
      )
    } else {
      setIsButtonDisabled(true)
    }
  }, [invalidFieldCoordinate, selectedTrain, originalObject, trains, deepEqual])

  const handleSubmit = () => {
    const speed: number[] = []    
    trains[selectedTrain!.id].characteristics.forEach((item) => {
      speed.push(Number(item.speed))
    })
    console.log(speed.sort((a,b) => a-b))
    setIsButtonDisabled(true)
    setOriginalObject(prevOriginalObject => ({
      ...prevOriginalObject,
      [selectedTrain!.id]: {
        ...prevOriginalObject[selectedTrain!.id],
        characteristics: [...trains[selectedTrain!.id].characteristics]
      }
    }))
  }

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

export default Button