import { createSlice } from '@reduxjs/toolkit'
import { IBathtubSizes, IBathtubType } from '../bathtubType/bathtubTypeSlice'
import { IMaterial } from '../rawMaterials/rawMaterialsSlice'

export interface IReqMaterials {
  requiredAmount : number,
  material: IMaterial
}

export  interface IBathtub {
  type: IBathtubType,
  sizes: IBathtubSizes[] | null,
  materials: IReqMaterials[]
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
      console.log("bathtub action.payload",action.payload)
      state.bathtubs.push(action.payload)
    }
  },
})

export const { createBathtubMaking } = bathTubMakingSlice.actions
export const bathtubMakingReducer =  bathTubMakingSlice.reducer