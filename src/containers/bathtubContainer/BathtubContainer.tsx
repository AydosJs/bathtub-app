import dayjs from "dayjs";
import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MainContainer from "../../layout/MainContainer";
import { IBathtub, IReqMaterials } from "../../store/bathTubMaking/bathTubMaking";
import { IBathtubSizes } from "../../store/bathtubType/bathtubTypeSlice";
import { RootState } from "../../store/Store";

interface ITotalPrice {
  totalPrice: number
}

function BathtubContainer() {
  const { bathtubs } = useSelector((state: RootState) => state.bathtubMaking);
  // 

  const totalPrice = {
    usd: 0,
    uzs: 0
  }
  const calculatePrice = (bathtubItem: IBathtub) => {
    let materialsTotalPriceUSD = 0
    let materialsTotalPriceUZS = 0

    bathtubItem?.materials?.map((item: IReqMaterials) => {
      if (item?.material?.currency?.value === 'usd') {
        materialsTotalPriceUSD += item?.requiredAmount?.floatValue * Number(item?.material?.prices?.floatValue)
      } else if (item?.material?.currency?.value === 'uzs') {
        materialsTotalPriceUZS += item?.requiredAmount?.floatValue * Number(item?.material?.prices?.floatValue)
      }
    })

    totalPrice['usd'] = bathtubItem?.type?.requiredAmount?.floatValue * materialsTotalPriceUSD
    totalPrice['uzs'] = bathtubItem?.type?.requiredAmount?.floatValue * materialsTotalPriceUZS

    return totalPrice
  }

  const [query, setQuery] = useState("");


  return (
    <MainContainer >

      <h1 className="mb-4 text-xl font-medium text-gray-900">
        Bathtubs
      </h1>

      {/* LIST */}
      <div className="basis-4/6 bg-white p-4 flex flex-col">

        {/* SEARCH & FILTER */}
        <div className="flex flex-row space-x-2 items-center">
          <div className="basis-5/6">
            <input
              name="search"
              id="search"
              type="text"
              placeholder="Search..."
              className="border text-sm rounded w-full p-2.5"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="basis-1/6 ">
            <Link to="/bathtub-making">
              <button className="w-full bg-blue-600 h-full p-2.5 rounded text-white font-medium opacity-50 hover:opacity-100">
                Add
              </button>
            </Link>
          </div>
        </div>

        <div className=" border-b-4 border-gray-50 mt-4 mb-2"></div>

        {/* HEADER */}
        <div className="flex flex-row items-center justify-around border-b px-2 py-3 ">
          <p className="min-w-10 max-w-12 w-10 text-sm font-medium text-gray-300 group-hover:text-gray-900">
            #
          </p>
          <p className="w-1/2 text-sm font-medium ">
            Title
          </p>
          <p className="w-1/2 text-sm font-medium ">
            Amount
          </p>
          <p className="w-1/2 text-sm font-medium ">
            Sizes
          </p>
          <p className="w-1/2 text-sm font-medium ">
            Materials Price
          </p>
          <p className="w-1/2 text-sm font-medium ">
            Total Price
          </p>
          <p className="w-1/2 text-sm font-medium ">
            Created At
          </p>
        </div>

        {/* Items */}
        {bathtubs.length !== 0 ? bathtubs
          .filter((list: IBathtub) => {
            if (query === "") {
              return list;
            } else if (
              list?.type?.typeInfo?.title
                .toLowerCase()
                .includes(query.toLocaleLowerCase())
            ) {
              return list;
            }
          })
          .map((item: IBathtub, index: number) => (
            <Link to={`/bathtub/${item?.id}`}>
              <div key={index} className="group flex flex-row items-center justify-around border-b px-2 py-4 last:border-none hover:cursor-pointer hover:bg-gray-100">
                <p className="min-w-10 max-w-12 w-10 text-sm font-medium text-gray-300 group-hover:text-gray-900">
                  {index}
                </p>
                <p className="w-1/2 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                  {item?.type?.typeInfo?.title}
                </p>
                <p className="w-1/2 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                  {item?.type?.requiredAmount?.formattedValue}
                </p>
                <p className="w-1/2 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                  <div className="flex flex-row space-x-2 max-w-[216px] overflow-hidden">
                    {item?.sizes?.map((item: IBathtubSizes, index: number) => index <= 2 ? <p key={index} className="p-0.5 group-hover:bg-white text-xs border rounded">{item?.size}</p> : null)}
                  </div>
                </p>
                <p className="w-1/2 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                  <NumberFormat
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                    className="text-sm font-medium text-gray-500 group-hover:text-gray-900"
                    value={calculatePrice(item)?.usd} />
                </p>
                <p className="w-1/2 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                  <NumberFormat
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'UZS '}
                    className="text-sm font-medium text-gray-500 group-hover:text-gray-900"
                    value={calculatePrice(item).uzs} />
                </p>
                <p className="w-1/2 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                  {dayjs(item?.createdAt).format('MMMM D, YYYY')}
                </p>
              </div>
            </Link>
          )) : <p className="w-full text-sm font-medium text-gray-300 text-center align-center p-10">There is nothing !</p>}

      </div>

    </MainContainer >
  )
}

export default BathtubContainer