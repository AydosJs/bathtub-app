import { useState } from "react";
import { FieldArray, FormikProvider, useFormik } from "formik";
import * as Yup from 'yup';
import { createBathtub, IBathtub } from "../../../store/bathtub/bathtubSlice";
import { useDispatch } from "react-redux";

export default function CreateBathtubFrom() {
  const dispatch = useDispatch()
  const [sizesInput, setSizesInput] = useState('')
  const sizeMatch = /\d{2,3}x\d{2,3}/
  const [sizeMatchError, setSizeMatchError] = useState({
    error: false,
    message: ''
  })

  const bindError = (msg: string) => {
    setSizeMatchError({
      error: true,
      message: msg
    })
  }

  const formik = useFormik<IBathtub>({
    initialValues: {
      title: '',
      bathtubSizes: []
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      bathtubSizes: Yup.array().min(1, 'YOU MUST ADD AT LEAST ONE SZIE !').of(Yup.object().shape({
        size: Yup.string().matches(sizeMatch, 'Size format didnt matche').required('Required')
      }))
    }),
    onSubmit: (values: IBathtub) => {
      console.log("BATHTUB FINAL VALUE", values)
      dispatch(createBathtub({
        id: String(Date.now()),
        createAt: String(new Date()),
        ...values,
      }))
      formik.resetForm()
    }
  });

  return (
    <form className="bg-white flex flex-col space-y-2" onSubmit={formik.handleSubmit}>
      {/* Name */}
      <div className="">
        <label htmlFor="title" className=" block py-3 text-sm font-medium ">Bathtub title</label>
        <input
          name="title"
          id="title"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          placeholder="glue"
          className="border text-sm rounded block w-full p-2.5" />
        {formik.errors.title && formik.touched.title &&
          <p className='text-sm text-red-500 mt-2 font-medium'>
            {formik.errors.title}
          </p>
        }
      </div>

      {/* Sizes */}
      <div className="">
        <FormikProvider value={formik}>
          <FieldArray
            name="bathtubSizes"
            render={arrayHelpers => (
              <div>

                <label htmlFor="bathtubSizes" className=" block py-3 text-sm font-medium ">
                  Sizes
                </label>
                {formik.values.bathtubSizes && formik.values.bathtubSizes.length > 0 ? (
                  <div className="flex flex-row gap-2 flex-wrap">
                    {formik.values.bathtubSizes.map((item: any, index: number) => (
                      <div
                        onClick={() => arrayHelpers.remove(index)}
                        className="p-2 border hover:cursor-pointer hover:bg-gray-100 rounded text-center flex items-center justify-center">
                        <p key={index} className="text-sm ">
                          {item.size}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm p-2 py-2.5 align-center text-red-500 font-medium border border-red-100 bg-red-50 rounded text-center">
                    YOU MUST ADD AT LEAST ONE SZIE !
                  </p>
                )}


                <div className="mt-6">
                  <div className="flex flex-row space-x-2">
                    <input
                      type="text"
                      // onKeyUp={(e) => (e?.keyCode == 13 && sizesInput.length !== 0 && sizesInput.match(sizeMatch)) ? (
                      //   arrayHelpers.push({ id: String(Date.now()), size: sizesInput, createdAt: String(new Date()) }),
                      //   setSizesInput(''),
                      // setSizeMatchError({
                      //   error: false,
                      //   message: ''
                      // })
                      // ) : null
                      // }
                      // onKeyUp={(e) => e?.keyCode == 13 ? false : null}
                      onChange={(e) => (
                        setSizesInput(e.target?.value),
                        setSizeMatchError({
                          error: false,
                          message: ''
                        })
                      )}
                      onBlur={formik.handleBlur}
                      value={sizesInput}
                      placeholder="180x180"
                      className="basis-4/6 border text-sm rounded block w-full p-2.5"
                    />

                    <button type="button" className="text-sm basis-2/6 opacity-50 hover:opacity-100 bg-blue-500 rounded font-medium text-white text-center px-4 py-2.5 transition duration-300 ease-in-out"
                      onClick={(e) => (sizesInput.length !== 0 && sizesInput.match(sizeMatch)) ? (
                        arrayHelpers.push({ id: String(Date.now()), size: sizesInput, createdAt: String(new Date()) }),
                        setSizesInput(''),
                        setSizeMatchError({
                          error: false,
                          message: ''
                        })
                      ) : bindError('Size format didnt match (exp: 200x200 | 2000x2000)')
                      }
                    >
                      ADD A SIZE
                    </button>
                  </div>
                  {
                    sizeMatchError.error && (
                      <p className="text-sm mt-2 text-red-500 font-medium">
                        {sizeMatchError.message}
                      </p>
                    )
                  }

                </div>

              </div>
            )}
          />
        </FormikProvider>
      </div>

      {/* SAVE */}
      <div className=''>
        <button type="submit" className="mt-5 opacity-50 hover:opacity-100 bg-blue-500 w-full rounded font-medium text-white text-center px-4 py-3 transition duration-300 ease-in-out">
          SAVE BATHTUB
        </button>
      </div>

    </form>
  )
}