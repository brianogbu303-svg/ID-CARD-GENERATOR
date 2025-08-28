import './App.css'
import { createBrowserRouter} from 'react-router-dom'
import Form from './components/Form'
import Id from './components/Id'
import Home from './components/Home'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/Form",
    element: <Form/>
  },
  {
    path: `/Id/:id`,
    element: <Id/>
  }
])

export {router}
