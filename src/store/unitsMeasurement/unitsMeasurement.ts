import { createSlice } from '@reduxjs/toolkit'

export interface IUnitsMeasurement {
  id?: string,
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
      createdAt: "Mon Jun 06 2022 21:49:27 GMT+0500 (Uzbekistan Standard Time)",
      id: "1654534167887",
      name: "Kilogram",
      symbol: "kg"
    },
    {
      createdAt: "Mon Jun 06 2022 21:48:55 GMT+0500 (Uzbekistan Standard Time)",
      id: "1654534135730",
      name: "Meter",
      symbol: "mt"
    },
    {
      createdAt: "Mon Jun 06 2022 21:49:55 GMT+0500 (Uzbekistan Standard Time)",
      id: "1654534195686",
      name: "Litr",
      symbol: "lt"
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