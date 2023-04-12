import React from 'react';
import styles from './video_detail.module.css';
import { videoType } from './../../types/videoType';
interface PropsType {
  video: videoType;
}
const VideoDetail = ({ video }: PropsType) => {
  return (
    <section className={styles.detail}>
      <iframe
        title="youtube video"
        className={styles.video}
        width="100%"
        height="500px"
        src={`https://www.youtube.com/embed/${video.id}`}
        frameBorder="0"
        allowFullScreen
      />
      <h2 className={styles.colorWhite}>{video.snippet.title}</h2>
      <div>
        <img className={styles.channelImg} src={video.channelImg} alt="" />
        <h3 className={styles.colorWhite}>{video.snippet.channelTitle}</h3>
      </div>
      <pre className={`${styles.colorWhite} ${styles.description}`}>{video.snippet.description}</pre>
    </section>
  );
};

export default VideoDetail;
