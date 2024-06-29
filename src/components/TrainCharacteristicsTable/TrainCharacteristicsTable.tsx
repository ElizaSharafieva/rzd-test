import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import TableTemplate from '../TableTemplate/TableTemplate'
import { updateCharacteristic } from '../../store/trainsReducer'
// import Button from '../Button/Button'

function TrainCharacteristicsTable(props) {

  const dispatch = useDispatch()
  const [valid, setValid] = useState(true);
  const [invalidFieldCoordinate, setInvalidFieldCoordinate] = useState([]);

  const trains = useSelector(state => state.trains.trains)
  const selectedTrain = useSelector(state => state.trains.selectedTrain)

  const selectedTrainCharacteristics = trains[selectedTrain.id].characteristics.map(i => {
    return [i.engineAmperage, i.force, i.speed]
  })

  function toggleValidation(index, column, isValid) {
    (!isValid) ? 
      invalidFieldCoordinate.includes(index + '' + column + '-' + selectedTrain.id) ?
      console.log('уже есть') 
      : setInvalidFieldCoordinate([...invalidFieldCoordinate, index + '' + column + '-' + selectedTrain.id]) 
      : setInvalidFieldCoordinate(invalidFieldCoordinate.filter((item) => {return item !== index + '' + column + '-' + selectedTrain.id}))
  }

  const validateCharacteristic = (value, name, index, column) => {
    const inputValue = Number(value);
    switch(name) {
      case 'engineAmperage':
        const isInteger = !Number.isNaN(inputValue) && value !== '' && value[value.length - 1] !== '.' && Number.isInteger(inputValue) && inputValue >= 0;
          toggleValidation(index, column, isInteger)
          break;

      case 'force': 
        const isFloat = !Number.isNaN(inputValue) && !Number.isInteger(inputValue) && inputValue > 0 && value !== '';
          toggleValidation(index, column, isFloat)
          break;

      case 'speed': 
        const isInteger2 = !Number.isNaN(inputValue) && value !== '' && value[value.length - 1] !== '.' && Number.isInteger(inputValue) && inputValue >0;
          toggleValidation(index, column, isInteger2)
          break;
      }
  };

  function handleChangeValue(index, column, evt, name) {
    setValid(validateCharacteristic(evt, name, index, column))
    dispatch(updateCharacteristic({index, column, evt, name}))
  };

  const column = [
    { header: 'Ток двигателя'},
    { header: 'Сила тяги'},
    { header: 'Скорость'},
  ]

  return (
    <TableTemplate 
      name='characteristics' 
      title = 'Характеристика'
      isOpen={props.isOpen}
      column={column} 
      data={selectedTrainCharacteristics} 
      handleChangeValue = {handleChangeValue}
      isCharacteristicsTable = {props.isCharacteristicsTable}
      valid = {valid}
      invalidFieldCoordinate={invalidFieldCoordinate}
    />
  )
}

export default TrainCharacteristicsTable