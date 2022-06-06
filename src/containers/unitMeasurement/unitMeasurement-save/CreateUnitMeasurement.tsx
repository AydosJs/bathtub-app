import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { createMeasurment, IUnitsMeasurement } from '../../../store/unitsMeasurement/unitsMeasurement';

export default function CreateUnitMeasurement() {
  const dispatch = useDispatch()

  const formik = useFormik<IUnitsMeasurement>({
    initialValues: {
      name: '',
      symbol: ''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
    }),
    onSubmit: (values: IUnitsMeasurement) => {
      const payload = {
        id: String(Date.now()),
        createdAt: String(new Date()),
        ...values
      }
      dispatch(createMeasurment(payload))
      formik.resetForm();
      console.log("MEASURMENT FINAL VALUE", payload)
    }
  });


  return (
    <form className="flex flex-col space-y-2" onSubmit={formik.handleSubmit}>

      <div className="">
        <label htmlFor="name" className=" block py-3 text-sm font-medium ">Name</label>
        <input
          name="name"
          id="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder="Kilogram"
          className="border focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm rounded block w-full p-2.5" />

        {formik.errors.name && formik.touched.name ? (
          <p className='text-sm text-red-500'>
            {formik.errors.name}
          </p>
        ) : null}
      </div>

      <div className="">
        <label htmlFor="symbol" className=" block py-3 text-sm font-medium ">Symbol</label>
        <input
          name="symbol"
          id="symbol"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.symbol}
          placeholder="kg"
          className="border focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm rounded block w-full p-2.5" />
      </div>

      <div className=''>
        <button type="submit" className="mt-10 opacity-50 hover:opacity-100 bg-blue-500 w-full rounded font-medium text-white text-center px-4 py-3 transition duration-300 ease-in-out">
          SAVE
        </button>
      </div>

    </form >
  )
}