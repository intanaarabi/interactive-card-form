import './App.css'
import CardDisplay from './components/CardDisplay'
import CardForm from './components/CardForm'

function App() {

  return (
    <>
      <div className='flex flex-col lg:flex-row min-h-screen overflow-hidden'>
        <div className='w-screen h-[250px] lg:min-h-screen lg:w-1/4 bg-cover bg-main-desktop relative'>
        </div>
        <div className='relative lg:mt-0 lg:h-auto bg-white flex flex-col justify-center items-center flex-grow '>
          <CardForm/>
        </div>
        <CardDisplay/>
      </div>
    </>
  )
}

export default App
