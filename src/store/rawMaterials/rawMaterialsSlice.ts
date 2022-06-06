import { createSlice } from '@reduxjs/toolkit'
import { IUnitsMeasurement } from '../unitsMeasurement/unitsMeasurement'

export interface IMaterial {
  id?: string
  title: string,
  amount: number,
  measurement: IUnitsMeasurement | null,
  prices: string,
  currency: ICurrency | null,
  createdAt?: string
}

export interface ICurrency {
  value: string,
  label: string,
  sybmol: string,

  rate?: {
    sum: string
  }
}

export interface IMaterialsState {
  materials: IMaterial[],
  isLoading: boolean
}

const initialState: IMaterialsState = {
  materials: [
    {
      id: "1654534473244",
      amount: 200,
      currency: {value: 'usd', label: '"$" USD', sybmol: '$',rate: {sum: "10,100"} },
      measurement: {id: '1654534003222', name: 'Meter', symbol: 'm'},
      prices: "5.35",
      title: "DSP"
    },
    {
      id: "1654534473255",
      amount: 500,
      currency: {value: 'sum', label: '"SUM" UZS', sybmol: "SO'M"},
      measurement: {id: '1654534003504', name: 'Litr', symbol: 'lt'},
      prices: "25,000",
      title: "Water"
    }
  ],
  isLoading: false
}

export const materialsSlice = createSlice({
  name: 'materials',
  initialState,
  reducers: {
    createMaterial: (state: IMaterialsState, action: any) => {
      console.log("action.payload",action.payload)
      // state.isLoading = true
      state.materials.push(action.payload)
      // state.isLoading = false
    }
  },
})

export const { createMaterial } = materialsSlice.actions
export const materialReduser =  materialsSlice.reducer