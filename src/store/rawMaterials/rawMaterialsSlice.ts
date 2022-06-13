import { createSlice } from '@reduxjs/toolkit'
import { IReqAmount } from '../bathTubMaking/bathTubMaking'
import { IUnitsMeasurement } from '../unitsMeasurement/unitsMeasurement'

export interface IMaterial {
  id?: string
  title: string,
  amount: number,
  measurement: IUnitsMeasurement | null,
  prices: IReqAmount | null,
  currency: ICurrency | null,
  createdAt?: string
}

export interface ICurrency {
  value: string,
  label: string,
  sybmol: string,

  rate?: IReqAmount | null
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
      currency: {value: 'usd', label: 'USD', sybmol: '$',
      rate: {
        floatValue: 10.100,
        formattedValue: '10,100',
        value: '10,100'
      }
    },
      measurement: {id: '1654534003222', name: 'Meter', symbol: 'm'},
      prices: {
        floatValue: 5.3,
        formattedValue: '$ 5.3',
        value: '5.3'
      }, 
      title: "DSP"
    },
    {
      id: "1654534473255",
      amount: 500,
      currency: {value: 'uzs', label: 'UZS', sybmol: "SUM"},
      measurement: {id: '1654534003504', name: 'Litr', symbol: 'lt'},
      prices: {
        floatValue: 25000,
        formattedValue: 'UZS 25,000',
        value: '25000'
      },
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