type Props = {}

function HeaderComponent({ }: Props) {
  return (
    <header className="min-w-full w-full border-b py-2 flex flex-row flex-nowrap items-center justify-between">
      <div className="flex">
        <p className="text-sm text-gray-400 font-light">
          # Home page
        </p>
      </div>
      <div className="flex flex-row flex-nowrap space-x-2">
        <a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </header>
  )
}

export default HeaderComponent