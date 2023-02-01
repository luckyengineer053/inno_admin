import React, { useState, useEffect } from 'react'
import axios from 'axios'

// ** Reactstrap Imports
import { Row, Col, Alert, Card } from 'reactstrap'
import { Trash, Edit2 } from 'react-feather'
import ReactPaginate from 'react-paginate'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { getData, addEvent, updateEvent, deleteEvent } from '../store/daoVoting'
// custom
import EditDaoVoting from '../../daoVoting/edit/editDaoVoting'
import './detail.scss'

import { BACKEND_URL } from '@src/configs'

const DetailDaoVoting = () => {
  const store = useSelector(state => state.daoVotings)
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
  const [hostedProjectName, setHostedProjectName] = useState()

  const [data, setData] = useState(
    {
      _id: "",
      agenda: '',
      hostedProjectId: '',
      submittedUser: '',
      options: [],
      startDate: '',
      endDate: new Date()
    }
  )

  const temp = {
    _id: "",
    agenda: '',
    hostedProjectId: '',
    submittedUser: '',
    options: [],
    startDate: '',
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
    setMode(0)
    setStartDate(store.data[id].startDate)
    setEndDate(store.data[id].endDate)
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
    if (mode === 2) {
      // data['submittedUser'] = userData.username

      const temp = {
        agenda: data.agenda,
        // name: userData.username,
        option0: data.options[0].option,
        option1: data.options[1].option,
        option2: data.options[2].option,
        option3: data.options[3].option,
        startDate,
        endDate,
        hostedProjectId: data.hostedProjectId
      }

      dispatch(
        addEvent(JSON.stringify(temp))
      )
      setOpen(false)
    } else {
      const temp = data
      temp.startDate = startDate
      temp.endDate = endDate
      const formData = new FormData()
      formData.append('data', JSON.stringify(temp))
      dispatch(
        updateEvent(formData)
      )
      setOpen(false)
    }
  }

  const handleDateChange = (date, type) => {
    switch (type) {
      case 'startDate':
        setStartDate(date[0])
        break
      case 'endDate':
        setEndDate(date[0])
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

  const getLeftTime = (start, end) => {
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
          DAO Voting ({store.data.length})
        </Col>
      </Row>
      <Row>
        <Col xs='12' className='mt-2'>
          <table>
            <thead>
              <tr style={{ borderBottom: '1px solid #DDDDDD' }}>
                <th>Agend</th>
                <th>Time Left</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                store.data.map((element, index) => {
                  return <tr key={index}>
                    <td>{element.agenda}</td>
                    <td>{getStatus(element.startDate, element.endDate) === 'Ongoing' ? getLeftTime(element.startDate, element.endDate) : getStatus(element.startDate, element.endDate) === 'Ended' ? '00:00:00' : 'N/A'}</td>
                    <td>
                      {getStatus(element.startDate, element.endDate) !== 'Ended' && <Edit2 className='icon' color='#333333' size={18} onClick={(event) => handleEditRow(event, index)}
                        style={{ marginRight: '5px' }} />}
                      <Trash className='icon' color='red' size={18} onClick={(event) => handleDeleteRow(event, index)} />
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>

          <EditDaoVoting
            mode={mode}
            open={open}
            setOpen={setOpen}
            data={data}
            handleEditChange={handleEditChange}
            handleSubmitModal={handleSubmitModal}
            handleDateChange={handleDateChange}
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

export default DetailDaoVoting