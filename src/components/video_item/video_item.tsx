import React, { memo } from 'react';
import styles from './video_item.module.css';
import { videoType } from './../../types/videoType';

interface PropsType {
  onVideoClick: (video: videoType) => void;
  video: videoType;
  display: string;
}

const VideoItem = memo(({ video, video: { snippet }, onVideoClick, display }: PropsType) => {
  const displayType = display === 'list' ? styles.list : styles.grid;
  return (
    <li className={`${styles.container} ${displayType}`} onClick={() => onVideoClick(video)}>
      <div className={styles.video}>
        <img className={styles.thumbnail} src={snippet.thumbnails.medium.url} alt="video thumbnail" />
        <div className={styles.metadata}>
          <div className={styles.metadataLeft}>
            <img className={styles.channelImg} src={video.channelImg} alt="channelImg" />
          </div>
          <div className={styles.metadataRight}>
            <p className={styles.title}>{snippet.title}</p>
            <p className={styles.channel}>{snippet.channelTitle}</p>
          </div>
        </div>
      </div>
    </li>
  );
});

export default VideoItem;
