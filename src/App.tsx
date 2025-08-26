import './App.css'
import { createBrowserRouter} from 'react-router-dom'
import Form from './components/Form'
import Id from './components/Id'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Form/>
  },
  {
    path: "/Id/:id",
    element: <Id/>
  }
])

export {router}
