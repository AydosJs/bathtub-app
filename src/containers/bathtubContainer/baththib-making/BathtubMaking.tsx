import MainContainer from "../../../layout/MainContainer"
import { slectionColourStyles } from "../../rawMaterials/rawMaterials-save/CreateRawMaterials"
import * as Yup from 'yup';
import { ErrorMessage, FieldArray, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import Select from 'react-select';
import { createBathtubMaking, IBathtub, IReqAmount, IReqMaterials } from "../../../store/bathTubMaking/bathTubMaking";
import NumberFormat from "react-number-format";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IBathtubType } from "../../../store/bathtubType/bathtubTypeSlice";


function BathtubMaking() {
  const dispatch = useDispatch()
  const store = useSelector((state: RootState) => state);
  const { bathtubTypes, bathtubSizes } = store.bathtubType
  const { materials } = store.rawMaterials

  const [demoMtersial, setDeomoMaterials] = useState<IReqMaterials | any>([])
  const materialsMaker = materials.reduce((acc: any, sep) => {
    acc.push({
      id: String(Date.now()),
      requiredAmount: null,
      material: { ...sep }
    })

    return acc
  }, [])

  useEffect(() => {
    setDeomoMaterials(materialsMaker)
  }, [])

  const initialValues = {
    type: {
      requiredAmount: {
        floatValue: 1,
        formattedValue: '1',
        value: '1'
      },
      typeInfo: null
    },
    sizes: [],
    materials: []
  }

  const onSubmit = (values: IBathtub) => {
    // console.log("FINAL VALUE", values)
    const payload = {
      id: String(Date.now()),
      createdAt: String(new Date()),
      ...values
    }
    dispatch(createBathtubMaking(payload))
    formik.resetForm({ values: initialValues })
    setDeomoMaterials(materialsMaker)
    toast.success('Successfully Added')
  };

  const formik = useFormik<IBathtub>({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      type: Yup.object().shape({
        requiredAmount: Yup.object().required('Required'),
        typeInfo: Yup.object({
          title: Yup.string().required('Requred'),
        })
      }),
      sizes: Yup.array().of(
        Yup.object().shape({
          size: Yup.string().required('Required')
        })
      )
        .required('Requred')
        .min(1, 'Add at lest one size'),
      materials: Yup.array()
        .required('Requred')
        .min(1, 'Add at lest one material'),
    }),
    onSubmit
  });


  return (
    <MainContainer>
      <div className="flex flex-row justify-center">
        <form onSubmit={formik.handleSubmit} className="basis-1/2 flex flex-col space-y-2 bg-white p-4">
          {/* Type */}
          <div className="flex flex-row flex-nowrap  space-x-2">
            <div className="basis-1/2">
              <label htmlFor="select-input" className="block py-3 text-sm font-medium ">Unit measurement</label>

              <Select
                id="type.typeInfo"
                name='type.typeInfo'
                className="text-sm rounded block w-full"
                classNamePrefix="select"
                onBlur={formik.handleBlur}
                styles={slectionColourStyles}
                options={bathtubTypes}
                getOptionLabel={(option: IBathtubType) => option?.title}
                getOptionValue={(option: IBathtubType) => option?.id!}
                placeholder="Select type"
                value={formik.values.type.typeInfo}
                onChange={(value: any) => {
                  // console.log("value", value)
                  formik.handleChange({
                    target: {
                      type: 'change',
                      name: "type.typeInfo",
                      id: "type.typeInfo",
                      value
                    }
                  })
                }}
              />

              {formik.errors.type?.typeInfo && formik.touched.type?.typeInfo &&
                <p className='text-sm text-red-500 mt-2 font-medium'>
                  {formik.errors.type?.typeInfo}
                </p>
              }
            </div>
            <div className="basis-1/2">
              <label htmlFor="select-input" className="block py-3 text-sm font-medium ">Amount</label>

              <NumberFormat
                min={1} max={100000}
                id="type.requiredAmount"
                name={`type.requiredAmount`}
                onBlur={formik.handleBlur}
                thousandSeparator={true}
                placeholder="0"
                className="border text-sm rounded block w-full p-2.5"
                value={formik.values.type?.requiredAmount?.floatValue}
                onValueChange={(values) => {
                  formik.handleChange({
                    target: {
                      type: 'change',
                      name: "type.requiredAmount",
                      value: values,
                    }
                  })
                }}
              />

              {formik.errors.type?.requiredAmount && formik.touched.type?.requiredAmount &&
                <p className='text-sm text-red-500 mt-2 font-medium'>
                  {formik.errors.type?.requiredAmount}
                </p>
              }
            </div>
          </div>

          {/* SIZES */}
          <div>
            <label htmlFor="size" className=" block py-3 text-sm font-medium ">Sizes</label>
            <Select
              closeMenuOnSelect={false}
              isMulti
              id="sizes"
              name="sizes"
              placeholder="Select sizes"
              getOptionLabel={(option: any) => option?.size}
              getOptionValue={(option: any) => option?.id}
              options={bathtubSizes}
              value={formik.values.sizes}
              styles={slectionColourStyles}
              onChange={(value) => {
                formik.handleChange({
                  target: {
                    type: 'change',
                    name: "sizes",
                    value,
                  }
                })
              }}
            />
            {formik.errors.sizes && formik.touched.sizes &&
              <p className='text-sm text-red-500 mt-2 font-medium'>
                {formik.errors.sizes}
              </p>
            }
          </div>

          {/* RAW MATERIALS */}
          <div>

            {/* LABEL */}
            <div className="flex flex-row space-x-2 flex-nowrap">
              <label htmlFor="size" className="basis-1/2 block py-3 text-sm font-medium ">
                Raw materials
              </label>
              <label htmlFor="size" className="basis-1/2 block py-3 text-sm font-medium ">
                Amount
              </label>
              <div className="w-10 p-2 bg-red-500 opacity-0" />
            </div>

            {/* SELECT */}
            <FormikProvider value={formik}>
              <FieldArray
                name="materials"
                render={arrayHelpers => (
                  <div>

                    <div className="flex flex-col space-y-2">
                      {formik.values.materials.length > 0 && formik.values.materials.map((item: IReqMaterials, index: number) => (
                        <div>
                          <div className="flex flex-row space-x-2 flex-nowrap" >
                            <div className="basis-1/2">
                              <input
                                readOnly
                                name={`formik.values.materials[${index}].material.title`}
                                type="text"
                                value={`${item?.material?.title} (${item?.material.measurement?.symbol})`}
                                placeholder="Corner bath"
                                className="border text-sm rounded block w-full p-2.5" />
                            </div>
                            <div className="basis-1/2">
                              <NumberFormat
                                min={0} max={100000}
                                id="requiredAmount"
                                name={`requiredAmount`}
                                thousandSeparator={true}
                                suffix={` ${item?.material.measurement?.symbol}`}
                                placeholder="0"
                                className="border text-sm rounded block w-full p-2.5"
                                value={item?.requiredAmount?.value}
                                onValueChange={(values: any) => {
                                  item.requiredAmount = values
                                }}

                              />
                            </div>
                            <div
                              onClick={() => (
                                arrayHelpers.remove(index),
                                setDeomoMaterials([...demoMtersial, item])
                              )}
                              className="w-10 p-2 bg-red-500 opacity-50 hover:opacity-100 hover:cursor-pointer flex items-center justify-center rounded">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                          {/* {formik.errors.materials![index].requiredAmount && formik.touched.materials![index].requiredAmount &&
                            <p className='text-sm text-red-500 mt-2 font-medium'>
                              {formik.errors.materials[index]}
                            </p>
                          } */}
                        </div>
                      ))}
                    </div>

                    {demoMtersial.length !== 0 && (
                      <div className="mt-6">
                        <Select
                          closeMenuOnSelect={false}
                          placeholder="Select materials"
                          styles={slectionColourStyles}
                          options={demoMtersial}
                          defaultValue={null}
                          getOptionLabel={(option: any) => option?.material?.title}
                          getOptionValue={(option: any) => option?.material?.id}
                          onChange={(value) => {
                            arrayHelpers.push(
                              {
                                id: String(Date.now()),
                                requiredAmount: null,
                                material: {
                                  ...value.material
                                }
                              }
                            )
                            setDeomoMaterials(demoMtersial.filter((item: IReqMaterials) => item?.material.id !== value?.material?.id))
                          }}
                        />

                        {formik.errors.materials && formik.touched.materials &&
                          <p className='text-sm text-red-500 mt-2 font-medium'>
                            {formik.errors.materials as any}
                          </p>
                        }
                      </div>
                    )}

                  </div>
                )}
              />
            </FormikProvider>

          </div>

          {/* SAVE */}
          <div className=''>
            <button type="submit" className="mt-10 opacity-50 hover:opacity-100 bg-blue-500 w-full rounded font-medium text-white text-center px-4 py-3 transition duration-300 ease-in-out">
              SAVE
            </button>
          </div>

        </form>
      </div>
    </MainContainer>
  )
}

export default BathtubMaking