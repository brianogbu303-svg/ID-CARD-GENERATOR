import './App.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Form from './components/Form'
import Id from './components/Id'
import Home from './components/Home'

function App () {

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
    path: `/Id`,
    element: <Id/>
  }
])

return (
  <RouterProvider router={router}/>
)

}

export default App;
