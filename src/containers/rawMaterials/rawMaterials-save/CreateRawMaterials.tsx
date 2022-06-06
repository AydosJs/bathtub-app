import { useFormik } from 'formik';
import { useState } from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select'
import * as Yup from 'yup';
import { createMaterial, IMaterial } from '../../../store/rawMaterials/rawMaterialsSlice';
import { RootState } from '../../../store/Store';
import { IUnitsMeasurement } from '../../../store/unitsMeasurement/unitsMeasurement';

export const slectionColourStyles: any = {
  control: (styles: any) => ({ ...styles, height: '42px', borderColor: "#e5e7eb", overFlow: 'hidden' }),
  menu: (styles: any) => ({ ...styles, fontSize: '0.875rem', }),
  placeholder: (styles: any) => ({ ...styles, fontSize: '0.875rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }),
};

export default function CreateRawMaterials() {
  const dispatch = useDispatch()
  const { unitsMeasurement } = useSelector((state: RootState) => state.unitsMeasurments);
  const optionsMeasurment: Array<any> = unitsMeasurement.reduce((acc: any, sep: IUnitsMeasurement) => {
    acc.push({ ...sep, value: sep.name, label: sep.name })
    return acc
  }, []);
  const optionsCurrency: Array<any> = [
    { value: 'usd', label: '"$" USD', sybmol: "$" },
    { value: 'sum', label: '"SUM" UZS', sybmol: "SO'M" }
  ]

  const [initialValues, setInitialValues] = useState<IMaterial>({
    title: '',
    amount: 0,
    measurement: unitsMeasurement[0],
    prices: "",
    currency: optionsCurrency[0]
  })

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    amount: Yup.number().min(1).required('Amount is required'),

    measurement: Yup.object({
      name: Yup.string().required('Required'),
    }).required('You have to select one measurement'),

    prices: Yup.string().required('Required'),

    currency: Yup.object({
      value: Yup.string().required(),
      label: Yup.string().required()
    }).required('Required'),
  })

  const onSubmit = (values: IMaterial) => {
    // console.log("SATRTED VALUE", values)
    dispatch(createMaterial({
      id: String(Date.now()),
      createdAt: String(new Date()),
      ...values,
    }))
    setInitialValues({
      ...initialValues,
      measurement: values.measurement,
      currency: values.currency,
    })
  };

  const formik = useFormik<IMaterial>({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit
  });


  return (
    <form className="flex flex-col space-y-2" onSubmit={formik.handleSubmit}>

      {/* Name */}
      <div className="">
        <label htmlFor="title" className=" block py-3 text-sm font-medium ">Name</label>
        <input
          name="title"
          id="title"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          placeholder="glue"
          className="border focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm rounded block w-full p-2.5" />
        {formik.errors.title && formik.touched.title ? (
          <p className='text-sm text-red-500'>
            {formik.errors.title}
          </p>
        ) : null}
      </div>

      {/* Amount & Unit measurement */}
      <div className='flex flex-row space-x-2'>
        <div className="basis-1/2">
          <label htmlFor="amount" className="block py-3 text-sm font-medium ">Amount</label>
          <input
            type="number"
            min={0} max={10000}
            className="border focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm rounded block w-full p-2.5"
            placeholder="100"
            id="amount"
            name='amount'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.amount}
          />
          {formik.errors.amount && formik.touched.amount ? (
            <p className='text-sm text-red-500'>
              {formik.errors.amount}
            </p>
          ) : null}
        </div>
        <div className="basis-1/2">
          <label htmlFor="select-input" className="block py-3 text-sm font-medium ">Unit measurement</label>

          <Select
            id="measurement"
            name='measurement'
            onBlur={formik.handleBlur}
            className="text-sm rounded block w-full"
            classNamePrefix="select"
            styles={slectionColourStyles}
            options={optionsMeasurment}
            defaultValue={optionsMeasurment[0]}

            onChange={(newValue) => {
              console.log("newValue", newValue)
              formik.handleChange({
                target: {
                  type: 'change',
                  id: 'measurement',
                  name: 'measurement',
                  value: {
                    id: newValue?.id,
                    name: newValue?.name,
                    symbol: newValue?.symbol
                  },
                },
              })
            }
            }
          />
          {formik.errors.measurement && formik.touched.measurement ? (
            <p className='text-sm text-red-500'>
              {formik.errors.measurement}
            </p>
          ) : null}
        </div>
      </div>

      {/* Prices Currency */}
      <div className='flex flex-row space-x-2'>
        <div className='basis-1/2'>
          <label htmlFor="currency-input" className="block py-3 text-sm font-medium " >Prices</label>
          <NumberFormat
            id="prices"
            name='prices'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.prices}
            thousandSeparator={true}
            // prefix={'$'}
            placeholder={formik.values.currency?.value === 'usd' ? "$2.30" : "UZS 1,200"}
            className="border focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm rounded block w-full p-2.5" />
          {formik.errors.prices && formik.touched.prices ? (
            <p className='text-sm text-red-500'>
              {formik.errors.prices}
            </p>
          ) : null}
        </div>
        <div className='basis-1/2'>
          <label htmlFor="currency-input" className="block py-3 text-sm font-medium " >Currency</label>
          <Select
            id="currency"
            name='currency'
            onBlur={formik.handleBlur}
            className="text-sm rounded block w-full"
            classNamePrefix="select"
            styles={slectionColourStyles}
            options={optionsCurrency}
            defaultValue={optionsCurrency[0]}

            onChange={(newValue) => {
              console.log("newValue", newValue)
              formik.handleChange({
                target: {
                  type: 'change',
                  id: 'currency',
                  name: 'currency',
                  value: newValue
                },
              })
            }
            }
          />
          {formik.errors.currency && formik.touched.currency ? (
            <p className='text-sm text-red-500'>
              {formik.errors.currency}
            </p>
          ) : null}
        </div>
      </div>

      {/* Dollar rate */}
      {formik.values.currency?.value === 'usd' && (
        <div className=''>
          <label htmlFor="rate" className="block py-3 text-sm font-medium " >Dollar rate</label>
          <NumberFormat
            id="currency.rate.sum"
            name='currency.rate.sum'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.currency.rate?.sum}
            thousandSeparator={true}
            // prefix={'SUM '}
            placeholder="SUM 10,100"
            className="border focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 text-sm rounded block w-full p-2.5" />
        </div>
      )}

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