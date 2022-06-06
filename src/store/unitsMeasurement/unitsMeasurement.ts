import { createSlice } from '@reduxjs/toolkit'

export interface IUnitsMeasurement {
  id?: number,
  name: string,
  symbol: string,
  createdAt?: string
}

export interface IUnitsMeasurmentState {
  unitsMeasurement: IUnitsMeasurement[],
  isLoading: boolean
}

const initialState: IUnitsMeasurmentState = {
  unitsMeasurement: [
    {
      id: 1,
      name: "Meter",
      symbol: "m",
      createdAt: '2022'
    },
    {
      id: 2,
      name :"Kilogram",
      symbol: "kg",
      createdAt: '2022'
    }
  ],
  isLoading: false
}

export const unitsMeasurmentsSlice = createSlice({
  name: 'measurments',
  initialState,
  reducers: {
    createMeasurment: (state: IUnitsMeasurmentState, action: any) => {
      console.log("action.payload",action.payload)
      state.unitsMeasurement.push(action.payload)
    }
  },
})

export const { createMeasurment } = unitsMeasurmentsSlice.actions
export const unitsMeasurment =  unitsMeasurmentsSlice.reducer