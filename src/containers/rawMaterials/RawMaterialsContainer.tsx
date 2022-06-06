import MainContainer from "../../layout/MainContainer"
import CreateRawMaterials from "./rawMaterials-save/CreateRawMaterials"
import { useSelector } from 'react-redux';
import { IMaterial } from "../../store/rawMaterials/rawMaterialsSlice";
import { RootState } from "../../store/Store";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file


function RawMaterialsContainer() {
  const { materials } = useSelector((state: RootState) => state.rawMaterials);
  return (
    <MainContainer >
      <div className="flex flex-row space-x-4 items-start">

        {/* LIST */}
        <div className="basis-4/6 bg-white p-4 flex flex-col">

          {/* SEARCH & FILTER */}
          <div className="flex flex-row space-x-2 items-center">
            <div className="basis-1/2">
              <input
                name="search"
                id="search"
                type="text"
                placeholder="Search..."
                className="border  text-sm rounded block w-full p-2" />
            </div>
            <div className="basis-1/2">
              date picker
              {/* <DateRange
                editableDateInputs={true}
                onChange={(item: any) => setState([item.selection])}
                moveRangeOnFirstSelection={true}
                ranges={state}
                showMonthAndYearPickers={true}
              /> */}
            </div>
          </div>

          <div className=" border-b-4 border-gray-50 mt-4 mb-2"></div>

          {/* HEADER */}
          <div className="flex flex-row items-center justify-around border-b px-2 py-3 ">
            <p className="min-w-10 max-w-12 w-10 text-sm font-medium text-gray-300 group-hover:text-gray-900">
              #
            </p>
            <p className="w-1/2 text-sm font-medium ">
              Name
            </p>
            <p className="w-1/2 text-sm font-medium ">
              Amount
            </p>
            <p className="w-1/2 text-sm font-medium ">Unit measurement</p>
            <p className="w-1/2 text-sm font-medium ">Prices</p>
          </div>

          {/* Items */}
          {materials.length !== 0 ? materials.map((item: IMaterial, index: number) => (
            <div key={index} className="group flex flex-row items-center justify-around border-b px-2 py-4 last:border-none hover:cursor-pointer hover:bg-gray-100">
              <p className="min-w-10 max-w-12 w-10 text-sm font-medium text-gray-300 group-hover:text-gray-900">
                {index}
              </p>
              <p className="w-1/2 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                {item.title}
              </p>
              <p className="w-1/2 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                {item.amount}&nbsp;
                {item?.measurement?.symbol ? item?.measurement?.symbol : null}
              </p>
              <p className="w-1/2 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                {item.measurement?.name}
              </p>
              <p className="w-1/2 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                {item.prices} {item.currency?.sybmol}
              </p>
            </div>
          )) : <p className="w-full text-sm font-medium text-gray-300 text-center align-center p-10">There is nothing !</p>}

        </div>

        {/* RAW MATERIALS CRUD */}
        <div className="basis-2/6 bg-white p-4">
          <CreateRawMaterials />
        </div>
      </div>
    </MainContainer>
  )
}

export default RawMaterialsContainer