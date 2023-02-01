import React, { useState } from 'react'
import { Card, Col, Row } from 'reactstrap'

const Cards = (props) => {
  const { data } = props
  return (
    <div className='cardsBody'>
      <Row>
        <Col md='6'>
          <Card className='card'>
            <div className='number'>{data.ongoingRaffleNumber}</div>
            <div>Ongoing WL Raffles</div>
          </Card>
        </Col>
        <Col md='6'>
          <Card className='card'>
            <div className='number'>{data.ongoingVotingNumber}</div>
            <div>Ongoing DAO Voting</div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md='6'>
          <Card className='card'>
            <div className='number'>{data.endedRaffleNumber}</div>
            <div>Ended WL Raffles</div>
          </Card>
        </Col>
        <Col md='6'>
          <Card className='card'>
            <div className='number'>{data.endedVotingNumber}</div>
            <div>Ended DAO Voting</div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Cards