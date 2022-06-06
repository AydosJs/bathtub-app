import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { createBathtubSizes, IBathtubSizes } from '../../../store/bathtubType/bathtubTypeSlice';

export default function CreateSizes() {
  const dispatch = useDispatch()

  const onSubmit = (values: IBathtubSizes) => {
    console.log("FINAL VALUE", values)
    dispatch(createBathtubSizes({
      id: String(Date.now()),
      createdAt: String(new Date()),
      ...values,
    }))
    formik.resetForm()
  };

  const formik = useFormik<IBathtubSizes>({
    initialValues: {
      size: ''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      size: Yup.string().matches(/(^\d{2,3}x\d{2,3})/, 'It doesn\' match with format (180x180 180x80)').required('Required')
    }),
    onSubmit
  });

  return (
    <form className="flex flex-col space-y-2" onSubmit={formik.handleSubmit}>

      {/* Size */}
      <div className="">
        <label htmlFor="title" className=" block py-3 text-sm font-medium ">Size</label>
        <input
          name="size"
          id="size"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.size}
          placeholder="180x180"
          className="border text-sm rounded block w-full p-2.5" />
        {formik.errors.size && formik.touched.size &&
          <p className='text-sm text-red-500 mt-2 font-medium'>
            {formik.errors.size}
          </p>
        }
      </div>

      {/* SAVE */}
      <div className=''>
        <button type="submit" className="mt-10 opacity-50 hover:opacity-100 bg-blue-500 w-full rounded font-medium text-white text-center px-4 py-3 transition duration-300 ease-in-out">
          SAVE
        </button>
      </div>

    </form >
  )
}

  // { value: 'Метр', label: 'Метр' },
  // { value: 'Штук', label: 'Штук' },
  // { value: 'См', label: 'См' },
  // { value: 'Литр', label: 'Литр' },
  // { value: 'Килограмм', label: 'Килограмм' },
  // { value: 'Грамм', label: 'Грамм' },
  // { value: 'Тонна', label: 'Тонна' },