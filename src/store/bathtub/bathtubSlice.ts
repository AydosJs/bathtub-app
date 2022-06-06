import { createSlice } from '@reduxjs/toolkit'

export interface IBathtubSizes {
  size: string,
  createdAt?: string,
  id?: string
}

export  interface IBathtub {
  title: string,
  bathtubSizes: IBathtubSizes[],
  id? : string,
  createdAt?: string
}

export interface IUnitsMeasurmentState {
  bathtub: IBathtub[],
  isLoading: boolean
}

const initialState: IUnitsMeasurmentState = {
  bathtub: [],
  isLoading: false
}

export const bathtubSlice = createSlice({
  name: 'Bathtub',
  initialState,
  reducers: {
    createBathtub: (state: IUnitsMeasurmentState, action: any) => {
      console.log("bathtub action.payload",action.payload)
      state.bathtub.push(action.payload)
    }
  },
})

export const { createBathtub } = bathtubSlice.actions
export const bathtubReducer =  bathtubSlice.reducer