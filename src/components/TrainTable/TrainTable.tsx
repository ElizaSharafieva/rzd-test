import { useEffect, FC, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TableTemplate from '../TableTemplate/TableTemplate'
import { fetchTrains, selectTrain} from '../../store/trainsReducer'
import { AppDispatch } from '../../store/store'
import { RootState } from '../../store/store'
import { ITrain } from '../../store/trainsReducer'

const TrainTable: FC = memo(() => {

  const dispatch = useDispatch<AppDispatch>()
  const trains = useSelector((state: RootState) => state.trains.trains)

  const convertedTrains = trains.map((train: ITrain) => [train.name, train.description])

  const handleClick = (index: number) => {
    dispatch(selectTrain(index))
  }

  useEffect(() => {
    dispatch(fetchTrains())
  }, [dispatch])
  
  const column = [
    { header: 'Название' },
    { header: 'Описание' },
  ]

  return (
    <TableTemplate
      name = 'train'
      title = 'Поезда'
      column = {column} 
      data = {convertedTrains} 
      onClick = {handleClick}
    />
  )
})

export default TrainTable