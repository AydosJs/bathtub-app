import { Link, useLocation } from "react-router-dom"

function NavigationContainer() {
  const location = useLocation()

  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-2xl font-medium py-2 border-b">
        BathTub
      </h1>

      <nav className="flex flex-col space-y-2">
        <Link to="/" className={`${location?.pathname === '/' ? 'bg-gray-200' : 'hover:bg-gray-200 rounded'} p-2.5 py-3 text-sm font-medium  hover:bg-gray-200 rounded`}>
          Bathtub
        </Link>
        <Link to="/raw-materials" className={`${location?.pathname === '/raw-materials' ? 'bg-gray-200' : 'hover:bg-gray-200 rounded'} p-2.5 py-3 text-sm font-medium  hover:bg-gray-200 rounded`}>
          Raw materials
        </Link>
        <Link to="/unit-measurement" className={`${location?.pathname === '/unit-measurement' ? 'bg-gray-200' : 'hover:bg-gray-200 rounded'} p-2.5 py-3 text-sm font-medium  hover:bg-gray-200 rounded`}>
          Unit Measurement
        </Link>
        <Link to="/" className={`${location?.pathname === '' ? 'bg-gray-200' : 'hover:bg-gray-200 rounded'} p-2.5 py-3 text-sm font-medium  hover:bg-gray-200 rounded`}>
          About
        </Link>

      </nav>
    </div>
  )
}

export default NavigationContainer