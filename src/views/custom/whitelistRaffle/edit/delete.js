import React, { useState, useEffect } from 'react'
import '../index.scss'

import { User, Check, X, Edit2 } from 'react-feather'

const Delete = (props) => {
  return (
    <div className='delete-body'>
      <div className='delete-top'>
        <div className='delete-top-left'>
          Deleting Whitelist Opportunity
        </div>
        <div className='delete-top-right'>
          <X size={'10px'} />
        </div>
      </div>
      <hr />
      <div className='delete-center'>
        Are you sure that you would like to delete the Inoooo whitelist opportunity raffle?
      </div>
      <div className='delete-bottom'>
        <button>Cancel</button>
        <button style={{ background: '#FBAD27' }}>Confirm</button>
      </div>
    </div>

  )
}

export default Delete