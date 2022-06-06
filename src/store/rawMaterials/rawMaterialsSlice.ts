import { createSlice } from '@reduxjs/toolkit'
import { IUnitsMeasurement } from '../unitsMeasurement/unitsMeasurement'

export interface IMaterial {
  id?: string
  title: string,
  amount: number,
  measurement: IUnitsMeasurement | null,
  prices: string,
  currency: ICurrency | null,
  createAt?: string
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
  materials: [],
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