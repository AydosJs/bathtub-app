import { useState } from "react";
import { Step, Stepper } from "react-form-stepper";
import UnitMeasurement from "../unitMeasurement/UnitMeasurement";

export default function StepperContainer() {
  const [activeStep, setActiveStep] = useState(0)
  return (
    <div className="flex flex-col items-center p-4 bg-white divide-y">
      <div className="w-full">
        <Stepper activeStep={activeStep} className="" stepClassName="text-lg" >
          <Step className="bg-green-600" label="Create measurments" />
          <Step label="Create Raw materilas" />
          <Step label="Create Sizes" />
          <Step label="Create Types" />
        </Stepper>
      </div>

      <div className="mt-4 w-full rounded p-6">
        <UnitMeasurement />
      </div>

      <div className="w-full">
        <button className="py-4 mt-6 px-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-medium text-md rounded">
          READY TO NEXT STEP
        </button>
      </div>
    </div >
  )
}