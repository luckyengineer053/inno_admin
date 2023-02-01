import React, { useState, useEffect } from 'react'

import {
  Row,
  Col,
  Card
} from 'reactstrap'

const logs = [
  {
    time: 'A few minutes ago',
    description: 'Zenki approved application of Inoooo NFT (#0001).'
  },
  {
    time: '2 hours ago',
    description: 'Zenki added a new project called Duppies to the platform.'
  },
  {
    time: 'Yesterday',
    description: 'Zenki made changes to Inoooo NFT.'
  },
  {
    time: '5 days ago',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    time: '1 week ago',
    description: 'Euismod urna amet accumsan volutpat. Mauris odio porttitor orci, pharetra.'
  },
  {
    time: 'July 18th 2022',
    description: 'Amet, aliquet nulla viverra posuere. Rhoncus non quis praesent mauris facilisis.'
  }
]

const Log = () => {
  return (
    <>
      <Card className='log'>
        <div className='title'>
          <div className='titleLeft'>
            Activity Log
          </div>
          <div className='titleRight'>
            View all
          </div>
        </div>
        <table className='thead'>
          <thead>
            <tr>
              <td className='leftTd'>Timestamp</td>
              <td>Description</td>
            </tr>
          </thead>
        </table>
        <hr />
        <table>
          <tbody>
            {
              logs.map((log, index) => {
                return (
                  <tr key={index}>
                    <td className='leftTd'>
                      {log.time}
                    </td>
                    <td>
                      {log.description}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </Card>
    </>
  )
}

export default Log