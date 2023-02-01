// ** React Imports
import { Fragment, useState, useEffect } from 'react'

import axios from 'axios'
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
import { useForm, Controller } from 'react-hook-form'

// Card, CardHeader, CardTitle, CardBody, Input, Label

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
// import './edit.scss'
import UploadIcon from '@src/assets/images/icons/upload.png'

import { errorToast } from '../../../utility/toast'

const defaultValues = {}

const EditRaffle = ({
  open,
  setOpen,
  mode,
  data,
  imageSrc,
  setImageSrc,
  imageFile,
  handleSubmitModal,
  handleEditChange,
  handleDateChange,
  handleImageChange,
  startDate,
  endDate,
  mintDate
}) => {
  const [errors, setErrors] = useState({})
  // const [botInvited, setBotInvited] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleValidation = () => {
    const fields = data
    const errors = {}
    const formIsValid = true

    // for (const key in fields) {
    //   if ((key === 'raffleName' || key === 'type'
    //     // || key === 'description' || key 
    //     === 'serverId'
    //     || key === 'description'

    //   ) && (fields[key] === '' || fields[key] === 0)) {
    //     errors[key] = true
    //     formIsValid = false
    //   }
    // }
    // setErrors(errors)
    return formIsValid
  }

  const handleSubmit = async () => {
    try {
      const isValid = handleValidation()
      console.log('valid: ', isValid)
      if (!isValid) {
        return
      }

      if (imageFile === '') {
        setImageError(true)
        return
      } else {
        setImageError(false)
      }

      handleSubmitModal()
      setImageError(false)
    } catch (error) {
      console.log(error)
      errorToast("You failed to create")
    }

  }

  const handleClose = () => {
    setErrors({})
    setOpen(false)
    // setBotInvited(false)
    setImageError(false)
  }

  const handleImgReset = () => {
    // setAvatar(require('@src/assets/images/avatars/avatar-blank.png').default)
    setImageSrc(UploadIcon)
  }
  const {
    control
    // setError,
    // handleSubmit,
    // formState: { errors }
  } = useForm({ defaultValues })

  return (
    <Fragment>
      <Modal isOpen={open} toggle={handleClose} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={handleClose}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5 edit'>
          <div className='text-left mb-2'>
            <h1 className='mb-1'>{mode === 0 ? "Add" : "Edit"} Raffles</h1>
            {/* <p className='sub-title'>Hosted by: {hostedProjectName || ''}</p> */}
          </div>

          <Row tag='form' className='gy-1 pt-75'>
            <Col md={7} xs={12}>
              <Row className='mb-1'>
                <Col xs={12}>
                  <Label className='form-label' for='type'>
                    Raffle Type
                  </Label>
                  <Input type='select' name='type' value={data.type} onChange={(e) => handleEditChange(e, 'type')}>
                    <option value={0}>NFT Raffle</option>
                    <option value={1}>Whitelist Raffle</option>
                  </Input>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <Label className='form-label' for='raffleName'>
                    Raffle Name <span className='text-danger'>*</span>
                  </Label>
                  <Controller
                    control={control}
                    name='raffleName'
                    render={({ field }) => {
                      return (
                        <Input
                          id='raffleName'
                          placeholder='Raffle name'
                          invalid={errors.raffleName && true}
                          value={data.raffleName}
                          onChange={(e) => handleEditChange(e, 'raffleName')}
                        />
                      )
                    }}
                  />
                  {errors.raffleName && <FormFeedback>Please enter a valid Project Name</FormFeedback>}
                </Col>
              </Row>
              <Row className='mt-1'>
                <Col xs='12'>
                  <Label className='form-label' for='availability'>
                    Availability
                  </Label>
                  <Input type='select' name='availability' value={data.availability} onChange={(e) => handleEditChange(e, 'availability')}>
                    <option value={0}>Holders Only</option>
                    <option value={1}>Public</option>
                  </Input>
                </Col>
              </Row>

              {
                (data.type === 0 || data.type === '0') ? ( // NFT Raffle
                  <>
                    <Row className='mt-1'>
                      <Col xs={12}>
                        <Label className='form-label' for='projectName'>
                          Project Name
                        </Label>
                        <Controller
                          control={control}
                          name='projectName'
                          render={({ field }) => {
                            return (
                              <Input
                                id='projectName'
                                placeholder='Project Name'
                                invalid={errors.projectName && true}
                                value={data.projectName}
                                onChange={(e) => handleEditChange(e, 'projectName')}
                              />
                            )
                          }}
                        />
                        {errors.projectName && <FormFeedback>Please enter a valid Role Name</FormFeedback>}
                      </Col>
                    </Row>
                    <Row className='mt-1'>
                      <Col xs={12}>
                        <Label className='form-label' for='maxTicket'>
                          Tickets Available
                        </Label>
                        <Controller
                          control={control}
                          name='maxTicket'
                          render={({ field }) => {
                            return (
                              <Input
                                id='maxTicket'
                                placeholder='Ticket Available'
                                invalid={errors.maxTicket && true}
                                value={data.maxTicket}
                                onChange={(e) => handleEditChange(e, 'maxTicket')}
                              />
                            )
                          }}
                        />
                        {errors.maxTicket && <FormFeedback>Please enter a valid Role Name</FormFeedback>}
                      </Col>
                    </Row>
                  </>
                ) : (
                  <>

                    <Row className='mt-1'>
                      <Col xs={12}>
                        <Label className='form-label' for='supply'>
                          Supply
                        </Label>
                        <Controller
                          control={control}
                          name='supply'
                          render={({ field }) => {
                            return (
                              <Input
                                id='supply'
                                placeholder='Ticket Available'
                                invalid={errors.supply && true}
                                value={data.supply}
                                onChange={(e) => handleEditChange(e, 'supply')}
                              />
                            )
                          }}
                        />
                        {errors.supply && <FormFeedback>Please enter a valid Role Name</FormFeedback>}
                      </Col>
                    </Row>
                    {/* <Row className='mt-1'>
                      <Col xs={12}>
                        <Label className='form-label' for='mintPrice'>
                          Mint Price
                        </Label>
                        <Controller
                          control={control}
                          name='mintPrice'
                          render={({ field }) => {
                            return (
                              <Input
                                id='mintPrice'
                                placeholder='Ticket Available'
                                invalid={errors.mintPrice && true}
                                value={data.mintPrice}
                                onChange={(e) => handleEditChange(e, 'mintPrice')}
                              />
                            )
                          }}
                        />
                        {errors.mintPrice && <FormFeedback>Please enter a valid Role Name</FormFeedback>}
                      </Col>
                    </Row> */}
                    <Row className='mt-1'>
                      <Col xs={12}>
                        <Label className='form-label' for='winnerNumber'>
                          Number of Winners
                        </Label>
                        <Controller
                          control={control}
                          name='winnerNumber'
                          render={({ field }) => {
                            return (
                              <Input
                                id='winnerNumber'
                                placeholder='Ticket Available'
                                invalid={errors.winnerNumber && true}
                                value={data.winnerNumber}
                                onChange={(e) => handleEditChange(e, 'winnerNumber')}
                              />
                            )
                          }}
                        />
                        {errors.winnerNumber && <FormFeedback>Please enter a valid Role Name</FormFeedback>}
                      </Col>
                    </Row>
                  </>
                )
              }
            </Col>

            <Col md={5}>
              <Row>
                <Col xs={12}>
                  {/* <img src='/assets/img/dao.png' alt='dao' style={{ width: '100%', borderRadius: '5px' }} /> */}
                  <div className='d-flex flex-column'>
                    <div className='me-25'>
                      <img className='rounded' src={imageSrc} alt='Generic placeholder image' style={{ width: '100%' }} />
                    </div>
                    <div className='d-flex align-items-end mt-75 ms-1'>
                      <div>
                        <Button tag={Label} className='mb-75 me-75' size='sm' color='primary'>
                          Upload
                          <Input type='file' onChange={handleImageChange} hidden accept='image/*' />
                        </Button>
                        <Button className='mb-75' color='secondary' size='sm' outline onClick={handleImgReset}>
                          Reset
                        </Button>
                        <p className='mb-0'>Allowed file types: PNG, JPEG, GIF
                          Dimensions: At least 500x500 pixels</p>
                      </div>
                    </div>
                    {imageError && <p className='error'>Please upload a image</p>}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className='mt-1'>
            <Col xs={6}>
              <Label className='form-label' for='start-date-time-picker'>
                Start Date <span className='text-danger'>*</span>
              </Label>
              <Flatpickr
                value={startDate}
                data-enable-time
                id='start-date-time-picker'
                className='form-control'
                onChange={date => handleDateChange(date, 'startDate')}
              />
              {errors.startDate && <FormFeedback>Please enter a valid Start Date</FormFeedback>}
            </Col>
            <Col xs={6}>
              <Label className='form-label' for='end-date-time-picker'>
                End Date <span className='text-danger'>*</span>
              </Label>
              <Flatpickr
                value={endDate}
                data-enable-time
                id='end-date-time-picker'
                className='form-control'
                onChange={date => handleDateChange(date, 'endDate')}
              />
              {errors.endDate && <FormFeedback>Please enter a valid End Date</FormFeedback>}
            </Col>
          </Row>
          <hr />
          <Row>
            <Col md='4' xs='12'>
              <Label className='form-label' for='mint-date-time-picker'>
                Mint Date
              </Label>
              <Flatpickr
                value={mintDate}
                data-enable-time
                id='mint-date-time-picker'
                className='form-control'
                onChange={date => handleDateChange(date, 'mintDate')}
              />
              {/* {errors.mintDate && <FormFeedback>Please enter a valid Mint Date</FormFeedback>} */}
            </Col>
            {
              (data.type === 1 || data.type === '1') && (
                <>
                  {/* <Col md='4' xs='12'>
                    <Label className='form-label' for='firstName'>
                      Supply
                    </Label>
                    <Controller
                      control={control}
                      name='supply'
                      render={({ field }) => {
                        return (
                          <Input
                            {...field}
                            id='supply'
                            placeholder='Supply'
                            value={data.supply}
                            onChange={(e) => handleEditChange(e, 'supply')}
                            invalid={errors.supply && true}
                          />
                        )
                      }}
                    />
                  </Col> */}
                  <Col md='4' xs='12'>
                    <Label className='form-label' for='firstName'>
                      Mint Price
                    </Label>
                    <Controller
                      control={control}
                      name='mintPrice'
                      render={({ field }) => {
                        return (
                          <Input
                            // {...field}
                            id='mintPrice'
                            placeholder='Mint Price'
                            value={data.mintPrice}
                            onChange={(e) => handleEditChange(e, 'mintPrice')}
                            invalid={errors.mintPrice && true}
                          />
                        )
                      }}
                    />
                  </Col>
                </>
              )
              // : (
              //   <>
              //     <Col md='4' xs='12'>
              //       <Label className='form-label' for='availability'>
              //         Availability
              //       </Label>
              //       <Input type='select' name='availability' value={data.availability} onChange={(e) => handleEditChange(e, 'availability')}>
              //         <option value={0}>Holders Only</option>
              //         <option value={1}>Public</option>
              //       </Input>
              //     </Col>
              //   </>

              // )
            }
          </Row>

          <hr />
          <Row>
            <Col md='4' xs='12'>
              <Label className='form-label' for='twitter'>
                Twitter Link
              </Label>
              <Controller
                control={control}
                name='twitter'
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      id='twitter'
                      placeholder='twitter'
                      value={data.twitter}
                      onChange={(e) => handleEditChange(e, 'twitter')}
                      invalid={errors.twitter && true}
                    />
                  )
                }}
              />
            </Col>
            <Col md='4' xs='12'>
              <Label className='form-label' for='discord'>
                Discord Invite Link
              </Label>
              <Controller
                control={control}
                name='discord'
                value={data.discord}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      id='discord'
                      placeholder='discord'
                      value={data.discord}
                      onChange={(e) => handleEditChange(e, 'discord')}
                      invalid={errors.discord && true}
                    />
                  )
                }}
              />
            </Col>
            <Col md='4' xs='12'>
              <Label className='form-label' for='website'>
                Website Link
              </Label>
              <Controller
                control={control}
                name='website'
                value={data.website}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      id='website'
                      placeholder='website'
                      value={data.website}
                      onChange={(e) => handleEditChange(e, 'website')}
                      invalid={errors.website && true}
                    />
                  )
                }}
              />
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

export default EditRaffle
