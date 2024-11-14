import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {Organization, Administration, Students, OrganizationAdd} from "../pages/"
import { usePath } from '../hook/usePath'
import OrganizationMore from '../pages/OrganizationMore'

function CustomRoutes() {
  return (
    <Routes>
        <Route path={usePath.organization} element={<Organization/>}/>
        <Route path={usePath.organizationAdd} element={<OrganizationAdd/>}/>
        <Route path={usePath.organizationEdit} element={<OrganizationAdd/>}/>
        <Route path={usePath.organizationMore} element={<OrganizationMore/>}/>
        <Route path={usePath.admin} element={<Administration/>}/>
        <Route path={usePath.students} element={<Students/>}/>
    </Routes>
)
}

export default CustomRoutes