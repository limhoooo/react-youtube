import React from 'react';
import VideoItem from '../video_item/video_item';
import styles from './video_list.module.css';
import { videoType } from './../../types/videoType';

interface PropsType {
  videos: videoType[];
  onVideoClick: (video: videoType) => void;
  display: string;
}

const VideoList = ({ videos, onVideoClick, display }: PropsType) => {
  const displayType = display === 'list' ? styles.searchNav : '';
  return (
    <ul className={`${styles.videos} ${displayType}`}>
      {videos.map(video => (
        <VideoItem key={video.id as string} video={video} onVideoClick={onVideoClick} display={display} />
      ))}
    </ul>
  );
};

export default VideoList;
