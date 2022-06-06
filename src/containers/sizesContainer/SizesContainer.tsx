import dayjs from "dayjs";
import { useSelector } from "react-redux";
import MainContainer from "../../layout/MainContainer"
import { IBathtubSizes } from "../../store/bathtubType/bathtubTypeSlice";
import { RootState } from "../../store/Store";
import CreateSizes from "./sizes-save/CreateSizes"

function SizesContainer() {

  const { bathtubSizes } = useSelector((state: RootState) => state.bathtubType);

  return (
    <MainContainer >
      <div className="flex flex-row space-x-4 items-start">

        {/* LIST */}
        <div className="basis-4/6 bg-white p-4 flex flex-col">

          {/* HEADER */}
          <div className="flex flex-row items-center justify-around border-b px-2 py-3 ">
            <p className="min-w-10 max-w-12 w-10 text-sm font-medium text-gray-300 group-hover:text-gray-900">
              #
            </p>
            <p className="w-1/2 text-sm font-medium ">
              Size
            </p>
            <p className="min-w-40 max-w-40 w-40 text-sm font-medium ">
              Created at
            </p>
          </div>

          {/* Items */}
          {bathtubSizes.length !== 0 ? bathtubSizes.map((item: IBathtubSizes, index: number) => (
            <div key={index} className="group flex flex-row items-center justify-around border-b px-2 py-4 last:border-none hover:cursor-pointer hover:bg-gray-100">
              <p className="min-w-10 max-w-12 w-10 text-sm font-medium text-gray-300 group-hover:text-gray-900">
                {index}
              </p>
              <p className="w-1/2 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                {item.size}
              </p>

              <p className="w-40 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                {dayjs(
                  item?.createdAt
                ).format('MMMM D, YYYY')}
              </p>

            </div>
          )) : <p className="w-full text-sm font-medium text-gray-300 text-center align-center p-10">There is nothing !</p>}

        </div>

        {/* RAW MATERIALS CRUD */}
        <div className="basis-2/6 bg-white p-4">
          <CreateSizes />
        </div>
      </div>
    </MainContainer>
  )
}

export default SizesContainer