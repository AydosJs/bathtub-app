import MainContainer from "../../layout/MainContainer"
import StepperContainer from "../stepper/StepperContainer"

function AboutContainer() {
  return (
    <MainContainer>
      <div className="flex flex-col space-y-4">
        <div className="bg-white p-6">
          <h1 className="text-xl font-medium text-gray-900">About to create Bathtub</h1>

          <ul className="mt-8 list-disc pl-6 flex flex-col space-y-3" >
            <li className="text-md font-medium text-gray-600 ">Create needs "Unit measurments"</li>
            <li className="text-md font-medium text-gray-600 ">Create "Raw Materials"</li>
            <li className="text-md font-medium text-gray-600 ">Create needs "Sizes" one or more</li>
            <li className="text-md font-medium text-gray-600 ">Create "Bath types" one or more</li>
          </ul>

          <div className="mt-8">
            <button className="py-2.5 px-4 bg-blue-500 hover:bg-blue-700 text-white font-medium text-sm rounded">MAKE BATHTUB WITH STEPPER</button>
          </div>
        </div>

        {/* <div>
          <StepperContainer />
        </div> */}
      </div>
    </MainContainer>
  )
}

export default AboutContainer