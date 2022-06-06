import { createSlice } from '@reduxjs/toolkit'

export  interface IBathtubType {
  title: string,
  id? : string,
  createdAt?: string
}

export interface IBathtubSizes {
  size: string,
  createdAt?: string,
  id?: string
}

export interface IUnitsMeasurmentState {
  bathtubTypes: IBathtubType[],
  bathtubSizes: IBathtubSizes[],
  isLoading: boolean
}

const initialState: IUnitsMeasurmentState = {
  bathtubTypes: [
    {
      createdAt: "Mon Jun 06 2022 21:43:08 GMT+0500 (Uzbekistan Standard Time)",
      id: "1654533788244",
      title: "Corner"
    }
  ],
  bathtubSizes :[
    {
      size: "120x120",
      createdAt: "Mon Jun 06 2022 21:40:38 GMT+0500 (Uzbekistan Standard Time)",
      id: "1654533638839"
    },
    {
      size: "130x130",
      createdAt: "Mon Jun 06 2022 21:42:30 GMT+0500 (Uzbekistan Standard Time)",
      id: "1654533750134"
    }
  ],
  isLoading: false
}

export const bathtubSlice = createSlice({
  name: 'Bathtub',
  initialState,
  reducers: {
    createBathtub: (state: IUnitsMeasurmentState, action: any) => {
      console.log("bathtub action.payload",action.payload)
      state.bathtubTypes.push(action.payload)
    },
    createBathtubSizes: (state: IUnitsMeasurmentState, action: any) => {
      console.log("bathtub action.payload",action.payload)
      state.bathtubSizes.push(action.payload)
    }
  },
})

export const { createBathtub,createBathtubSizes } = bathtubSlice.actions
export const bathtubTypeReducer =  bathtubSlice.reducer