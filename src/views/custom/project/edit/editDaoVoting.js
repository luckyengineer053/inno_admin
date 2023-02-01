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
import { useForm, Controller } from 'react-hook-form'

import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
// import './edit.scss'

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
  endDate
}) => {

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
    console.log('valid: ', isValid)
    if (isValid) {
      // handleSubmitModal()
    }
  }

  const handleClose = () => {
    setErrors({})
    setOpen(false)
  }

  // ** Hooks
  const {
    control
    // handleSubmit,
    // formState: { errors }
  } = useForm({ defaultValues })

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

  return (
    <Fragment >
      <Modal isOpen={open} toggle={handleClose} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={handleClose}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5 edit'>
          <div className='text-left mb-2'>
            <h1 className='mb-1'>{mode === 0 ? "Editing" : mode === 2 ? "Add" : ''} DAO Voting Agenda</h1>
            {
              mode !== 2 ? (
                <p className='sub-title'>Hosted by: {data.hostedProject}</p>
              ) : (
                <Col xs={7}>
                  <Label className='form-label' for='hostedProject'>
                    Hosted Project <span className='text-danger'>*</span>
                  </Label>
                  <Controller
                    control={control}
                    name='hostedProject'
                    render={({ field }) => {
                      return (
                        <Input
                          // {...field}
                          id='hostedProject'
                          placeholder='Hosted Project'
                          value={data.hostedProject}
                          onChange={(e) => handleEditChange(e, 'hostedProject')}
                          invalid={errors.hostedProject && true}
                          style={{ minHeight: '45px' }}
                        />
                      )
                    }}
                  />
                  {errors.agenda && <FormFeedback>Please enter a valid Agenda</FormFeedback>}
                </Col>
              )
            }
          </div>
          <Row tag='form' className='gy-1 pt-75'>
            <Col xs={7}>
              <Label className='form-label' for='agneda'>
                Agenda <span className='text-danger'>*</span>
              </Label>
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
                    />
                  )
                }}
              />
              {errors.agenda && <FormFeedback>Please enter a valid Agenda</FormFeedback>}
            </Col>
            <Col xs={5}>
              <Label className='form-label' for='firstName'>

              </Label>
              <div className='time-left'>
                {getStatus(data.startDate, data.endDate) === 'Ongoing' ? getLeftTime(data.startDate, data.endDate) : getStatus(data.startDate, data.endDate)}
              </div>
            </Col>
          </Row>
          <hr />
          <div className='options d-flex flex-column'>
            {
              data.options.map((item, index) => {
                return (
                  <Row key={index}>
                    <Col xs={3}>
                      <Label className='form-label' for={item.option}>
                        Option {index + 1} <span className='text-danger'>*</span>
                      </Label>
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
                      {errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
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

          {/* {
            (mode === 0 || mode === 1) && ( */}
          <>
            <Row>
              <Col xs={12}>
                <Label className='form-label' for='date-time-picker1'>
                  Start Date <span className='text-danger'>*</span>
                </Label>
                <Flatpickr
                  value={data.startDate}
                  data-enable-time
                  id='date-time-picker1'
                  className='form-control'
                  name='startDate'
                  onChange={date => handleDateChange(date, 'startDate')}
                />
                {errors.startDate && <p className={styles.error}>Please enter a valid Username</p>}
              </Col>
            </Row>
            <Row className='mt-2'>
              <Col xs={12}>
                <Label className='form-label' for='date-time-picker'>
                  End Date <span className='text-danger'>*</span>
                </Label>
                <Flatpickr
                  value={data.endDate}
                  data-enable-time
                  id='date-time-picker'
                  className='form-control'
                  name='endDate'
                  onChange={date => handleDateChange(date, 'endDate')}
                />
                {errors.endDate && <p className={styles.error}>Please enter a valid Username</p>}
              </Col>
            </Row>
          </>
          {/* )
          } */}

          {
            mode === 0 ? (
              <Row>
                <Col xs={12} className='text-center mt-2 pt-50 d-flex justify-content-end'>
                  <Button type='reset' className='me-1' color='secondary' outline onClick={() => setOpen(false)}>
                    Discard
                  </Button>
                  <Button type='submit' color='primary' onClick={handleSubmit}>
                    Save Changes
                  </Button>
                </Col>
              </Row>
            ) : mode === 1 ? (
              <Col xs={12} className='text-center mt-2 pt-50 d-flex justify-content-end'>
                <Button type='reset' className='me-1' color='secondary' outline onClick={() => setOpen(false)}>
                  Exit
                </Button>
              </Col>
            ) : (
              <Row>
                <Col xs={12} className='text-center mt-2 pt-50 d-flex justify-content-end'>
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
