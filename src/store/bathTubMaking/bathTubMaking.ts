import { createSlice } from '@reduxjs/toolkit'
import { IBathtubSizes, IBathtubType } from '../bathtubType/bathtubTypeSlice'
import { IMaterial } from '../rawMaterials/rawMaterialsSlice'

export interface IReqAmount {
  floatValue: number,
  formattedValue: string,
  value: string
}
export interface IReqMaterials {
  requiredAmount : IReqAmount,
  material: IMaterial,
  id?: string
}

export  interface IBathtub {
  type: {
    requiredAmount: IReqAmount,
    typeInfo: IBathtubType | null
  },
  sizes: IBathtubSizes[] | null,
  materials: IReqMaterials[],
  id?: string,
  createdAt?: string
}

export interface IBathtubMatking {
  bathtubs: IBathtub[],
  isLoading: boolean
}

const initialState: IBathtubMatking = {
  bathtubs :[],
  isLoading: false
}

export const bathTubMakingSlice = createSlice({
  name: 'Bathtub',
  initialState,
  reducers: {
    createBathtubMaking: (state: IBathtubMatking, action: any) => {
      console.log("bathtubmaking action.payload",action.payload)
      state.bathtubs.push(action.payload)
    }
  },
})

export const { createBathtubMaking } = bathTubMakingSlice.actions
export const bathtubMakingReducer =  bathTubMakingSlice.reducer