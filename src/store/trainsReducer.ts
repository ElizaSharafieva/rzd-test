import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from 'axios'

interface ICharacteristic {
  [key: string]: number | string
}

export interface ITrain {
  id: number
  name: string
  description: string
  characteristics: ICharacteristic[]
}

export interface ITrainsState {
  trains: ITrain[]
  selectedTrain: ITrain | null
}

const initialState: ITrainsState = {
  trains: [],
  selectedTrain: null,
}

const trainsReducer = createSlice({
  name: 'trains',
  initialState,
  reducers: {
    selectTrain(state, action: PayloadAction<number>):any {
      state.selectedTrain = state.trains.find(train => train.id === action.payload) || null
    },
    updateCharacteristic(state, action: PayloadAction<{ index: number, name: string, value: string }>) {
      const { index, name, value } = action.payload
      if (state.selectedTrain) {
        const trainId = state.trains.findIndex(train => train.id === state.selectedTrain!.id)
        if (trainId !== -1) {
          state.trains[trainId].characteristics[index][name] = value
        }
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTrains.fulfilled, (state, action: PayloadAction<ITrain[] | void>) => {
        if(action.payload) {
          state.trains = action.payload
        }
      })
  }
})

export const fetchTrains = createAsyncThunk<ITrain[] | void>('trains/fetchTrains', async(): Promise<ITrain[]| void> => {
  try {
    const res = await axios.get<ITrain[]>('https://gist.githubusercontent.com/orlov-oleg-developer/49f08290d1c59a6851e0a0581900e2a7/raw/e5daf87338f3c75165f8edf4c76cc7ec9c2b4aa9/gistfile1.json')
    return res.data.map((el, index) => {
      el["id"] = index
      return el
    })
  } catch(err) {
    console.log(err)
  }
})

export default trainsReducer.reducer
export const {selectTrain, updateCharacteristic} = trainsReducer.actions