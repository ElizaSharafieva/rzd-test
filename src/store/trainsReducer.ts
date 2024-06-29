import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios'

interface Characteristic {
  [key: string]: number;
}

interface Train {
  id: number;
  name: string;
  description: string;
  characteristics: Characteristic[];
}

interface TrainsState {
  trains: Train[];
  selectedTrain: Train | null;
}

const initialState: TrainsState = {
  trains: [],
  selectedTrain: null,
};

const trainsReducer = createSlice({
  name: 'trains',
  initialState,
  reducers: {
    selectTrain(state, action: PayloadAction<number>) {
      state.selectedTrain = state.trains.find(train => train.id === action.payload) || null
    },
    updateCharacteristic(state, action: PayloadAction<{ index: number; name: string; evt: any }>) {       //ПОТОМ ИСПРАВИТЬ ЭНИ ТИП
      const { index, name, evt } = action.payload;
      if (state.selectedTrain) {
        const trainId = state.trains.findIndex(train => train.id === state.selectedTrain!.id);
        if (trainId !== -1) {
          state.trains[trainId].characteristics[index][name] = evt;
        }
      }
    },
  },
  extraReducers(builder) {
    builder
      // .addCase(fetchTrains.pending, (state, action) => {
      //   state.status = 'loading'
      // })
      .addCase(fetchTrains.fulfilled, (state, action: PayloadAction<Train[] | void>) => {
        if(action.payload) {
          state.trains = action.payload
        }
        // state.status = 'succeeded'
      })
      // .addCase(fetchTrains.rejected, (state, action) => {
      //   state.status = 'failed'
      //   state.error = action.error.message
      // })
  }
})

// export const fetchTrains = createAsyncThunk<Train[] | undefined>('trains/fetchTrains', async() => {
//   try {
//     const res = await axios.get<AxiosResponse<Train[]>>('https://gist.githubusercontent.com/orlov-oleg-developer/49f08290d1c59a6851e0a0581900e2a7/raw/e5daf87338f3c75165f8edf4c76cc7ec9c2b4aa9/gistfile1.json')
//     // console.log('kek')
//     // console.log(response)
//     // console.log(response.data.map((el, index) => {
//     //   el["id"] = index;
//     //   return el;
//     // }))
//     return res.data.map((el, index) => {
//       el["id"] = index;
//       return el;
//     });
//   } catch(err) {
//     console.log(err)
//   }
// })
export const fetchTrains = createAsyncThunk<Train[] | void>('trains/fetchTrains', (): Promise<Train[]| void> => {
  return axios.get<Train[]>('https://gist.githubusercontent.com/orlov-oleg-developer/49f08290d1c59a6851e0a0581900e2a7/raw/e5daf87338f3c75165f8edf4c76cc7ec9c2b4aa9/gistfile1.json')
    .then(res => {
      return res.data.map((el, index) => {
          el["id"] = index;
          return el;
        });
    })
    .catch(err => {
      console.log(err)
    })
})

export default trainsReducer.reducer
export const {selectTrain, updateCharacteristic} = trainsReducer.actions;