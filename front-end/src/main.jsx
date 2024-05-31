import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route,RouterProvider,createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import Layout from './layout.jsx'
import CreateEvent from './components/CreateEvent.jsx'
import RegisterEvent from './components/RegisterEvent.jsx'
import EventsPage from './pages/eventpage.jsx'
import Login from './components/Loigin.jsx'
import UserEvents from './components/UserEvents.jsx'

const router=createBrowserRouter(

createRoutesFromElements(

<Route path='/' element={<Layout/>}>
<Route path='/Events' element={<UserEvents/>} />
<Route path='/Create' element={<CreateEvent/>} />
<Route path='/login' element={<Login/>} />
<Route path='/' element={<EventsPage/>} />
{/* <Route path='user/:userid' element={<User/>} /> */}

</Route>

)

)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    </React.StrictMode>,
)
