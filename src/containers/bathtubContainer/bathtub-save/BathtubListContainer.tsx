import { useSelector } from "react-redux";
import MainContainer from "../../../layout/MainContainer"
import { RootState } from "../../../store/Store";
import CreateBathtubFrom from "./CreateBathtubFrom";
import { IBathtub, IBathtubSizes } from "../../../store/bathtub/bathtubSlice";
import dayjs from 'dayjs'

function BathtubListContainer() {
  const { bathtub } = useSelector((state: RootState) => state.bathtub);
  console.log("bathtub list", bathtub)

  return (
    <MainContainer>
      <div className="flex flex-row space-x-4 items-start">
        {/* LIST */}
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
              Sizes
            </p>
            <p className="min-w-40 max-w-40 w-40 text-sm font-medium ">
              Created at
            </p>
          </div>

          {/* Items */}
          {bathtub.length !== 0 ? bathtub.map((item: IBathtub, index: number) => (
            <div key={index} className="group flex flex-row items-center justify-around border-b px-2 py-4 last:border-none hover:cursor-pointer hover:bg-gray-100">
              <p className="min-w-10 max-w-12 w-10 text-sm font-medium text-gray-300 group-hover:text-gray-900">
                {index}
              </p>
              <p className="w-1/2 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                {item.title}
              </p>
              <p className="w-1/2 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                <div className="flex flex-row gap-2 flex-wrap">
                  {item.bathtubSizes.length !== 0 && item.bathtubSizes.map((item: IBathtubSizes) => (
                    <p className="px-1.5 py-0.5 border rounded-full text-xs">
                      {item.size}
                    </p>
                  ))}
                </div>
              </p>
              <p className="w-40 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                {dayjs(
                  item?.createdAt
                ).format('MMMM D, YYYY')}
              </p>

            </div>
          )) : <p className="w-full text-sm font-medium text-gray-300 text-center align-center p-10">There is nothing !</p>}

        </div>
        <div className="basis-2/6 bg-white p-4">
          <CreateBathtubFrom />
        </div>
      </div>
    </MainContainer>
  )
}

export default BathtubListContainer