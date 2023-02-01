import React, { useState, useEffect } from 'react'
import axios from 'axios'
// ** Reactstrap Imports
import { Row, Col, Alert, Card } from 'reactstrap'
import ReactPaginate from 'react-paginate'
import { Trash, Edit2, Bell, Edit, Checkm } from 'react-feather'

import EditWhitelistOpp from '../../whitelistRaffle/edit/edit'
import WhitelistOpp from './whitelistOpp'

import { useSelector, useDispatch } from 'react-redux'
import { getData, addEvent, updateEvent, deleteEvent } from '../store/whitelistOpp'

import UploadIcon from '@src/assets/images/icons/upload.png'
import './detail.scss'
import { BACKEND_URL } from '../../../../configs'

const DetailWthielistOpp = () => {
  const store = useSelector(state => state.whitelistOpp)
  const storeProject = useSelector(state => state.project)

  // ** States
  const [open, setOpen] = useState(false)
  // edit and view
  const [mode, setMode] = useState(0)

  const dispatch = useDispatch()
  const [filter, setFilter] = useState({
    currentPage: 1,
    column: 'key',
    direction: 'asc',
    rowsPerPage: 7,
    searchValue: '',
    hostedProjectId: ''
  })
  const count = Math.ceil(store.total / filter.rowsPerPage)

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [mintDate, setMintDate] = useState(new Date())

  const [data, setData] = useState(
    {
      _id: "",
      projectName: '',
      hostedProjectId: '',
      submittedUser: '',
      wlSpots: 0,
      requirement: 0,
      description: '',
      supply: 0,
      mintDate: new Date(),
      mintPrice: 0,
      startDate: new Date(),
      endDate: new Date(),
      twitter: '',
      discord: '',
      website: '',
      image: ''
    }
  )

  const [imageSrc, setImageSrc] = useState(UploadIcon)
  const [imageFile, setImageFile] = useState('')

  const [hostedProjectName, setHostedProjectName] = useState()
  const temp = {
    _id: "",
    projectName: '',
    hostedProjectId: '',
    winners: '',
    startDate: new Date(),
    endDate: new Date()
  }

  const handlePagination = page => {
    const filterData = {
      ...filter,
      currentPage: page.selected + 1
    }
    setFilter(filterData)
    dispatch(
      getData(filterData)
    )
  }

  // ** Function to handle per page
  const handlePerPage = e => {
    const filterData = {
      ...filter,
      currentPage: 1,
      rowsPerPage: parseInt(e.target.value)

    }
    setFilter(filterData)
    dispatch(
      getData(filterData)
    )
  }

  const handleDeleteRow = (event, id) => {
    event.preventDefault()

    if (confirm("Do you want to delete this row?")) {
      dispatch(
        deleteEvent(store.data[id]._id)
      )
    }
  }

  const handleEditRow = (event, id) => {
    event.preventDefault()
    setData({
      ...store.data[id]
    })
    setMode(1)
    setImageSrc(BACKEND_URL + store.data[id].image)
    setStartDate(store.data[id].startDate)
    setEndDate(store.data[id].endDate)
    setMintDate(store.data[id].mintDate)

    setOpen(true)
    // handleModal()
  }

  const handleEditChange = (event, type, index) => {
    switch (type) {
      case "options":
        {
          const temp = [...data.options]
          const temp1 = { ...temp[index], option: event.target.value }

          temp[index] = temp1

          setData({
            ...data,
            options: temp
          })
          break
        }
      case "startDate":
        setData({
          ...data,
          startDate: event[0]
        })
        break
      case "endDate":
        setData({
          ...data,
          endDate: event[0]
        })
        break
      default:
        setData({
          ...data,
          [type]: event.target.value
        })
    }
  }

  const handleSubmitModal = () => {
    // update

    const temp = data
    temp.startDate = startDate
    temp.endDate = endDate
    temp.mintDate = mintDate
    const formData = new FormData()
    if (imageFile !== '') {
      formData.append('file', imageFile)
    }
    formData.append('data', JSON.stringify(temp))

    dispatch(
      updateEvent(formData)
    )
    setOpen(false)
  }

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageSrc(URL.createObjectURL(event.target.files[0]))
      setImageFile(event.target.files[0])
    }
  }

  const handleDateChange = (date, type) => {
    switch (type) {
      case 'startDate':
        setData({
          ...data,
          startDate: date[0]
        })
        break
      case 'endDate':
        setData({
          ...data,
          endDate: date[0]
        })
        break
      default:
        break
    }
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

  const getLeftTime = (end) => {
    const a = new Date().getTime()
    const b = new Date(end).getTime()
    const c = (b - a) / 1000
    const hours = Math.floor(c / 3600)
    const mins = Math.floor((c % 3600) / 60)
    const sec = Math.floor(c % 60)

    return `${hours}:${mins}:${sec}`
  }

  // ** Get data on mount
  useEffect(() => {

    if (storeProject.oneData.oneData) {
      const filterData = {
        ...filter,
        hostedProjectId: storeProject.oneData.oneData._id
      }
      setFilter(filterData)
      // filter.hostedProjectId = storeProject.oneData.oneData._id
      dispatch(
        getData(filterData)
      )
    }
  }, [dispatch, storeProject.oneData.oneData])


  useEffect(async () => {
    if (store.data.length > 0) {
      const res = await axios.get(`${BACKEND_URL}/api/project/getProjectName?projectId=${store.data[0].hostedProjectId}`)
      if (res.data.success) {
        setHostedProjectName(res.data.data)
      }
    }
  }, [store.data])

  return (
    <Card className='detail-whitelist'>
      <Row>
        <Col xs='12' className='whitelist-title'>
          Whitelist Opportunities ({store.data.length})
        </Col>
      </Row>
      <Row>
        <Col xs='12' className='mt-2'>
          <table>
            <thead>
              <tr style={{ borderBottom: '1px solid #DDDDDD' }}>
                <th>Name</th>
                <th>Winners</th>
                <th>Time Left</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                store.data.map((item, index) => {
                  return <tr key={index}>
                    <td>{item.projectName}</td>
                    <td>{item.winners.length}</td>
                    <td>{getStatus(item.startDate, item.endDate) === 'Ongoing' ? getLeftTime(item.endDate) : getStatus(item.startDate, item.endDate)}
                    </td>
                    {/* <td><WhitelistOpp /><EditWhitelistOpp /><Trash className='icon' color='red' size={18} /> </td> */}
                    <td>
                      {getStatus(item.startDate, item.endDate) !== 'Ended' && <Edit2 className='icon' color='#333333' size={18} onClick={(event) => handleEditRow(event, index)}
                        style={{ marginRight: '5px' }} />}
                      <Trash className='icon' color='red' size={18} onClick={(event) => handleDeleteRow(event, index)} />
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
          <EditWhitelistOpp
            mode={mode}
            open={open}
            setOpen={setOpen}
            data={data}
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
            handleEditChange={handleEditChange}
            handleSubmitModal={handleSubmitModal}
            handleDateChange={handleDateChange}
            handleImageChange={handleImageChange}
            startDate={startDate}
            endDate={endDate}
            hostedProjectName={hostedProjectName}
          />

          <ReactPaginate
            previousLabel={''}
            nextLabel={''}
            breakLabel='...'
            pageCount={count || 1}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            activeClassName='active'
            forcePage={filter.currentPage !== 0 ? filter.currentPage - 1 : 0}
            onPageChange={page => handlePagination(page)}
            pageClassName='page-item'
            breakClassName='page-item'
            nextLinkClassName='page-link'
            pageLinkClassName='page-link'
            breakLinkClassName='page-link'
            previousLinkClassName='page-link'
            nextClassName='page-item next-item'
            previousClassName='page-item prev-item'
            containerClassName={
              'pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
            }
          />
        </Col>
      </Row>
    </Card>
  )
}

export default DetailWthielistOpp