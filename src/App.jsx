import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import CreateBook from './pages/CreateBook'
import UpdateBook from './pages/UpdateBook'
import ShowBook from './pages/ShowBook'
import DeleteBook from './pages/DeleteBook'
const App = () => {
  return (
    <div >
      <Routes>
        <Route path = "/" element = {<Home />}  />
        <Route path = "/books/create" element = {<CreateBook />}  />
        <Route path = "/books/details/:id" element = {<ShowBook/>}  />
        <Route path = "/books/edit/:id" element = {<UpdateBook/>}  />
        <Route path = "/books/delete/:id" element = {<DeleteBook/>}  />

      </Routes>
    </div>
  )
}

export default App