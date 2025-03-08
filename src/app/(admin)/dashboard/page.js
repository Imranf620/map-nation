import React from 'react'
import ProtectedPage from '@/components/ProtectedPage'
import Dashboard from '@/components/Dashboard'

const page = () => {
  return (
    <div>
        <ProtectedPage>

      <Dashboard/>
        </ProtectedPage>
    </div>
  )
}

export default page
