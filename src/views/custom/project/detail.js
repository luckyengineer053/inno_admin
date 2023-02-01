// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

import DetailDaoVoting from './detail_view/detailDaoVoting'
import DetailProject from './detail_view/detailProject'
import DetailWthielistOpp from './detail_view/detailWhitelistOpp'

// ** Styles
import '@styles/react/apps/app-users.scss'

const ProjectView = () => {

  return (
    <div>
      <Row className='match-height'>
        <Col xs='12'>
          <DetailProject />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col xs='7'>
          <DetailWthielistOpp />
        </Col>
        <Col xs='5'>
          <DetailDaoVoting />
        </Col>
      </Row>
    </div>
  )
}
export default ProjectView
