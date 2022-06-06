import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MainContainer from "../../layout/MainContainer";
import { IBathtubType } from "../../store/bathtubType/bathtubTypeSlice";
import { RootState } from "../../store/Store";
import BathtubCardList from "./BathtubCard";

function BathtubContainer() {
  const { bathtubTypes } = useSelector((state: RootState) => state.bathtubType);

  return (
    <MainContainer >

      <h1 className="mb-4 text-xl font-medium text-gray-900">
        Bathtubs
      </h1>

      <div className="grid grid-cols-4 gap-4">
        {bathtubTypes.length !== 0 && bathtubTypes.map((item: IBathtubType, index: number) => (
          <BathtubCardList item={item} />
        ))}

        <Link to="/bathtub-making">
          <div className="opacity-50 hover:opacity-100 flex items-center border-2 border-gray-400 border-dashed justify-center rounded p-4 text-center min-h-[114px]">
            <p className="text-2xl font-semibold">
              +
            </p>
          </div>
        </Link>

      </div>
    </MainContainer>
  )
}

export default BathtubContainer