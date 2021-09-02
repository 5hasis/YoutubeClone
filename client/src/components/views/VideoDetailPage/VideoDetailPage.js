import React, { useEffect, useState } from 'react'
import { Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import { Subscriber } from '../../../../../server/models/Subscriber';

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId

    const variable = {
        videoId: videoId
    }

    const [VideoDetail, setVideoDetail] = useState([])

    useEffect(() => {
        
        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if(response.data.success){
                    setVideoDetail(response.data.videoDetail)
                }
                else{
                    alert('비디오 정보를 가져오는데 실패')
                }
            })

    }, [])

    if(VideoDetail.writer){
        return (
            <Row gutter={[16,16]}>
                <Col lg={18} xs={24}>
                    <div style={{width:'100%',padding:'3rem 4rem'}}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />
    
                        <List.Item
                            actions={<Subscrib/>}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />} //populate를 했기 때문에 이렇게 이용가능
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                            {/* Comments */}
                        </List.Item>
    
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        )
    }else {
        return (
            <div>...Loading</div>
        )
    }
}

export default VideoDetailPage