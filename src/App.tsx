import * as React from 'react'
import ListProvider from './context/listContext'
import ListIndex from './containers/ListIndex'
import List from './containers/List'
import NewList from './containers/NewList'
// import AddList from './components/AddList'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { IList } from './@types/list';




async function listLoader(): Promise<Array<IList>> {
  const resp = await fetch("http://localhost:8080/lists")
  const lists = await resp.json();
  return lists;
}

async function singleListLoader({ params }: any): Promise<IList> {
  const resp = await fetch(`http://localhost:8080/list/${params.id}`)
  const list = await resp.json()
  return list
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListIndex />,
    loader: listLoader,
  },
  {
    path: "/list/:id",
    element: <List />,
    loader: singleListLoader
  },
  {
    path: "/list/new",
    element: <NewList />,
  },
]);

export default function App() {
  return (
    <ListProvider>
      <RouterProvider router={router} />
    </ListProvider>
  )
}

