import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  console.log(import.meta.env.VITE_APPWRITE_URL);

  return !loading ? (
    <div className='min-h-screen flex flex-col bg-gray-100'> {/* Changed to a light gray background */}
      <Header />
      <main >
        <div className='w-full'>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  ) : null
}

export default App
