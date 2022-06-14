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
    requiredAmount: IReqAmount  | null,
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
  bathtubs :[
    // {
    //   id: "1655127262289",
    //   material: {
    //     amount: 17,
    //     createdAt: 'Mon Jun 13 2022 18:33:14 GMT+0500 (Uzbekistan Standard Time)',
    //     id: '1655127194351',
    //     currency: {
    //       label: "USD",
    //         rate:{
    //           floatValue: 10977,
    //           formattedValue: "SUM 10,977",
    //           value: "10977"
    //         },
    //       sybmol: "$",
    //       value: "usd"
    //     },
    //     measurement: {
    //       id: "1655126872001",
    //       name: "Kilogram ",
    //       symbol: "Kg"
    //     }
    //   },
    //   requiredAmount: {formattedValue: '100 Kg', value: '100', floatValue: 100}
    // }
  ]
  ,
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