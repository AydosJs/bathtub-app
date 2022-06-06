import { useSelector } from "react-redux";
import MainContainer from "../../layout/MainContainer"
import { RootState } from "../../store/Store";
import { IUnitsMeasurement } from "../../store/unitsMeasurement/unitsMeasurement";
import CreateUnitMeasurement from "./unitMeasurement-save/CreateUnitMeasurement"

function UnitMeasurement() {

  const { unitsMeasurement, isLoading } = useSelector((state: RootState) => state.unitsMeasurments);
  // console.log("unitsMeasurement", unitsMeasurement)

  return (
    <MainContainer >
      <div className="flex flex-row space-x-4 items-start">
        <div className="basis-4/6 bg-white p-4 flex flex-col">
          {/* HEADER */}
          <div className="flex flex-row items-center justify-around border-b px-2 py-3 ">
            <p className="min-w-10 max-w-12 w-10 text-sm font-medium text-gray-300 group-hover:text-gray-900">
              #
            </p>
            <p className="w-1/2 text-sm font-medium ">
              Name
            </p>
            <p className="w-1/2 text-sm font-medium ">
              Symbol
            </p>
          </div>
          {/* Items */}
          {unitsMeasurement?.length !== 0 ? unitsMeasurement.map((item: IUnitsMeasurement, index: number) => (
            <div key={index} className="group flex flex-row items-center justify-around border-b px-2 py-4 last:border-none hover:cursor-pointer hover:bg-gray-100">
              <p className="min-w-10 max-w-12 w-10 text-sm font-medium text-gray-300 group-hover:text-gray-900">
                {index}
              </p>
              <p className="w-1/2 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                {item?.name}
              </p>
              <p className="w-1/2 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                {item.symbol ? item?.symbol : 'NO SYMBOL'}
              </p>
            </div>
          )) : <p className="w-full text-sm font-medium text-gray-300 text-center align-center p-10">There is nothing !</p>}
        </div>

        {/* CRUD */}
        <div className="basis-2/6 bg-white p-4">
          <CreateUnitMeasurement />
        </div>
      </div>
    </MainContainer >
  )
}

export default UnitMeasurement