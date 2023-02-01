import React, { useState, useEffect } from 'react'

import {
  Row,
  Col,
  Card
} from 'reactstrap'

const Cards = () => {
  return (
    <div className='cardsBody'>
      <Row>
        <Col md='3'>
          <Card className='card'>
            <div className='number'>25</div>
            <div>Subscribed Projects</div>
          </Card>
        </Col>
        <Col md='3'>
          <Card className='card'>
            <div className='number'>6</div>
            <div>Unread Applications</div>
          </Card>
        </Col>
        <Col md='3'>
          <Card className='card'>
            <div className='number'>5</div>
            <div>Ongoing WL Raffles</div>
          </Card>
        </Col>
        <Col md='3'>
          <Card className='card'>
            <div className='number'>3</div>
            <div>Ongoing NFT Raffles</div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md='4'>
          <Card className='card'>
            <div className='number'>6</div>
            <div>Active DAO Suggestions</div>
          </Card>
        </Col>
        <Col md='4'>
          <Card className='card'>
            <div className='number'>5</div>
            <div>DAO Hubs</div>
          </Card>
        </Col>
        <Col md='4'>
          <Card className='card'>
            <div className='number'>3</div>
            <div>Subscription Renewals</div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Cards