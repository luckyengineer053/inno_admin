// import React, { useState, useEffect } from 'react';
// import '../index.scss'

// import { User, Check, X, Edit2 } from 'react-feather'

// const DeletePage = (props) => {
//   return (
//     <div className='delete-body'>
//       <div className='delete-top'>
//         <div className='delete-top-left'>
//           Deleting Whitelist Opportunity
//         </div>
//         <div className='delete-top-right'>
//           <X size={'10px'} />
//         </div>
//       </div>
//       <hr />
//       <div className='delete-center'>
//         Are you sure that you would like to delete the Inoooo whitelist opportunity raffle?
//       </div>
//       <div className='delete-bottom'>
//         <button>Cancel</button>
//         <button style={{ background: '#FBAD27' }}>Confirm</button>
//       </div>
//     </div>

//   )
// }

// export default DeletePage

// ** React Imports
import { Fragment, useState } from 'react'

// ** Reactstrap Imports
import {
  Card,
  Row,
  Col,
  Modal,
  Input,
  Label,
  Button,
  CardBody,
  CardText,
  CardTitle,
  ModalBody,
  ModalHeader,
  FormFeedback,
  Progress
} from 'reactstrap'

// ** Third Party Components
import Select from 'react-select'
import { User, Check, X, Edit2 } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'

import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import './edit.scss'

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' }
]

const defaultValues = {
  firstName: 'Bob',
  lastName: 'Barton',
  username: 'bob.dev'
}

const DeletePage = ({
  data,
  open,
  setOpen,
  deleteRow
}) => {
  // const { handleDeleteRow, index, agenda } = props
  // ** States
  // const [show, setShow] = useState(false)

  const [value, setValue] = useState('')

  const [startPicker, setStartPicker] = useState(new Date())
  const [endPicker, setEndPicker] = useState(new Date())
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      return null
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  const onConfirm = () => {
    deleteRow(data._id)
    setOpen(false)
  }

  return (
    <Fragment >
      {/* <Edit2
        color='#555555'
        size={18}
        className='icon'
        onClick={() => setShow(true)}
      /> */}
      {/* <button style={{ background: '#555555', color: 'white' }} onClick={() => setShow(true)}>Delete</button> */}

      <Modal isOpen={open} toggle={() => setOpen(!open)} className='modal-dialog-centered'>
        <ModalHeader className='bg-transparent' toggle={() => setOpen(!open)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5 edit'>
          <div className='delete-body'>
            <div className='delete-top'>
              <div className='delete-top-left'>
                Deleting Whitelist Opportunity
              </div>
              {/* <div className='delete-top-right'>
                <X size={'10px'} />
              </div> */}
            </div>
            <hr />
            <div className='delete-center'>
              Are you sure that you would like to delete <span style={{ fontWeight: 'bold' }}>{data.agenda}</span>?
            </div>
            <div className='delete-bottom'>
              <button onClick={() => setOpen(false)}>Cancel</button>
              <button onClick={(e) => onConfirm()} style={{ background: '#FBAD27' }}>Confirm</button>
            </div>
          </div>

        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default DeletePage
