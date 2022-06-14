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
      createdAt: "Mon Jun 13 2022 18:26:49 GMT+0500 (Uzbekistan Standard Time)",
      id: "1655126809300",
      name: "Litre",
      symbol: "L"
    },
    {
      createdAt: "Mon Jun 13 2022 18:27:26 GMT+0500 (Uzbekistan Standard Time)",
      id: "1655126846627",
      name: "Meter",
      symbol: "M"
    },
    {
      createdAt: "Mon Jun 13 2022 18:27:52 GMT+0500 (Uzbekistan Standard Time)",
      id: "1655126872001",
      name: "Kilogram ",
      symbol: "Kg"
    },
    {
      createdAt: "Mon Jun 13 2022 18:29:33 GMT+0500 (Uzbekistan Standard Time)",
      id: "1655126973125",
      name: "Gram",
      symbol: "g"
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