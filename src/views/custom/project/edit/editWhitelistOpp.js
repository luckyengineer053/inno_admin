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
  FormFeedback
} from 'reactstrap'

import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Third Party Components
import Select from 'react-select'
import { User, Check, X, Edit2 } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'

// Card, CardHeader, CardTitle, CardBody, Input, Label

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import './edit.scss'

const defaultValues = {
  firstName: 'Bob',
  lastName: 'Barton',
  username: 'bob.dev'
}

const EditWhitelistOpp = (props) => {
  const { open, setOpen, mode, data, handleSubmitModal,
    handleEditChange,
    handleDateChange,
    startDate,
    endDate } = props
  // ** States
  const [show, setShow] = useState(false)

  const [value, setValue] = useState('')

  const [startPicker, setStartPicker] = useState(new Date())
  const [endPicker, setEndPicker] = useState(new Date())

  const [avatar, setAvatar] = useState(props.avatar ? props.avatar : '@src/assets/images/avatars/avatar-blank.png')
  // ** Hooks
  const {
    control
    // setError,
    // handleSubmit,
    // formState: { errors }
  } = useForm({ defaultValues })

  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setAvatar(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  const handleImgReset = () => {
    setAvatar(require('@src/assets/images/avatars/avatar-blank.png').default)
  }


  // const onSubmit = data => {
  //   if (Object.values(data).every(field => field.length > 0)) {
  //     return null
  //   } else {
  //     for (const key in data) {
  //       if (data[key].length === 0) {
  //         setError(key, {
  //           type: 'manual'
  //         })
  //       }
  //     }
  //   }
  // }
  const [errors, setErrors] = useState({})
  const handleValidation = () => {
    const fields = data
    const errors = {}
    let formIsValid = true

    for (const key in fields) {
      if ((key === 'agenda' || key === 'startDate'
        || key === 'endDate') && (fields[key] === '')) {
        errors[key] = true
        formIsValid = false
      }
    }
    setErrors(errors)
    return formIsValid
  }

  const handleSubmit = () => {
    const isValid = handleValidation()
    if (isValid) {
      // handleSubmitModal()
    }
  }
  const handleClose = () => {
    setErrors({})
    setOpen(false)
  }

  return (
    <Fragment>
      <Modal isOpen={open} toggle={handleClose} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={handleClose}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5 edit'>
          <div className='text-left mb-2'>
            <h1 className='mb-1'>Editing Whitelist Opportunity</h1>
            <p className='sub-title'>Hosted by: Inoooo</p>
          </div>
          <Row tag='form' className='gy-1 pt-75'>
            <Col md={7} xs={12}>
              <Row>
                <Col xs={12}>
                  <Label className='form-label' for='firstName'>
                    Project Name <span className='text-danger'>*</span>
                  </Label>
                  <Controller
                    control={control}
                    name='firstName'
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          id='firstName'
                          placeholder='John'
                          value={field.value}
                          invalid={errors.firstName && true}
                        />
                      )
                    }}
                  />
                  {errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
                </Col>
              </Row>
              <Row className='mt-1'>
                <Col xs={6}>
                  <Label className='form-label' for='firstName'>
                    Whitelist Spots <span className='text-danger'>*</span>
                  </Label>
                  <Controller
                    control={control}
                    name='firstName'
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          id='firstName'
                          placeholder='John'
                          value={field.value}
                          invalid={errors.firstName && true}
                        />
                      )
                    }}
                  />
                  {errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
                </Col>
                <Col xs={6}>
                  <Label className='form-label' for='firstName'>
                    Requirement
                  </Label>
                  <Controller
                    control={control}
                    name='firstName'
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          id='firstName'
                          placeholder='John'
                          value={field.value}
                          invalid={errors.firstName && true}
                          type='number'
                        />
                      )
                    }}
                  />
                  {errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
                </Col>
              </Row>
              <Row className='mt-1'>
                <Col xs='12'>
                  <Label className='form-label' for='firstName'>
                    Description <span className='text-danger'>*</span>
                  </Label>
                  <Controller
                    control={control}
                    name='firstName'
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          id='firstName'
                          placeholder='John'
                          style={{ minHeight: '100px' }}
                          value={field.value}
                          invalid={errors.firstName && true}
                          type='textarea'
                        />
                      )
                    }}
                  />
                  {errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
                </Col>
              </Row>
              <Row className='mt-1'>
                <Col xs={12}>
                  <Label className='form-label' for='date-time-picker'>
                    Start Date <span className='text-danger'>*</span>
                  </Label>
                  <Flatpickr
                    value={startPicker}
                    data-enable-time
                    id='date-time-picker'
                    className='form-control'
                    onChange={date => setStartPicker(date)}
                  />
                </Col>
              </Row>
              <Row className='mt-1'>
                <Col xs={12}>
                  <Label className='form-label' for='date-time-picker'>
                    End Date <span className='text-danger'>*</span>
                  </Label>
                  <Flatpickr
                    value={endPicker}
                    data-enable-time
                    id='date-time-picker'
                    className='form-control'
                    onChange={date => setEndPicker(date)}
                  />
                </Col>
              </Row>
            </Col>

            <Col md={5}>
              <Row>
                <Col xs={12}>
                  {/* <img src='/assets/img/dao.png' alt='dao' style={{ width: '100%', borderRadius: '5px' }} /> */}
                  <div className='d-flex flex-column'>
                    <div className='me-25'>
                      <img className='rounded' src={avatar} alt='Generic placeholder image' style={{ width: '100%' }} />
                    </div>
                    <div className='d-flex align-items-end mt-75 ms-1'>
                      <div>
                        <Button tag={Label} className='mb-75 me-75' size='sm' color='primary'>
                          Upload
                          <Input type='file' onChange={onChange} hidden accept='image/*' />
                        </Button>
                        <Button className='mb-75' color='secondary' size='sm' outline onClick={handleImgReset}>
                          Reset
                        </Button>
                        <p className='mb-0'>Allowed file types: PNG, JPEG, GIF
                          Dimensions: At least 500x500 pixels</p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col md='4' xs='12'>
              <Label className='form-label' for='firstName'>
                Twitter Link
              </Label>
              <Controller
                control={control}
                name='firstName'
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      id='firstName'
                      placeholder='John'
                      value={field.value}
                      invalid={errors.firstName && true}
                    />
                  )
                }}
              />
              {errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
            </Col>
            <Col md='4' xs='12'>
              <Label className='form-label' for='firstName'>
                Discord Invite Link
              </Label>
              <Controller
                control={control}
                name='firstName'
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      id='firstName'
                      placeholder='John'
                      value={field.value}
                      invalid={errors.firstName && true}
                    />
                  )
                }}
              />
              {errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
            </Col>
            <Col md='4' xs='12'>
              <Label className='form-label' for='firstName'>
                Website Link
              </Label>
              <Controller
                control={control}
                name='firstName'
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      id='firstName'
                      placeholder='John'
                      value={field.value}
                      invalid={errors.firstName && true}
                    />
                  )
                }}
              />
              {errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
            </Col>
          </Row>
          <Row>
            <Col xs={12} className='text-center mt-2 pt-50 d-flex justify-content-end'>
              <Button type='reset' className='me-1' color='secondary' outline onClick={handleClose}>
                Discard
              </Button>
              <Button type='submit' color='primary' onClick={handleSubmit}>
                Save Changes
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default EditWhitelistOpp
