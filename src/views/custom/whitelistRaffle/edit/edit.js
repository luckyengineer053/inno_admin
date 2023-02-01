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
import Select from 'react-select'
import { User, Check, X, Edit2 } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'

// Card, CardHeader, CardTitle, CardBody, Input, Label

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import './edit.scss'
import UploadIcon from '@src/assets/images/icons/upload.png'

import { BACKEND_URL, INVITE_BOT_URL } from '../../../../configs'

import { errorToast } from '../../../../utility/toast'

const defaultValues = {
  // firstName: 'Bob',
  // lastName: 'Barton',
  // username: 'bob.dev'
}

const EditWhitelistOpp = ({
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
  mintDate,
  hostedProjectName
}) => {
  const [errors, setErrors] = useState({})
  // const [botInvited, setBotInvited] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleValidation = () => {
    const fields = data
    const errors = {}
    let formIsValid = true

    for (const key in fields) {
      if ((key === 'projectName' || key === 'wlSpots'
        // || key === 'description' || key === 'serverId'
        || key === 'description'
        // || key === 'roleId' || key === 'role'
        || key === 'role'
        || key === 'startDate' || key === 'endDate'
        // || key === 'supply' || key === 'mintPrice'
      ) && (fields[key] === '' || fields[key] === 0)) {
        errors[key] = true
        formIsValid = false
      }
    }
    setErrors(errors)
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

      // console.log(data.roleId, data.serverId)
      // const result = await axios.post(`${BACKEND_URL}/api/wlRaffle/validateDiscordBot`, {
      //   serverId: data.serverId,
      //   roleId: data.roleId
      // })
      // console.log('result: ', result)
      // if (result.data.success) {
      //   handleSubmitModal()
      // } else {
      //   errorToast(result.data.message)
      // }
      handleSubmitModal()
      setImageError(false)
    } catch (error) {
      console.log(error)
      errorToast("You failed to create")
    }

  }

  const inviteBot = () => {
    window.open(INVITE_BOT_URL, "_blank")
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
  console.log('mint: ', data.whitelistActive)

  return (
    <Fragment>
      <Modal isOpen={open} toggle={handleClose} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={handleClose}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5 edit'>
          <div className='text-left mb-2'>
            <h1 className='mb-1'>{mode === 0 ? "Add" : "Edit"} Whitelist Opportunity</h1>
            {/* <p className='sub-title'>Hosted by: {hostedProjectName || ''}</p> */}
          </div>

          {/* {
            mode === 0 && (
              <>
                <Row>
                  <Col xs={12}>
                    <Button color='primary' onClick={inviteBot}>
                      Invite Bot
                    </Button>
                  </Col>
                </Row>
                <div className='mt-1 form-check'>
                  <Input type='checkbox' id='daoHub' name='daoHub' checked={botInvited} onChange={() => setBotInvited(!botInvited)} />
                  <Label className='form-check-label' for='daoHub'>
                    Check this if you invited the bot.
                  </Label>
                </div>
              </>
            )
          } */}
          <Row>
            <Col xs={12}>
              <Button color='primary' onClick={inviteBot}>
                Invite Bot
              </Button>
            </Col>
          </Row>
          {/* {
            (mode === 1 || (mode === 0 && botInvited)) && (
              <> */}
          <Row tag='form' className='gy-1 pt-75' onSubmit={() => handleSubmitModal(onSubmit)}>
            {/* <Row tag='form' className='gy-1 pt-75'> */}
            <Col md={7} xs={12}>
              <Row>
                <Col xs={12}>
                  <Label className='form-label' for='projectName'>
                    Project Name <span className='text-danger'>*</span>
                  </Label>
                  <Controller
                    control={control}
                    name='Your project name'
                    render={({ field }) => {
                      return (
                        <Input
                          id='projectName'
                          placeholder='Your project name'
                          invalid={errors.projectName && true}
                          value={data.projectName}
                          onChange={(e) => handleEditChange(e, 'projectName')}
                        />
                      )
                    }}
                  />
                  {errors.projectName && <FormFeedback>Please enter a valid Project Name</FormFeedback>}
                </Col>
              </Row>
              <Row className='mt-1'>
                <Col xs={6}>
                  <Label className='form-label' for='role'>
                    Server ID
                  </Label>
                  <Controller
                    control={control}
                    name='serverId'
                    render={({ field }) => {
                      return (
                        <Input
                          id='serverId'
                          placeholder='Server ID'
                          invalid={errors.serverId && true}
                          value={data.serverId}
                          onChange={(e) => handleEditChange(e, 'serverId')}
                        />
                      )
                    }}
                  />
                  {errors.serverId && <FormFeedback>Please enter a valid Server ID</FormFeedback>}
                </Col>
                <Col xs={6}>
                  <Label className='form-label' for='role'>
                    Whitelist Role ID
                  </Label>
                  <Controller
                    control={control}
                    name='roleId'
                    render={({ field }) => {
                      return (
                        <Input
                          id='roleId'
                          placeholder='Role Id'
                          invalid={errors.roleId && true}
                          value={data.roleId}
                          onChange={(e) => handleEditChange(e, 'roleId')}
                        />
                      )
                    }}
                  />
                  {errors.roleId && <FormFeedback>Please enter a valid Role ID</FormFeedback>}
                </Col>
              </Row>

              <Row className='mt-1'>
                <Col xs={6}>
                  <Label className='form-label' for='role'>
                    Role Name
                  </Label>
                  <Controller
                    control={control}
                    name='Role name'
                    render={({ field }) => {
                      return (
                        <Input
                          id='role'
                          placeholder='Role name'
                          invalid={errors.role && true}
                          value={data.role}
                          onChange={(e) => handleEditChange(e, 'role')}
                        />
                      )
                    }}
                  />
                  {errors.role && <FormFeedback>Please enter a valid Role Name</FormFeedback>}
                </Col>
                <Col xs={6}>
                  <Label className='form-label' for='whitelistActive'>
                    Whitelist Active Status
                  </Label>
                  <Input type='select' name='whitelistActive' value={data.whitelistActive} onChange={(e) => handleEditChange(e, 'whitelistActive')}>
                    <option value={1}>Active</option>
                    <option value={0}>Closed</option>
                  </Input>
                </Col>
              </Row>

              <Row className='mt-1'>
                <Col xs={6}>
                  <Label className='form-label' for='wlSpots'>
                    Whitelist Spots <span className='text-danger'>*</span>
                  </Label>
                  <Controller
                    control={control}
                    name='wlSpots'
                    render={({ field }) => {
                      return (
                        <Input
                          id='wlSpots'
                          type='number'
                          placeholder='Whitelist Spots'
                          value={data.wlSpots}
                          onChange={(e) => handleEditChange(e, 'wlSpots')}
                          invalid={errors.wlSpots && true}
                        />
                      )
                    }}
                  />
                  {errors.wlSpots && <FormFeedback>Please enter a valid Whitelist Spots</FormFeedback>}
                </Col>
                <Col xs={6}>
                  <Label className='form-label' for='requirement'>
                    Requirement
                  </Label>
                  <Input type='select' name='requirement' value={data.requirement} onChange={(e) => handleEditChange(e, 'requirement')}>
                    <option value={0}>Twitter Following</option>
                    <option value={1}>Discord Following</option>
                  </Input>
                </Col>
              </Row>

              <Row className='mt-1'>
                <Col xs='12'>
                  <Label className='form-label' for='description'>
                    Description <span className='text-danger'>*</span>
                  </Label>
                  <Controller
                    control={control}
                    name='description'
                    value={data.description}
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          id='description'
                          placeholder='Description'
                          style={{ minHeight: '100px' }}
                          value={data.description}
                          onChange={(e) => handleEditChange(e, 'description')}
                          invalid={errors.description && true}
                          type='textarea'
                        />
                      )
                    }}
                  />
                  {errors.description && <FormFeedback>Please enter a valid Description</FormFeedback>}
                </Col>
              </Row>

              <Row className='mt-1'>
                <Col xs='12'>
                  <Label className='form-label' for='detail'>
                    Detail Information
                  </Label>
                  <Controller
                    control={control}
                    name='detail'
                    value={data.detail}
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          id='detail'
                          placeholder='Description'
                          style={{ minHeight: '50px' }}
                          value={data.detail}
                          onChange={(e) => handleEditChange(e, 'detail')}
                          invalid={errors.description && true}
                          type='textarea'
                        />
                      )
                    }}
                  />
                </Col>
              </Row>

              {/* <Row className='mt-1'>
                      <Col xs={12}>
                        <Label className='form-label' for='bearToken'>
                          Twitter Bearer Token <span className='text-danger'>*</span>
                        </Label>
                        <Controller
                          control={control}
                          name='bearerToken'
                          render={({ field }) => {
                            return (
                              <Input
                                id='bearerToken'
                                placeholder='Twitter Bearer Token'
                                invalid={errors.bearerToken && true}
                                value={data.bearerToken}
                                onChange={(e) => handleEditChange(e, 'bearerToken')}
                              />
                            )
                          }}
                        />
                        {errors.bearerToken && <FormFeedback>Please enter a valid Twitter Token</FormFeedback>}
                      </Col>
                    </Row> */}

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
              {/* {errors.supply && <FormFeedback>Please enter a valid Supply</FormFeedback>} */}
            </Col>
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
              {/* {errors.mintPrice && <FormFeedback>Please enter a valid Mint Price</FormFeedback>} */}
            </Col>
            <Col md='4' xs='12'>
              <Label className='form-label' for='mint-date-time-picker'>
                Mint Date
              </Label>
              <Flatpickr
                value={mintDate}
                id='mint-date-time-picker'
                className='form-control'
                onChange={date => handleDateChange(date, 'mintDate')}
              />
              {/* {errors.mintDate && <FormFeedback>Please enter a valid Mint Date</FormFeedback>} */}
            </Col>
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
          {/* </>
            )
          } */}

        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default EditWhitelistOpp
