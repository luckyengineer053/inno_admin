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
// import './edit.scss'

const defaultValues = {
  firstName: 'Bob',
  lastName: 'Barton',
  username: 'bob.dev'
}

// mode 0: Edit  1: view  2: add
const EditDaoVoitng = ({
  open,
  setOpen,
  mode,
  data,
  handleSubmitModal,
  handleEditChange,
  handleDateChange,
  startDate,
  endDate,
  hostedProjectName
}) => {

  const [errors, setErrors] = useState({})
  const handleValidation = () => {
    const fields = data
    const errors1 = {}
    let formIsValid = true
    console.log('data: ', data)

    if (data.agenda === '') {
      formIsValid = false
      errors1['agenda'] = true
    }

    if (data.options[0].option === '') {
      formIsValid = false
      errors1['option0'] = true
    }

    if (data.options[1].option === '') {
      formIsValid = false
      errors1['option1'] = true
    }

    console.log('error: ', errors1)
    setErrors(errors1)
    return formIsValid
  }

  const handleSubmit = () => {
    const isValid = handleValidation()
    if (isValid) {
      handleSubmitModal()
      setErrors({})
    }
  }

  const handleClose = () => {
    setErrors({})
    setOpen(false)
  }
  // ** Hooks
  const {
    control,
    setError
    // handleSubmit,
    // formState: { errors }
  } = useForm({ defaultValues })

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

  const getLeftTime = (start, end) => {
    const a = new Date().getTime()
    const b = new Date(end).getTime()
    const c = (b - a) / 1000
    const hours = Math.floor(c / 3600)
    const mins = Math.floor((c % 3600) / 60)
    const sec = Math.floor(c % 60)

    return `${hours}:${mins}:${sec}`
  }

  const getStatus = (start, end) => {
    const currentTime = new Date().getTime()
    if (currentTime >= new Date(start).getTime() && currentTime < new Date(end).getTime()) {
      return 'Ongoing'
    } else if (currentTime > new Date(end).getTime()) {
      return 'Ended'
    } else {
      return 'Not Started'
    }
  }
  console.log('error', errors)

  return (
    <Fragment >
      <Modal isOpen={open} toggle={handleClose} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={handleClose}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5 edit'>
          <div className='text-left mb-2'>
            <h1 className='mb-1'>{mode === 0 ? "Editing" : mode === 2 ? "Add" : ''} DAO Voting Agenda</h1>
            <p className='sub-title'>Hosted by: {hostedProjectName || ''}</p>
          </div>
          <Row tag='form' className='gy-1 pt-75' >
            <Col xs={mode === 2 ? 12 : 7}>
              <Label className='form-label' for='agneda'>
                Agenda <span className='text-danger'>*</span>
              </Label>
              {
                mode === 1 ? (
                  <div>{data.agenda}</div>
                ) : (
                  <>
                    <Controller
                      control={control}
                      name='agneda'
                      render={({ field }) => {
                        return (
                          <Input
                            // {...field}
                            id='agneda'
                            placeholder='Agenda'
                            value={data.agenda}
                            onChange={(e) => handleEditChange(e, 'agenda')}
                            invalid={errors.agneda && true}
                            type='textarea'
                            style={{ minHeight: '60px' }}
                            required
                          />
                        )
                      }}
                    />
                    {/* {<FormFeedback></FormFeedback>} */}
                    {errors.agenda && <p style={{ color: 'red' }}>Please enter a valid Agenda</p>}
                  </>
                )
              }

            </Col>
            {
              mode !== 2 && (
                <Col xs={5}>
                  <Label className='form-label' for='firstName'>

                  </Label>
                  <div className='time-left'>
                    {getStatus(data.startDate, data.endDate) === 'Ongoing' ? getLeftTime(data.startDate, data.endDate) : getStatus(data.startDate, data.endDate)}
                  </div>
                </Col>
              )
            }
          </Row>
          <hr />
          <div className='options d-flex flex-column'>
            {
              data.options.map((item, index) => {
                return (
                  <Row key={index}>
                    <Col xs={3}>
                      <Label className='form-label' for={item.option}>
                        Option {index + 1}
                        {(index === 0 || index === 1) && <span className='text-danger'>*</span>}

                      </Label>
                      {
                        mode === 1 ? (
                          <div>{item.option}</div>
                        ) : (
                          <>
                            <Controller
                              control={control}
                              name={item.option}
                              render={({ field }) => {
                                return (
                                  <Input
                                    // {...field}
                                    id={item.option}
                                    placeholder='John'
                                    value={item.option}
                                    onChange={(e) => handleEditChange(e, 'options', index)}
                                    invalid={errors.firstName && true}
                                  />
                                )
                              }}
                            />
                            {((index === 0 && errors.option0) || (index === 1 && errors.option1)) &&
                              <p style={{ color: 'red' }}>Please enter a valid option</p>}
                          </>
                        )
                      }

                    </Col>
                    <Col xs={9}>
                      <Label className='form-label' for='firstName'>
                        {item.voteNumber.length} votes
                      </Label>
                      <Progress className='mb-50' value={item.voteNumber.length} style={{ height: '35px', borderRadius: '5px', background: '#FFD690' }} barStyle={{ background: '#FBAD27', borderRadius: '5px' }} />
                    </Col>
                  </Row>
                )
              })
            }
          </div>
          <hr />

          {
            // (mode === 0 || mode === 1) && (
            <>
              <Row>
                <Col xs={12}>
                  <Label className='form-label' for='date-time-picker1'>
                    Start Date <span className='text-danger'>*</span>
                  </Label>
                  {
                    mode === 1 ? (
                      <div>{data.startDate || 'no selected'}</div>
                    ) : (
                      <Flatpickr
                        value={startDate}
                        data-enable-time
                        id='date-time-picker1'
                        className='form-control'
                        name='startDate'
                        onChange={date => handleDateChange(date, 'startDate')}
                      />
                    )
                  }
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col xs={12}>
                  <Label className='form-label' for='date-time-picker'>
                    End Date <span className='text-danger'>*</span>
                  </Label>
                  {
                    mode === 1 ? (
                      <div>{data.endDate || 'no selected'}</div>
                    ) : (
                      <Flatpickr
                        value={endDate}
                        data-enable-time
                        id='date-time-picker'
                        className='form-control'
                        name='endDate'
                        onChange={date => handleDateChange(date, 'endDate')}
                      />
                    )
                  }

                </Col>
              </Row>
            </>
            // )
          }

          {
            mode === 0 ? (
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
            ) : mode === 1 ? (
              <Col xs={12} className='text-center mt-2 pt-50 d-flex justify-content-end'>
                <Button type='reset' className='me-1' color='secondary' outline onClick={handleClose}>
                  Exit
                </Button>
              </Col>
            ) : (
              <Row>
                <Col xs={12} className='text-center mt-2 pt-50 d-flex justify-content-end gap-2'>
                  <Button type='submit' color='primary' onClick={handleSubmit}>
                    Create
                  </Button>
                  <Button type='reset' className='me-1' color='secondary' outline onClick={handleClose}>
                    Exit
                  </Button>
                </Col>
              </Row>
            )
          }
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default EditDaoVoitng
