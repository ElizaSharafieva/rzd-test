import { useSelector, useDispatch } from 'react-redux'
import './TableTemplate.css'
import {selectTrain} from '../../store/trainsReducer'
import Button from '../Button/Button'

function TableTemplate({ name, title, column, data, isOpen, onClick, isCharacteristicsTable, handleChangeValue, valid, invalidFieldCoordinate }) {

  const selectedTrain = useSelector(state => state.trains.selectedTrain)
  
  return (
    <div className='table__container'>
      <table className={`table table__${name} ${isOpen ? 'table_opened' : ''}`}>
        <caption className='table__title-container'>
          <h1>{title}</h1>
          {
            isCharacteristicsTable ? <h2>{selectedTrain.name}</h2> : ''
          }
        </caption>
        <thead>
          <tr className='table__subtitle-container'>
            {column.map((item, index) => 
              <th key={index} className={`table__subtitle table__${name}-subtitle`}>{item.header}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {  
            data.map((item, index) => 
              <tr onClick={isCharacteristicsTable ? null :() => onClick(index)} className={`table__${name}-row`} key={index}>
                {
                  item && item.map((data, column) => {
                    return (
                      <td key={column} className={`table__data table__${name}-data`}>
                        {isCharacteristicsTable ? 
                          <input 
                            name={column === 0 ? 'engineAmperage' : column === 1 ? 'force' : 'speed'}
                            id={column} 
                            index={index}
                            onChange={((evt) => handleChangeValue(index, column, evt.target.value, evt.target.name))}
                            className={invalidFieldCoordinate.includes(index + '' + column + '-' + selectedTrain.id) ? 'table__input error' : 'table__input'}
                            value={data === undefined ? '-' : data} 
                            key={index} 
                            type='text'
                          />
                          : data}
                      </td>
                    )
                  })
                }
              </tr>
            ) 
          } 
        </tbody>
      </table>
      {
        isCharacteristicsTable ? 
          <Button
            invalidFieldCoordinate={invalidFieldCoordinate}
            data = {data}
          /> 
          : ''
      }
    </div>
  )
}

export default TableTemplate