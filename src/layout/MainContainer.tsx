import FooterComponent from "./FooterComponent"
import HeaderComponent from "./HeaderComponent"
import NavigationContainer from "./NavigationContainer"

type Props = {
  children: React.ReactNode
}

function MainContainer({ children }: Props) {
  return (
    <div className="flex">
      <div className=" min-w-[320px] w-80 min-h-[100vh] border-r p-6 bg-white h-screen">
        <NavigationContainer />
      </div>
      <div className="w-full p-6 overflow-y-auto h-screen flex justify-center" style={{ overflowY: "auto" }}>
        <div className="w-full max-w-7xl flex flex-col">
          <HeaderComponent />

          <main className="mt-6 " style={{ minHeight: 'calc(100vh - 214px)' }}>
            {children}
          </main>

          <FooterComponent />
        </div>
      </div>
    </div>
  )
}

export default MainContainer