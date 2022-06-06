import {
  Routes,
  Route,
} from "react-router-dom";
import BathtubListContainer from "../containers/bathtubContainer/bathtub-save/BathtubListContainer";
import RawMaterialsContainer from "../containers/rawMaterials/RawMaterialsContainer";
import UnitMeasurement from "../containers/unitMeasurement/UnitMeasurement";
import BathtubContainer from '../containers/bathtubContainer/BathtubContainer'
import SizesContainer from "../containers/sizesContainer/SizesContainer";
import BathtubMaking from "../containers/bathtubContainer/baththib-making/BathtubMaking";

export default function RouterContiner() {
  return (
    <Routes>
      <Route path="/" element={<BathtubContainer />} />
      <Route path="/create/bathtub" element={<BathtubListContainer />} />
      <Route path="/bathtub-making" element={<BathtubMaking />} />
      <Route path="/raw-materials" element={<RawMaterialsContainer />} />
      <Route path="/unit-measurement" element={<UnitMeasurement />} />
      <Route path="/sizes" element={<SizesContainer />} />
    </Routes>
  )
}