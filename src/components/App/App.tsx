import { FC } from 'react'
import { useSelector } from 'react-redux'
import './App.css'
import TrainTable from '../TrainTable/TrainTable'
import TrainCharacteristicsTable from '../TrainCharacteristicsTable/TrainCharacteristicsTable'
import { RootState } from '../../store/store'

const App:FC = () => {

  const selectedTrain = useSelector((state: RootState) => state.trains.selectedTrain)

  return (
    <main className='main'>
      <TrainTable/>
      {
        selectedTrain && 
        <TrainCharacteristicsTable 
          isCharacteristicsTable={true}
        />
      }
    </main>
  )
}

export default App
