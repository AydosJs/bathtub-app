import {
  Routes,
  Route,
} from "react-router-dom";
import BathtubListContainer from "../containers/bathtubContainer/bathtub-save/BathtubListContainer";
import RawMaterialsContainer from "../containers/rawMaterials/RawMaterialsContainer";
import UnitMeasurement from "../containers/unitMeasurement/UnitMeasurement";
import BathtubContainer from '../containers/bathtubContainer/BathtubContainer'

export default function RouterContiner() {
  return (
    <Routes>
      <Route path="/" element={<BathtubContainer />} />
      <Route path="/create/bathtub" element={<BathtubListContainer />} />
      <Route path="/raw-materials" element={<RawMaterialsContainer />} />
      <Route path="/unit-measurement" element={<UnitMeasurement />} />
    </Routes>
  )
}