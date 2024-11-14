import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { SignIn, SignUp } from "../pages"
import { usePath } from '../hook/usePath'

function LoginRoutes() {
  return (
    <Routes>
      <Route path={usePath.signIn} element={<SignIn />} />
      <Route path={usePath.signUp} element={<SignUp />} />
    </Routes>
  )
}

export default LoginRoutes