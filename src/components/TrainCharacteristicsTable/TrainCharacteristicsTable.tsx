import { useState, FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../TableTemplate/TableTemplate.css'
import TableTemplate from '../TableTemplate/TableTemplate'
import { updateCharacteristic } from '../../store/trainsReducer'
import { RootState } from '../../store/store'
import Button from '../Button/Button'

interface ITrainCharacteristicsTableProps {
  isCharacteristicsTable: boolean
}

const TrainCharacteristicsTable: FC<ITrainCharacteristicsTableProps> = (props) => {

  const dispatch = useDispatch()
  const [invalidFieldCoordinate, setInvalidFieldCoordinate] = useState<string[]>([])
  const trains = useSelector((state: RootState) => state.trains.trains)
  const selectedTrain = useSelector((state: RootState) => state.trains.selectedTrain)

  const selectedTrainCharacteristics = trains[selectedTrain!.id].characteristics.map(i => {
    return [i.engineAmperage, i.force, i.speed]
  })

  const toggleValidation = (index: number, column: number, isValid: boolean) => {
    const coordinate = `${index}${column}-${selectedTrain!.id}`
    if (!isValid) {
      if (!invalidFieldCoordinate.includes(coordinate)) {
        setInvalidFieldCoordinate([...invalidFieldCoordinate, coordinate])
      }
    } else {
      setInvalidFieldCoordinate(invalidFieldCoordinate.filter((item) => item !== coordinate))
    }
  }

  const validateCharacteristic = (value: string, name: string, index: number, column: number) => {
    const inputValue = Number(value)
    const basicValidation = !Number.isNaN(inputValue) && value !== ''
    let isValid = false
    switch(name) {
      case 'engineAmperage':
        isValid = basicValidation && value[value.length - 1] !== '.' && Number.isInteger(inputValue) && inputValue >= 0
        break

      case 'force': 
        isValid = basicValidation && !Number.isInteger(inputValue) && inputValue > 0 
        break

      case 'speed': 
        isValid = basicValidation && value[value.length - 1] !== '.' && Number.isInteger(inputValue) && inputValue >0
        break
    }
    toggleValidation(index, column, isValid)
  }

  function handleChangeValue(index: number, column: number, value: string, name: string) {
    validateCharacteristic(value, name, index, column)
    dispatch(updateCharacteristic({index, name, value}))
  }

  const column = [
    { header: 'Ток двигателя'},
    { header: 'Сила тяги'},
    { header: 'Скорость'},
  ]

  return (
  <div className='table__container'>
    <TableTemplate 
      name='characteristics' 
      title = 'Характеристика'
      column={column} 
      data={selectedTrainCharacteristics} 
      handleChangeValue = {handleChangeValue}
      isCharacteristicsTable = {props.isCharacteristicsTable}
      invalidFieldCoordinate={invalidFieldCoordinate}
    />
    <Button invalidFieldCoordinate={invalidFieldCoordinate}/>
  </div>
  )
}

export default TrainCharacteristicsTable