import { useSelector } from 'react-redux'
import { FC, ChangeEvent } from 'react'
import './TableTemplate.css'
import { RootState } from '../../store/store'

interface IColumn {
  header: string
}

interface ITableTemplateProps {
  name: string
  title: string
  column: IColumn[]
  data: (string | number | undefined)[][]
  onClick?: (index: number) => void
  isCharacteristicsTable?: boolean
  handleChangeValue?: (rowIndex: number, colIndex: number, value: string, name: string) => void
  invalidFieldCoordinate?: string []
}

const TableTemplate: FC<ITableTemplateProps> = (props) => {

  const { 
    name, 
    title, 
    column, 
    data, 
    onClick, 
    isCharacteristicsTable, 
    handleChangeValue, 
    invalidFieldCoordinate 
  } = props

  const selectedTrain = useSelector((state: RootState) => state.trains.selectedTrain)

  const columns = column.map((item, index) => (
    <th key={index} className={`table__subtitle table__${name}-subtitle`}>{item.header}</th>
  ))
  
  const rows = data.map((item, rowIndex) => (
    <tr
      key={rowIndex}
      onClick={selectedTrain?.id !== rowIndex && onClick? () => onClick(rowIndex) : undefined}
      className={`table__${name}-row`}
    >
      {item.map((data, columnIndex) => (
        <td key={columnIndex} className={`table__data table__${name}-data`}>
          {isCharacteristicsTable ? (
            <input
              key={`${rowIndex}-${columnIndex}`}
              name={columnIndex === 0 ? 'engineAmperage' : columnIndex === 1 ? 'force' : 'speed'}
              id={String(`${rowIndex}${columnIndex}`)}
              onChange={handleChangeValue ? (evt: ChangeEvent<HTMLInputElement>) =>
              handleChangeValue(rowIndex, columnIndex, evt.target.value, evt.target.name)
              : undefined}
              className={invalidFieldCoordinate && invalidFieldCoordinate.includes(`${rowIndex}${columnIndex}-${selectedTrain?.id}`) ? 'table__input error' : 'table__input'}
              value={data === undefined ? '-' : data}
              type='text'
            />
          ) 
          : 
          (
            data
          )}
        </td>
      ))}
    </tr>
  ))
  
  return (
    <div className='table__container'>
      <table className={`table table__${name} ${isCharacteristicsTable ? 'table_opened' : ''}`}>
        <caption className='table__title-container'>
          <h1>{title}</h1>
          {isCharacteristicsTable && selectedTrain && <h2>{selectedTrain.name}</h2>}
        </caption>
        <thead>
          <tr className='table__subtitle-container'>
            {columns}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  )
}

export default TableTemplate