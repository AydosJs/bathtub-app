import { Link } from "react-router-dom"
import { IBathtubType, IBathtubSizes } from "../../store/bathtubType/bathtubTypeSlice"

type Props = {
  item: IBathtubType
}

function BathtubCard({ item }: Props) {
  return (
    <Link to={`/item/${item?.id}`}>
      <div className="flex flex-col space-y-4 items-center bg-white hover:shadow-lg  rounded p-4 ">
        <div className="w-full">
          <p className="text-md font-middle">
            {item?.title}
          </p>
        </div>

        <div className="w-full rounded-full border-b-4 border-gray-50 "></div>

        {/* <div className="w-full flex flex-row flex-wrap gap-1">
          {item?.bathtubSizes?.map((item: IBathtubSizes) => (
            <p className="bg-white px-1.5 py-0.5 rounded-full border text-xs font-middle">
              {item?.size}
            </p>
          ))}
        </div> */}
      </div>
    </Link>
  )
}

export default BathtubCard