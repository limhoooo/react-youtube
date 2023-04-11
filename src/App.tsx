import { useEffect, useState, useCallback } from 'react';
import styles from './app.module.css';
import SearchHeader from './components/search_header/search_header';
import VideoDetail from './components/video_detail/video_detail';
import VideoList from './components/video_list/video_list';
import { useAppDispatch, useAppSelector } from './hook/hooks';
import { getMostPopular, videoType } from './store/reducers/videoSlice';

function App() {
  const dispatch = useAppDispatch();
  const videos = useAppSelector(video => video.video.videoList);
  const [selectedVideo, setSelectedVideo] = useState<videoType | null>(null);
  const selectVideo = (video: videoType) => {
    setSelectedVideo(video);
  };
  const onLogoClick = () => {
    setSelectedVideo(null);
  };

  const getMostPopularFnc = useCallback(async () => {
    await dispatch(getMostPopular());
  }, [dispatch]);

  useEffect(() => {
    getMostPopularFnc();
  }, [getMostPopularFnc]);
  return (
    <div className={styles.app}>
      <SearchHeader onLogoClickFnc={onLogoClick} />
      <section className={styles.content}>
        {selectedVideo && (
          <div className={styles.detail}>
            <VideoDetail video={selectedVideo} />
          </div>
        )}
        <div className={styles.list}>
          <VideoList videos={videos} onVideoClick={selectVideo} display={selectedVideo ? 'list' : 'grid'} />
        </div>
      </section>
    </div>
  );
}

export default App;
