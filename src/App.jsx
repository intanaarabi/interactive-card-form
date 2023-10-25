import './App.css'
import CardDisplay from './components/CardDisplay'
import CardForm from './components/CardForm'

function App() {

  return (
    <>
      <div className='flex flex-row'>
        <div className='min-h-screen w-1/4 bg-cover bg-main-desktop relative'>
        </div>
        <div className='bg-white flex flex-col justify-center items-center flex-grow'>
          <CardForm/>
        </div>
        <CardDisplay/>
      </div>
    </>
  )
}

export default App
