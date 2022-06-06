import { configureStore } from '@reduxjs/toolkit'
import { bathtubMakingReducer } from './bathTubMaking/bathTubMaking'
import {  bathtubTypeReducer } from './bathtubType/bathtubTypeSlice'
import { materialReduser } from './rawMaterials/rawMaterialsSlice'
import { unitsMeasurment } from './unitsMeasurement/unitsMeasurement'

export const store = configureStore({
  reducer: {
    rawMaterials: materialReduser,
    unitsMeasurments: unitsMeasurment,
    bathtubType: bathtubTypeReducer,
    bathtubMaking: bathtubMakingReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch