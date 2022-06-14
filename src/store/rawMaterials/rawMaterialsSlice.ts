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
      amount: 200,
      createdAt: "Mon Jun 13 2022 18:30:13 GMT+0500 (Uzbekistan Standard Time)",
      currency: {value: 'uzs', label: 'UZS', sybmol: 'SUM'},
      id: "1655127013013",
      measurement: {id: '1655126973125', name: 'Gram', symbol: 'g'},
      prices: {formattedValue: 'SUM 5,000', value: '5000', floatValue: 5000},
      title: "Титан"
    },
    {
      amount: 20,
      createdAt: "Mon Jun 13 2022 18:31:29 GMT+0500 (Uzbekistan Standard Time)",
      currency: {value: 'usd', label: 'USD', sybmol: '$',
        rate: {
          floatValue: 10977,
          formattedValue: "SUM 10,977",
          value: "10977"
        }
      },
      id: "1655127089523",
      measurement: {id: '1655126809300', name: 'Litre', symbol: 'L'},
      prices: {formattedValue: '$ 2.35', value: '2.35', floatValue: 2.35},
      title: "Гелкол"
    },
    {
      amount: 17,
      createdAt: "Mon Jun 13 2022 18:33:14 GMT+0500 (Uzbekistan Standard Time)",
      currency: {value: 'usd', label: 'USD', sybmol: '$',
        rate: {
          floatValue: 10977,
          formattedValue: "SUM 10,977",
          value: "10977"
        }
      },
      id: "1655127194351",
      measurement: {id: '1655126872001', name: 'Kilogram ', symbol: 'Kg'},
      prices: {formattedValue: '$ 5', value: '5', floatValue: 5},
      title: "Стекломат"
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