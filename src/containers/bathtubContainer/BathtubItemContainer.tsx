import dayjs from "dayjs";
import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import MainContainer from "../../layout/MainContainer"
import { IBathtub, IReqMaterials } from "../../store/bathTubMaking/bathTubMaking";
import { IBathtubSizes } from "../../store/bathtubType/bathtubTypeSlice";
import { RootState } from "../../store/Store";

export default function BathtubItemContainer() {
  const { bathtubs } = useSelector((state: RootState) => state.bathtubMaking);
  const { id } = useParams()
  const bathtubItem: IBathtub = bathtubs.find((item: IBathtub) => item?.id === id)!

  const total: any = {
    usd: {
      totalMaterialsPrice: 0,
      totalPrice: 0,
    },
    uzs: {
      totalMaterialsPrice: 0,
      totalPrice: 0,
    }
  }

  const totalCaclMaterials = () => {
    bathtubItem?.materials?.map((item: IReqMaterials) => {
      console.log("itemmmm", item)
      if (item?.material?.currency?.value === 'usd') {
        total.usd.totalMaterialsPrice += item?.requiredAmount?.floatValue * item?.material?.prices?.floatValue!
      } else if (item?.material?.currency?.value === 'uzs') {
        total.uzs.totalMaterialsPrice += item?.requiredAmount?.floatValue * item?.material?.prices?.floatValue!
      }
    })

    total.usd.totalPrice = bathtubItem?.type?.requiredAmount?.floatValue * total.usd.totalMaterialsPrice
    total.uzs.totalPrice = bathtubItem?.type?.requiredAmount?.floatValue * total.uzs.totalMaterialsPrice
  }

  totalCaclMaterials()



  return (
    <MainContainer>
      {bathtubItem && (
        <div className="flex flex-col bg-white p-4">
          <div className="border-b py-4 flex flex-row flex-nowrap space-x-4 items-center">
            <span className="text-md font-medium text-gray-500">Type:</span> <span className="text-md font-medium">{bathtubItem?.type?.typeInfo?.title}</span>
          </div>

          <div className="border-b py-4 flex flex-row flex-nowrap space-x-4 items-center">
            <span className="text-md font-medium text-gray-500">Production is expected:</span> <span className="text-md font-medium">{bathtubItem?.type?.requiredAmount?.formattedValue}</span>
          </div>

          <div className="border-b py-4 flex flex-row flex-nowrap space-x-4">
            <span className="text-md font-medium text-gray-500">Sizes:</span>  <div className="flex flex-row space-x-2">
              {bathtubItem?.sizes?.map((item: IBathtubSizes, index: number) => index <= 2 ?
                <p className="p-0.5 px-1 group-hover:bg-white text-sm border rounded">{item?.size}</p>
                : null)}
            </div>
          </div>

          <div className="border-b py-4 flex flex-col space-y-4">
            <span className="text-md font-medium text-gray-500">Materials:</span>
            <div className="flex flex-col bg-gray-50 p-2.5">
              <div className="flex flex-row border-b p-2">
                <div className="basis-1/3 text-sm font-medium text-gray-500">
                  Title
                </div>
                <div className="basis-1/3 text-sm font-medium text-gray-500">
                  Price per material
                </div>
                <div className="basis-1/3 text-sm font-medium text-gray-500">
                  Required Amount
                </div>
                <div className="basis-1/3 text-sm font-medium text-gray-500">
                  Total Price per material
                </div>
              </div>
              {
                bathtubItem?.materials?.map((item: IReqMaterials) => (
                  <div className="flex flex-row border-b last:border-none p-2">
                    <div className="basis-1/3 text-sm font-medium">
                      {item?.material?.title}
                    </div>
                    <div className="basis-1/3 text-sm font-medium">
                      {item?.material?.prices?.formattedValue} <span className="text-xs text-gray-500">(1 {item?.material?.measurement?.symbol})</span>
                    </div>
                    <div className="basis-1/3 text-sm font-medium">
                      {item?.requiredAmount?.formattedValue}
                    </div>
                    <div className="basis-1/3 text-sm font-medium">
                      <NumberFormat
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={`${item?.material?.currency?.sybmol} `}
                        className="text-sm font-medium group-hover:text-gray-900"
                        value={Number(item?.requiredAmount?.floatValue) * parseFloat(String(item?.material?.prices?.floatValue))}
                      />
                    </div>
                  </div>
                ))
              }

            </div>
            <div className="flex flex-col space-y-2 p-2">
              {total.usd.totalMaterialsPrice !== 0 && (
                <div className="basis-1/3 text-sm font-medium text-gray-500">
                  Total price of materials (USD)
                  &nbsp;
                  <span className="text-md text-gray-900 font-medium">
                    <NumberFormat
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'$ '}
                      className="text-sm font-medium group-hover:text-gray-900"
                      value={total?.usd?.totalMaterialsPrice}
                    />
                  </span>
                </div>
              )}
              {total.uzs.totalMaterialsPrice !== 0 && (
                <div className="basis-1/3 text-sm font-medium text-gray-500">
                  Total price of materials (UZS)
                  &nbsp;
                  <span className="text-md text-gray-900 font-medium">
                    <NumberFormat
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'SUM '}
                      className="text-sm font-medium group-hover:text-gray-900"
                      value={total?.uzs?.totalMaterialsPrice}
                    />
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="border-b py-4 flex flex-row flex-nowrap space-x-4 items-center">
            <span className="text-md font-medium text-gray-500">Created at:</span> <span className="text-md font-medium">{dayjs(bathtubItem?.createdAt).format('MMMM D, YYYY')}</span>
          </div>

          <div className="py-4 flex flex-row flex-nowrap space-x-4 items-center">
            <span className="text-md font-medium text-gray-500">
              Total price
            </span>
            <span className="text-md font-medium">
              {total.usd.totalPrice !== 0 && (
                <>
                  <NumberFormat
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={`$ `}
                    value={total.usd.totalPrice}
                  />
                  &nbsp;
                </>
              )}

              {(total.usd.totalPrice !== 0 && total.uzs.totalPrice !== 0) && <span className="text-sm text-gray-600">and</span>}

              {total.uzs.totalPrice !== 0 && (
                <>
                  &nbsp;
                  <NumberFormat
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={`UZS `}
                    value={total.uzs.totalPrice}
                  />
                </>
              )}

            </span>
          </div>

        </div>
      )
      }
    </MainContainer >
  )
}