import { configureStore } from '@reduxjs/toolkit'
import { bathtubReducer } from './bathtub/bathtubSlice'
import { materialReduser } from './rawMaterials/rawMaterialsSlice'
import { unitsMeasurment } from './unitsMeasurement/unitsMeasurement'

export const store = configureStore({
  reducer: {
    rawMaterials: materialReduser,
    unitsMeasurments: unitsMeasurment,
    bathtub: bathtubReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch