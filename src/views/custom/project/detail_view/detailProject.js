import React, { useState, useEffect } from 'react'
// ** Reactstrap Imports
import { Row, Col, Alert, Card } from 'reactstrap'
import { Trash, Edit2, Bell, Check } from 'react-feather'
import { FaDiscord, FaTwitter, FaLink, FaBell } from 'react-icons/fa'
// redux
import { useSelector, useDispatch } from 'react-redux'
import { getData, addEvent, updateEvent, deleteEvent, updateEventDetail } from '../store'

import { useNavigate } from 'react-router-dom'

import AddNewModal from '../AddNewModal'
import { BACKEND_URL } from '@src/configs'
import UploadIcon from '@src/assets/images/icons/upload.png'

import './detail.scss'

const DetailProject = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const store = useSelector(state => state.project)
  const temp = {
    name: '',
    image: '',
    subscriber: '',
    description: '',
    mintAddress: '',
    mintDate: '',
    mintPrice: '',
    totalSupply: '',
    status: '',
    billingCycle: '',
    daoHub: '',
    wlManagement: ''
  }

  const [projectData, setProjectData] = useState(temp)
  const [modal, setModal] = useState(false)
  const [mode, setMode] = useState("NEW")
  const [imageSrc, setImageSrc] = useState(UploadIcon)
  const [imageFile, setImageFile] = useState('')


  const [data, setData] = useState(
    {
      _id: "",
      name: "",
      subscriber: "",
      description: "",
      status: 0,
      mintDate: new Date(),
      totalSupply: 0,
      mintPrice: 0,
      billingCycle: 0,
      mintAddress: "",
      wlManagement: false,
      daoHub: false,
      hashlist: "",
      creatorAddress: [],
      image: "",
      twitter: "",
      discord: "",
      website: ""
    }
  )

  const handleModal = () => setModal(!modal)

  const handleEditChange = (event) => {
    switch (event.target.name) {
      // Check Box
      case 'wlManagement':
        setData({
          ...data,
          [event.target.name]: event.target.checked
        })
        break
      case 'daoHub':
        setData({
          ...data,
          [event.target.name]: event.target.checked
        })
        break
      // Input Box or SelectBox
      default:
        setData({
          ...data,
          [event.target.name]: event.target.value
        })
    }
  }

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageSrc(URL.createObjectURL(event.target.files[0]))
      setImageFile(event.target.files[0])
    }
  }

  const handleAddressChange = (e, index) => {
    if (e === 'add') {
      const newCreators = [...data.creatorAddress]
      newCreators.push(index)

      setData({
        ...data,
        creatorAddress: newCreators
      })
      return
    }
    if (e === 'delete') {
      const newCreators = data.creatorAddress.filter((creator, key) => key !== index)

      setData({
        ...data,
        creatorAddress: newCreators
      })
      return
    }
    if (e.target.value) {
      const newCreators = [...data.creatorAddress]
      newCreators[index] = e.target.value

      setData({
        ...data,
        creatorAddress: newCreators
      })
    }
  }

  const handleDateChange = (date) => {
    setData({
      ...data,
      mintDate: date[0]
    })
  }

  const handleDeleteProject = (event) => {
    event.preventDefault()

    if (confirm("Do you want to delete this row?")) {
      dispatch(
        deleteEvent(store.oneData.oneData._id)
      )
      navigate('/app/project')
    }
  }

  const handleEditProject = (event, id) => {
    event.preventDefault()
    setData({
      ...projectData
    })
    setMode("EDIT")
    setImageSrc(BACKEND_URL + projectData.image)
    setImageFile('')

    handleModal()
  }

  const handleSubmitModal = () => {
    const formData = new FormData()
    if (imageFile !== '') {
      formData.append('file', imageFile)
    }
    formData.append('data', JSON.stringify(data))

    dispatch(
      updateEventDetail(formData)
    )

    handleModal()
  }
  useEffect(() => {
    if (store.oneData.oneData) {
      console.log('project: ', store.oneData.oneData)
      setProjectData(store.oneData.oneData)
    }
  }, [store.oneData])

  return (
    <Card className='detail-project'>
      <Row>
        <Col md='2'>
          <img src={BACKEND_URL + projectData.image} alt='dao' />
          <div className='links'>
            <div><FaTwitter /></div>
            <div><FaDiscord /></div>
            <div><FaLink /></div>
          </div>
        </Col>
        <Col md='10'>
          <Row >
            <Col sx="12" className='d-flex justify-content-between'>
              <div className='project-title'>{projectData.name}</div>
              <div>
                <Edit2 className='icon' size={22} onClick={handleEditProject} />
                <Trash
                  className='icon' size={22} color='red' style={{ marginLeft: '10px' }}
                  onClick={handleDeleteProject}
                />
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: '15px' }}>
            <Col md='6'>
              <table>
                <tbody>
                  <tr>
                    <td>Discord Contract:</td>
                    <td>{projectData.subscriber}</td>
                  </tr>
                  <tr>
                    <td>Status:</td>
                    <td>{projectData.status === 0 ? 'Coming' : 'Minted'}</td>
                  </tr>
                  <tr>
                    <td>Total Supply:</td>
                    <td>{projectData.totalSupply}</td>
                  </tr>
                  <tr>
                    <td>Mint Price:</td>
                    <td>{projectData.mintPrice}SOL</td>
                  </tr>
                  <tr>
                    <td>Mint Date:</td>
                    {/* <td>{projectData.mintDate}</td> */}
                    <td>{new Date(projectData.mintDate).toDateString()}</td>
                  </tr>
                </tbody>
              </table>
            </Col>
            <Col md='6' style={{ borderLeft: '1px solid #AAAAAA', paddingLeft: '20px' }}>
              <table>
                <tbody>
                  <tr>
                    <td>Billing Cycle</td>
                    <td>{projectData.billingCycle === 0 ? 'Monthly' : 'Yearly'}</td>
                  </tr>
                  <tr>
                    <td>Next Bill</td>
                    <td><FaBell color='#FBAD27' size={15} style={{ marginRight: '10px' }} />26 JUL 2022</td>
                  </tr>
                </tbody>
              </table>
              <div className='subscription'>
                <div>Subscription Features:</div>
                <div>{projectData.wlManagement === true && <Check color='#FBAD27' size={15} />} Whitelist Management</div>
                <div>{projectData.daoHub === true && <Check color='#FBAD27' size={15} />} Dao Hub</div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <AddNewModal
        open={modal}
        handleModal={handleModal}
        mode={mode}
        data={data}
        imageSrc={imageSrc}
        handleImageChange={handleImageChange}
        handleEditChange={handleEditChange}
        handleDateChange={handleDateChange}
        handleSubmitModal={handleSubmitModal}
        handleAddressChange={handleAddressChange}
      />
    </Card>
  )
}

export default DetailProject