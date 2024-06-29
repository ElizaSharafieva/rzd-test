import { useEffect, FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import{ IfcSampleInterface } from './IfcSampleInterface';
import TableTemplate from '../TableTemplate/TableTemplate'
import { fetchTrains } from '../../store/trainsReducer'

interface TrainTableProps {
  onTableClick: (index: number) => void;
}

// interface Train {
//   id: number;
//   name: string;
//   description: string;
// }

const TrainTable: FC<TrainTableProps> = ({ onTableClick }) => {

  const dispatch = useDispatch();
  const trains = useSelector(state => state.trains.trains)

  const newtrains = trains.map((i) => [i.name, i.description])

  useEffect(() => {
    dispatch(fetchTrains())
  }, [dispatch])
  
  const column = [
    { header: 'Название'},
    { header: 'Описание'},
  ]

  return (
    <TableTemplate
      name = 'train'
      title = 'Поезда'
      column = {column} 
      data = {newtrains} 
      onClick = {onTableClick}
    />
  )
}

export default TrainTable