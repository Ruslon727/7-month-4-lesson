import { useContext } from 'react'
import './App.css'
import Header from './components/Header'
import Navbar from './components/Navbar'
import CustomRoutes from "./routes"
import LoginRoutes from './routes/LoginRoutes'
import { Context } from './context/Context'

function App() {
  // const { token } = useContext(Context)
  // if (!token) {
  //   return <LoginRoutes />
  // }
  return (
    <div>
      <Header />
      <div className='flex'>
        <Navbar />
        <div className='w-[78%] h-[87.8vh]'>
          <CustomRoutes />
        </div>
      </div>
    </div>
  )
}

export default App
