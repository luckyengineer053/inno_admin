// ** React Imports
import { useState, useEffect } from 'react'

// ** Icons Imports
import { X, PlusCircle, MinusCircle } from 'react-feather'

import { useForm, Controller } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'

// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  InputGroup,
  InputGroupText,
  Input,
  Label,
  Card,
  CardBody,
  CardHeader,
  Form,
  Col,
  Row,
  FormGroup
} from 'reactstrap'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

import styles from './index.module.scss'

const AddNewModal = ({
  open,
  handleModal,
  mode,
  data,
  imageSrc,
  imageFile,
  handleImageChange,
  handleAddressChange,
  handleRolesChange,
  handleSubmitModal,
  handleEditChange,
  handleDateChange
}) => {
  const [errors, setErrors] = useState({})
  const [newCreator, setNewCreator] = useState('')
  const [newRole, setNewRole] = useState('')
  const [imageError, setImageError] = useState(false)
  const [checkAddToken, setCheckAddToken] = useState(false)
  const [tokenError, setTokenError] = useState(false)

  const handleValidation = () => {
    const fields = data
    const errors = {}
    let formIsValid = true

    for (const key in fields) {
      if ((key === 'name' || key === 'subscriber' || key === 'description'
        || key === 'twitter' || key === 'discord' || key === 'website')
        && fields[key] === '') {
        errors[key] = true
        formIsValid = false
      }

      // if (data.subscribeStatus === '0'
      //   && ((key === 'serverId' || key === 'whitelistRoleId')
      //     && fields[key] === '')) {
      //   errors[key] = true
      //   formIsValid = false
      // }

      if (data.subscribeStatus === '1'
        && (key === 'mintDate' || key === 'mintPrice' || key === 'totalSupply')
        && (fields[key] === '' || fields[key] === 0)) {
        errors[key] = true
        formIsValid = false
      }

      if (data.subscribeStatus === '1' && data.status === '1'
        && (data.creatorAddress.length === 0 || data.creatorAddress[0] === '')) {
        errors['creatorAddress'] = true
        formIsValid = true
      }

      if (checkAddToken
        && (key === 'receiverAddress' || key === 'tokenAddress' || key === 'tokenAmount')
        && (fields[key] === 0 || fields[key] === '')) {
        errors[key] = true
        formIsValid = true
      }

    }
    setErrors(errors)
    return formIsValid
  }

  const handleSubmit = () => {
    const isValid = handleValidation()
    if (!isValid) {
      return
    }
    if (imageFile === '') {
      setImageError(true)
      return
    } else {
      setImageError(false)
    }

    if (checkAddToken) {
      console.log(checkAddToken)
      if (!data.receiverAddress || !data.tokenAddress || !(data.tokenAmount && (data.tokenAmount > 0))) {
        setTokenError(true)
        return
      }
    } else {
      data.receiverAddress = ''
      data.tokenAddress = ''
      data.tokenAmount = 0
      data.symbol = ''
    }
    handleSubmitModal()
    // setCheckAddToken(false)
    setTokenError(false)
  }

  const handleClose = () => {
    setErrors({})
    setImageError(false)
    setCheckAddToken(false)
    handleModal()
    setTokenError(false)
  }

  useEffect(() => {
    setCheckAddToken((data.receiverAddress !== undefined) && (data.receiverAddress !== ''))
  }, [data.name])

  useEffect(() => {
    if (data.tokenAmount > 0) {
      setCheckAddToken(true)
    }
  }, [data.tokenAmount])

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleClose} />

  return (
    <Modal
      isOpen={open}
      toggle={handleClose}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
      style={{ width: '700px' }}
    >
      <ModalHeader className='mb-3' toggle={handleClose} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>{mode === 'NEW' ? 'Add New Project' : 'Edit Project'}</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <div className='mb-1'>
          <Row>
            <Col xs={7}>
              <div className='mb-1'>
                <Label for='Name'>Project or DAO Name <span className='text-danger mb-1'>*</span></Label>
                <InputGroup>
                  <Input name='name' placeholder='Name' value={data.name} onChange={handleEditChange} />
                </InputGroup>
                {errors.name && <p className={styles.error}>Please enter a valid Name</p>}
              </div>
              <div className='mb-1'>
                <Label for='subscriber'>Subscriber <span className='text-danger'>*</span></Label>
                <InputGroup>
                  <Input id='subscriber' name='subscriber' placeholder='Subscriber' value={data.subscriber} onChange={handleEditChange} />
                </InputGroup>
                {errors.subscriber && <p className={styles.error}>Please enter a valid Subscriber</p>}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='subscribeStatus'>
                  Subscribe Status <span className='text-danger'>*</span>
                </Label>
                <Input type='select' name='subscribeStatus' value={data.subscribeStatus} onChange={handleEditChange}>
                  <option value={1}>Subscribed</option>
                  <option value={0}>Not Subscribed</option>
                </Input>
              </div>
              {
                data.subscribeStatus === '1' && (
                  <div className='mb-1'>
                    <Label className='form-label' for='billingCycle'>
                      Billing Cycle <span className='text-danger'>*</span>
                    </Label>
                    <Input type='select' name='billingCycle' value={data.billingCycle} onChange={handleEditChange}>
                      <option value={0}>Monthly Billing (2 SOL/month)</option>
                      <option value={1}>Yearly Billing (2 SOL/month)</option>
                    </Input>
                  </div>
                )
              }
            </Col>

            <Col xs={5}>
              <div className='mb-1'>
                <div className={styles.collection_icon}>
                  <div className={styles.icon_header}>Image <span className='text-danger'>*</span></div>
                  <div className={styles.icon_content} style={{ marginTop: '5px' }}>
                    <img src={imageSrc} />
                    <input type='file' onChange={handleImageChange} />
                  </div>
                </div>
                {imageError && <p className={styles.error}>Please upload a image</p>}
              </div>
            </Col>
          </Row>
        </div>
        <hr />

        <div className='mb-1 form-check'>
          <Input type='checkbox' id='walletSubmission' name='walletSubmission' checked={data.walletSubmission} value={data.walletSubmission} onChange={handleEditChange} />
          <Label className='form-check-label' for='walletSubmission'>
            Wallet Submission
          </Label>
        </div>

        <div className='mb-1'>
          <Label for='description'>Description <span className='text-danger'>*</span></Label>
          <InputGroup>
            <Input id='description' name='description' placeholder='Description' type='textarea' style={{ minHeight: '100px' }} value={data.description} onChange={handleEditChange} />
          </InputGroup>
          {errors.description && <p className={styles.error}>Please enter a valid Description</p>}
        </div>

        {/* <div className='mb-1'>
          <Label for='detail'>Description <span className='text-danger'>*</span></Label>
          <InputGroup>
            <Input id='detail' name='detail' placeholder='Description' type='textarea' style={{ minHeight: '50px' }} value={data.description} onChange={handleEditChange} />
          </InputGroup>
          {errors.description && <p className={styles.error}>Please enter a valid Description</p>}
        </div> */}

        <Row>
          <Col sm={6}>
            <div className='mb-1'>
              <Label className='form-label' for='status'>
                Status <span className='text-danger'>*</span>
              </Label>
              <Input type='select' name='status' value={data.status} onChange={handleEditChange}>
                <option value={0}>Upcoming</option>
                <option value={1}>Minted</option>
              </Input>
            </div>
          </Col>
          <Col sm={6}>
            <div className='mb-1'>
              <Label className='form-label' for='mintDate'>
                Mint Date
              </Label>
              <Flatpickr
                required
                id='mintDate'
                name='mintDate'
                className='form-control'
                onChange={handleDateChange}
                value={data.mintDate}
              />
            </div>
          </Col>
          <hr />
        </Row>

        {
          (data.status === '0' || data.status === 0) && (
            <Row>
              <div className='mb-1'>
                <Label className='form-label' for='whitelistActive'>
                  Whitelist Submission Status <span className='text-danger'>*</span>
                </Label>
                <Input type='select' name='whitelistActive' value={data.whitelistActive} onChange={handleEditChange}>
                  <option value={0}>Closed</option>
                  <option value={1}>Active</option>
                </Input>
              </div>
            </Row>
          )
        }
        {/* {
          !(data.subscribeStatus === '1' && data.status === '1') && ( */}
        <>
          <Row>
            <Col sm={12}>
              <div className='mb-1'>
                <Label for='serverId'>Server ID</Label> {data.subscribeStatus === '0' && <span className='text-danger'>*</span>}
                <InputGroup>
                  <Input id='serverId' name='serverId' placeholder='Server ID' value={data.serverId} onChange={handleEditChange} />
                </InputGroup>
              </div>
            </Col>
            {/* <Col sm={12}>
                  <div className='mb-1'>
                    <Label for='whitelistRoleId'>Whitelist Role ID</Label> {data.subscribeStatus === '0' && <span className='text-danger'>*</span>}
                    <InputGroup>
                      <Input id='whitelistRoleId' name='whitelistRoleId' placeholder='Whitelist Role ID' value={data.whitelistRoleId} onChange={handleEditChange} />
                    </InputGroup>
                  </div>
                </Col> */}
            <Col md={12} sm={12}>
              <FormGroup>
                <Label for='whitelistRoleId'>Whitelist Role ID</Label> {data.subscribeStatus === '0' && <span className='text-danger'>*</span>}
                {
                  data.whitelistRoleIDs && data.whitelistRoleIDs.map((roleId, index) => {
                    return (
                      <InputGroup key={index} className='mb-1'>
                        <Input id='whitelistRoleId' placeholder='Whitelist Role ID' value={roleId} onChange={(event) => handleRolesChange(event, index)} />
                        <Button.Ripple className='btn-icon' color='danger' onClick={(event) => handleRolesChange('delete', index)}>
                          <MinusCircle size={16} />
                        </Button.Ripple>
                      </InputGroup>
                    )
                  })
                }
              </FormGroup>
            </Col>
            <Col md={12} sm={12}>
              <FormGroup>
                <InputGroup className='mb-1'>
                  <Input id='newRole' value={newRole} onChange={(e) => setNewRole(e.target.value)} placeholder='New Role ID' />
                  <Button.Ripple className='btn-icon' color='primary' onClick={(e) => {
                    handleRolesChange('add', newRole)
                    setNewRole('')
                  }}>
                    <PlusCircle size={14} />
                  </Button.Ripple>
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
          <hr />
        </>
        {/* )
        } */}

        <Row>
          <Col sm={6}>
            <div className='mb-1'>
              <Label for='totalSupply'>Total Supply</Label>
              <InputGroup>
                <Input id='totalSupply' name='totalSupply' type='number' placeholder='Total Supply' value={data.totalSupply} onChange={handleEditChange} />
              </InputGroup>
            </div>
          </Col>
          <Col sm={6}>
            <div className='mb-1'>
              <Label for='mintPrice'>Mint Price(SOL)</Label>
              <InputGroup>
                <Input id='mintPrice' name='mintPrice' type='number' placeholder='Mint Price' value={data.mintPrice} onChange={handleEditChange} />
              </InputGroup>
            </div>
          </Col>
        </Row>
        <hr />

        {
          // data.status === '1' && (
          <>
            <div className='mb-1'>
              <InputGroup>
                <Input type='checkbox' id='checkAddToken' name='checkAddToken' checked={checkAddToken} value={checkAddToken} onChange={() => { setCheckAddToken(!checkAddToken) }} />
                <Label for='checkAddToken' style={{ marginLeft: '10px' }} className='form-check-label'>Is token required for DAO Voting?</Label>
              </InputGroup>
            </div>

            {
              checkAddToken && (
                <>
                  <div className='mb-1'>
                    <Label for='receiverAddress'>Wallet address to receive token</Label> {<span className='text-danger'>*</span>}
                    <InputGroup>
                      <Input id='receiverAddress' name='receiverAddress' placeholder='Wallet Address to receive token' value={data.receiverAddress} onChange={handleEditChange} />
                    </InputGroup>
                  </div>

                  <div className='mb-1'>
                    <Label for='tokenAddress'>Token address</Label> {<span className='text-danger'>*</span>}
                    <InputGroup>
                      <Input id='tokenAddress' name='tokenAddress' placeholder='Token Address' value={data.tokenAddress} onChange={handleEditChange} />
                    </InputGroup>
                  </div>

                  <Row>
                    <Col sm={6}>
                      <div className='mb-1'>
                        <Label for='tokenSymbol'>Token Symbol</Label> {<span className='text-danger'>*</span>}
                        <InputGroup>
                          <Input id='tokenSymbol' name='tokenSymbol' placeholder='Token Symbol' value={data.tokenSymbol} onChange={handleEditChange} />
                        </InputGroup>
                      </div>
                    </Col>

                    <Col sm={6}>
                      <div className='mb-1'>
                        <Label for='tokenAmount'>Token amount to tax</Label> {<span className='text-danger'>*</span>}
                        <InputGroup>
                          <Input id='tokenAmount' name='tokenAmount' placeholder='Token Amount' value={data.tokenAmount} onChange={handleEditChange} />
                        </InputGroup>
                      </div>
                    </Col>

                  </Row>
                  {
                    tokenError && <p className={styles.error}>Please enter a valid token information</p>
                  }
                </>
              )
            }
            <hr />
          </>
          // )
        }

        {/* <div className='mb-1'>
          <Label for='mintAddress'>Mint Address</Label>
          <InputGroup>
            <Input id='mintAddress' name='mintAddress' placeholder='Mint Address' value={data.mintAddress} onChange={handleEditChange} />
          </InputGroup>
        </div> */}

        <Row className='mt-1'>
          <Col sm={6}>
            <div className='mb-1 form-check'>
              <Input type='checkbox' id='wlManagement' name='wlManagement' checked={data.wlManagement} value={data.wlManagement} onChange={handleEditChange} />
              <Label className='form-check-label' for='wlManagement'>
                Whitelist Management
              </Label>
            </div>
          </Col>
          <Col sm={6}>
            <div className='mb-1 form-check'>
              <Input type='checkbox' id='daoHub' name='daoHub' checked={data.daoHub} value={data.daoHub} onChange={handleEditChange} />
              <Label className='form-check-label' for='daoHub'>
                Dao Hub
              </Label>
            </div>
          </Col>
        </Row>
        <hr />
        {/* <div className='mb-1'>
          <Label for='hashlist'>Hashlist</Label>
          <InputGroup>
            <Input id='hashlist' name='hashlist' placeholder='Hashlist' value={data.hashlist} onChange={handleEditChange} />
          </InputGroup>
        </div> */}

        <Row id="creators">
          <Col md={12} sm={12}>
            <FormGroup>
              <Label for='creators'>Creator Address</Label> {(data.subscribeStatus === '1' && data.status === '1') && <span className='text-danger'>*</span>}
              {
                data.creatorAddress.map((creator, index) => {
                  return (
                    <InputGroup key={index} className='mb-1'>
                      <Input id='creators' placeholder='Creator Address' value={creator} onChange={(event) => handleAddressChange(event, index)} />
                      <Button.Ripple className='btn-icon' color='danger' onClick={(event) => handleAddressChange('delete', index)}>
                        <MinusCircle size={16} />
                      </Button.Ripple>
                    </InputGroup>
                  )
                })
              }
            </FormGroup>
          </Col>
          <Col md={12} sm={12}>
            <FormGroup>
              <InputGroup className='mb-1'>
                <Input id='newCreator' value={newCreator} onChange={(e) => setNewCreator(e.target.value)} placeholder='New Creator Address' />
                <Button.Ripple className='btn-icon' color='primary' onClick={(e) => {
                  handleAddressChange('add', newCreator)
                  setNewCreator('')
                }}>
                  <PlusCircle size={14} />
                </Button.Ripple>
              </InputGroup>
            </FormGroup>
          </Col>
          {errors.creatorAddress && <p className={styles.error}>Please enter a valid creator address</p>}
        </Row>
        <hr />
        {/* <Row>
          <div className='mb-1 form-check'>
            <Input type='checkbox' id='wlManagement' name='wlManagement' checked={data.wlManagement} value={data.wlManagement} onChange={handleEditChange} />
            <Label className='form-check-label' for='wlManagement'>
              Is token payment required for Dao Voting?
            </Label>
          </div>
        </Row>
        
        {
          isTokenRequired && (
            <>
              <Row>
                <Col sm={12}>

                </Col>
              </Row>
            </>
          )
        } */}

        <hr />
        <Row className='mt-1'>
          <div className='mb-1'>
            <Label for='discord'>Discord Invite Link</Label> <span className='text-danger'>*</span>
            <InputGroup>
              <Input id='discord' name='discord' placeholder='Discord' value={data.discord} onChange={handleEditChange} />
            </InputGroup>
            {errors.discord && <p className={styles.error}>Please enter a valid discord url</p>}
          </div>
          <div className='mb-1'>
            <Label for='twitter'>Twitter Link</Label> <span className='text-danger'>*</span>
            <InputGroup>
              <Input id='twitter' name='twitter' placeholder='Twitter' value={data.twitter} onChange={handleEditChange} />
            </InputGroup>
            {errors.twitter && <p className={styles.error}>Please enter a valid twitter url</p>}
          </div>
          <div className='mb-1'>
            <Label for='website'>Website Link</Label> <span className='text-danger'>*</span>
            <InputGroup>
              <Input id='website' name='website' placeholder='Website' value={data.website} onChange={handleEditChange} />
            </InputGroup>
            {errors.website && <p className={styles.error}>Please enter a valid website url</p>}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button className='mr-1' color='primary' onClick={handleSubmit}>
              Submit
            </Button>
            <Button color='secondary' onClick={handleClose} outline>
              Cancel
            </Button>
          </div>
        </Row>

      </ModalBody>
    </Modal>
  )
}

export default AddNewModal
