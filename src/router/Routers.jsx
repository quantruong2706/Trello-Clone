import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Home } from '@/pages/home/Home'

export default createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="home" replace />
  },
  {
    path: 'home',
    element: <Home />
  },
  { path: '404', element: <div>404</div> },
  { path: '*', element: <Navigate to="404" replace /> }
])
