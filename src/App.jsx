import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import Homepage from './Pages/Homepage'
import AddPosts from './Pages/AddPosts'
import { SupaProvider } from './contexts/SupaContext'

const App = () => {
  const router = createBrowserRouter([
    {
      element: <Layout/>,
      children: [
        {
          path: '/',
          element: <Homepage/>
        },
        {
          path: 'add-an-idea',
          element: <AddPosts/>
        }
      ]
    }
  ])
  return (
    <SupaProvider>
      <RouterProvider router={router}/>
    </SupaProvider>
  )
}

export default App
