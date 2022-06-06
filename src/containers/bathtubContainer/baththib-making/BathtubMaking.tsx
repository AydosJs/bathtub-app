import MainContainer from "../../../layout/MainContainer"
import { slectionColourStyles } from "../../rawMaterials/rawMaterials-save/CreateRawMaterials"
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/Store";
import Select from 'react-select';
import { IBathtubType } from "../../../store/bathtubType/bathtubTypeSlice";
import { IBathtub, IReqMaterials } from "../../../store/bathTubMaking/bathTubMaking";
import { IMaterial } from "../../../store/rawMaterials/rawMaterialsSlice";
import NumberFormat from "react-number-format";


function BathtubMaking() {
  // const dispatch = useDispatch()
  const store = useSelector((state: RootState) => state);
  const { bathtubTypes, bathtubSizes } = store.bathtubType
  const { materials } = store.rawMaterials

  const [demoMtersial, setDeomoMaterials] = useState<IReqMaterials | any>(materials.reduce((acc: Array<IReqMaterials>, item: IMaterial) => acc.push({ requiredAmount: 0, material: {} }), []))

  const onSubmit = (values: IBathtub) => {
    console.log("FINAL VALUE", values)
  };

  const formik = useFormik<IBathtub>({
    initialValues: {
      type: {
        title: ""
      },
      sizes: [],
      materials: []
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      type: Yup.object({
        title: Yup.string().required('Requred'),
      }),
      sizes: Yup.array().of(
        Yup.object().shape({
          size: Yup.string().required('Required')
        })
      )
        .required('Requred')
        .min(1, 'Add at lest one size'),
    }),
    onSubmit
  });

  console.log("formik", formik.values)
  return (
    <MainContainer>
      <div className="flex flex-row justify-center">
        <form onSubmit={formik.handleSubmit} className="basis-1/2 flex flex-col space-y-2 bg-white p-4">

          {/* Type */}
          <div className="basis-1/2">
            <label htmlFor="select-input" className="block py-3 text-sm font-medium ">Unit measurement</label>

            <Select
              id="type"
              name='type'
              className="text-sm rounded block w-full"
              classNamePrefix="select"
              onBlur={formik.handleBlur}
              styles={slectionColourStyles}
              options={bathtubTypes}
              getOptionLabel={(option: any) => option?.title}
              getOptionValue={(option: any) => option?.id}
              placeholder="Select type"
              onChange={(value) => {
                console.log("value", value)
                formik.handleChange({
                  target: {
                    type: 'change',
                    name: "type",
                    value,
                  }
                })
              }}
            />
            {formik.errors.type?.title && formik.touched.type?.title &&
              <p className='text-sm text-red-500 mt-2 font-medium'>
                {formik.errors.type.title}
              </p>
            }
          </div>

          <div>
            <label htmlFor="size" className=" block py-3 text-sm font-medium ">Sizes</label>
            <Select
              closeMenuOnSelect={false}
              isMulti
              placeholder="Select sizes"
              // defaultValue={[bathtubSizes[4], bathtubSizes[5]]}
              getOptionLabel={(option: any) => option?.size}
              getOptionValue={(option: any) => option?.id}
              options={bathtubSizes}
              styles={slectionColourStyles}
              onChange={(value) => {
                console.log("value", value)
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

          <div>
            <div className="flex flex-row space-x-2 flex-nowrap">
              <label htmlFor="size" className="basis-1/2 block py-3 text-sm font-medium ">
                Raw materials
              </label>
              <label htmlFor="size" className="basis-1/2 block py-3 text-sm font-medium ">
                Amount
              </label>
              <div className="w-10 p-2 bg-red-500 opacity-0" />
            </div>

          </div>


          <div className="">
            <FormikProvider value={formik}>
              <FieldArray
                name="materials"
                render={arrayHelpers => (
                  <div>

                    <div className="flex flex-col space-y-2">
                      {formik.values.materials.length > 0 && formik.values.materials.map((item: IReqMaterials, index: number) => (
                        <div className="flex flex-row space-x-2 flex-nowrap" >
                          <div className="basis-1/2">
                            <input
                              readOnly
                              name={`formik.values.materials[${index}].title`}
                              type="text"
                              value={`${item.material?.title}`}
                              // (${formik.values.materials[index]?.measurement?.name})
                              placeholder="Corner bath"
                              className="border text-sm rounded block w-full p-2.5" />
                          </div>
                          <div className="basis-1/2">
                            <NumberFormat
                              min={0} max={100000}
                              id="amount"
                              name='amount'
                              thousandSeparator={true}
                              suffix={` ${item.material.measurement?.symbol}`}
                              placeholder="0"
                              className="border text-sm rounded block w-full p-2.5"
                            />
                          </div>
                          <div
                            onClick={() => (
                              arrayHelpers.remove(index),
                              setDeomoMaterials([...demoMtersial, item])
                            )}
                            className="w-10 p-2 bg-red-500 opacity-50 hover:opacity-100 hover:cursor-pointer flex items-center justify-center rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>

                    {demoMtersial.length !== 0 && (
                      <div className="mt-6">
                        <Select
                          closeMenuOnSelect={true}
                          placeholder="Select materials"
                          styles={slectionColourStyles}
                          options={demoMtersial}
                          getOptionLabel={(option: any) => option?.title}
                          getOptionValue={(option: any) => option?.id}
                          onChange={(value) => {
                            arrayHelpers.push(
                              {
                                id: String(Date.now()),
                                requiredAmount: 0,
                                material: {
                                  ...value
                                }
                              }
                            )
                            setDeomoMaterials(demoMtersial.filter((item: IReqMaterials) => item?.material.id !== value?.id))
                          }}
                        />
                      </div>
                    )}

                  </div>
                )}
              />
            </FormikProvider>
          </div>


          <div>
            {/* <label htmlFor="size" className="block py-3 text-sm font-medium ">
              Add materials
            </label>
            <Select
              id="materials"
              name='materials'
              closeMenuOnSelect={true}
              placeholder="Select materials"
              styles={slectionColourStyles}
              options={materials}
              onBlur={formik.handleBlur}
              getOptionLabel={(option: any) => option?.title}
              getOptionValue={(option: any) => option?.id}
              onChange={(value) => {
                console.log("value", value)
                formik.handleChange({
                  target: {
                    type: 'change',
                    name: "materials",
                    value,
                  }
                })
              }}
            /> */}
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