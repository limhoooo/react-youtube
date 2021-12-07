import React from 'react';
import VideoItem from '../video_item/video_item';
import styles from './video_list.module.css'

const VideoList = ({ videos, onVideoClick, display }) => {
    const displayType = display === 'list' ? styles.searchNav : '';
    return (
        <ul className={`${styles.videos} ${displayType}`}>
            {videos.map(video =>
                <VideoItem
                    key={video.id}
                    video={video}
                    onVideoClick={onVideoClick}
                    display={display}
                />)}
        </ul>
    )
}

export default VideoList;