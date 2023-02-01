import React, { useState, useEffect } from 'react'

import {
  Card,
  Table
} from 'reactstrap'
// custom components

import ChangePasswordModal from '../subscriberDash/changePassword'

import './index.scss'
// redux
import { updatePassword } from './store'
import { useDispatch } from 'react-redux'

const Overview = ({ data }) => {
  const dispatch = useDispatch()
  const [passwordOpen, setPasswordOpen] = useState(false)

  const updatePasswordData = (updatedData) => {
    dispatch(updatePassword(updatedData))
  }

  return (
    <>
      <Card className='overviewBody'>
        <div>Overview</div>
        <hr />
        <table>
          <tbody>
            <tr>
              <td className='overviewLeft'>Display Name</td>
              <td className='overviewRight'>admin</td>
            </tr>
            <tr>
              <td className='overviewLeft'>Added Projects</td>
              <td className='overviewRight'>10</td>
            </tr>
            <tr>
              <td className='overviewLeft'>Project Refferals</td>
              <td className='overviewRight'>5</td></tr>
            <tr>
              <td className='overviewLeft'>Requests Handled</td>
              <td className='overviewRight'>23</td>
            </tr>
            <tr>
              <td className='overviewLeft'>Password</td>
              <td className='overviewRight' onClick={() => setPasswordOpen(true)}>
                <span>Change Password</span>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
      <ChangePasswordModal
        open={passwordOpen}
        setOpen={setPasswordOpen}
        currentPass={data.password}
        updatePassword={updatePasswordData}
      />
    </>
  )
}

export default Overview