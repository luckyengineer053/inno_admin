import { useState, useEffect } from 'react'

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
// redux
import { useDispatch } from 'react-redux'
import { updateImage } from './store'

import UploadIcon from '@src/assets/images/icons/upload.png'
import { BACKEND_URL } from '../../../configs'
const ChangeImageModal = ({
  currentImage,
  projectId,
  open,
  setOpen
}) => {
  const dispatch = useDispatch()
  const [imageSrc, setImageSrc] = useState(BACKEND_URL + currentImage)
  const [imageFile, setImageFile] = useState('')

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageSrc(URL.createObjectURL(event.target.files[0]))
      setImageFile(event.target.files[0])
    }
  }

  const onClickSave = () => {
    if (imageFile === '') {
      return
    }

    // const userData = localStorage.getItem('userData')
    // const discordId = JSON.parse(userData).discordId

    const formData = new FormData()
    formData.append('file', imageFile)
    formData.append('data', projectId)

    dispatch(updateImage(formData))
  }

  useEffect(() => {
    setImageSrc(BACKEND_URL + currentImage)
  }, [currentImage])

  return (
    <>
      <Modal isOpen={open} toggle={() => setOpen(false)} className='modal-dialog-centered modal-md changeImage'>
        <ModalHeader className='bg-transparent' toggle={() => setOpen(!open)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5 edit'>
          <div className='text-left mb-2'>
            <h1 className='mb-1'>Update Display Image</h1>
          </div>

          <Col xs={12}>
            {/* <img src='/assets/img/dao.png' alt='dao' style={{ width: '100%', borderRadius: '5px' }} /> */}
            <div className='d-flex flex-column'>
              <div className='me-25 imgContainer'>
                <img className='rounded' src={imageSrc} alt='Generic placeholder image' />
              </div>
              <div className='d-flex align-items-end mt-75 ms-1'>
                <div style={{ display: 'flex' }}>
                  <p className='mb-0'>Allowed file types: PNG, JPEG, GIF
                    Dimensions: At least 500x500 pixels</p>
                  <Button tag={Label} className='mb-75 me-75' size='sm' color='primary'>
                    Upload
                    <Input type='file' onChange={handleImageChange} hidden accept='image/*' />
                  </Button>
                </div>
              </div>
            </div>
          </Col>

          <Row>
            <Col xs={12} className='text-center mt-2 pt-50 d-flex justify-content-between gap-2'>
              <Button type='reset' className='me-1 button' color='secondary' outline onClick={() => setOpen(false)}>
                Discard
              </Button>
              <Button onClick={onClickSave} className='button' color='primary' >
                Save
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  )
}

export default ChangeImageModal