import { useState, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import TrainTable from '../TrainTable/TrainTable';
import TrainCharacteristicsTable from '../TrainCharacteristicsTable/TrainCharacteristicsTable';
import {selectTrain} from '../../store/trainsReducer';

// export interface Train {
//   id: number;
//   name: string;
// }

// export interface TrainState {
//   trains: {
//     selectedTrain: Train | null;
//   };
// }

const App:FC = () => {

  const dispatch = useDispatch();

  const selectedTrain = useSelector((state: TrainState) => state.trains.selectedTrain);
  const [isCharacteristicsTableOpen, setisCharacteristicsTableOpen] = useState<boolean>(false);
  const [isCharacteristicsTable, setIsCharacteristicsTable] = useState<boolean>(false);

  function handleTableClick(cityIndex: number): void {
    if(selectedTrain === null || selectedTrain.id !== cityIndex)
      dispatch(selectTrain(cityIndex))
      setisCharacteristicsTableOpen(true)
      setIsCharacteristicsTable(true)
  }

  return (
    <main className='main'>
      <TrainTable
        onTableClick = { handleTableClick }
      />
      {
        selectedTrain && 
        <TrainCharacteristicsTable 
        isCharacteristicsTable = {isCharacteristicsTable}
          isOpen={isCharacteristicsTableOpen}
        /> 
      }
    </main>
  )
}

export default App
