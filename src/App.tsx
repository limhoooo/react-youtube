import { useEffect, useState, useCallback } from 'react';
import styles from './app.module.css';
import SearchHeader from './components/search_header/search_header';
import VideoDetail from './components/video_detail/video_detail';
import VideoList from './components/video_list/video_list';
import { useAppDispatch, useAppSelector } from './hook/hooks';
import { getMostPopular } from './store/reducers/videoSlice';

function App() {
  // const [videos, setVideos] = useState([]);
  // const [selectedVideo, setSelectedVideo] = useState(null);
  const dispatch = useAppDispatch();
  const videos = useAppSelector(video => video.video.videoList);
  const getMostPopularFnc = useCallback(async () => {
    await dispatch(getMostPopular());
  }, [dispatch]);
  useEffect(() => {
    getMostPopularFnc();
  }, [getMostPopularFnc]);

  // const selectVideo = video => {
  //   setSelectedVideo(video);
  // };

  // const search = useCallback(
  //   query => {
  //     setSelectedVideo(null);

  //     youtube.search(query).then(videos => {
  //       setVideos(videos);
  //     });
  //   },
  //   [youtube]
  // );

  // const onLogoClick = () => {
  //   setSelectedVideo(null);
  //   console.log('sss');
  // };

  // useEffect(() => {
  //   youtube.mostPopular().then(videos => setVideos(videos));
  // }, [youtube]);

  return (
    <div className={styles.app}>
      <SearchHeader />
      {/* <section className={styles.content}>
        {selectedVideo && (
          <div className={styles.detail}>
            <VideoDetail video={selectedVideo} />
          </div>
        )}
        <div className={styles.list}>
          <VideoList videos={videos} onVideoClick={selectVideo} display={selectedVideo ? 'list' : 'grid'} />
        </div>
      </section> */}
      <section>
        <div className={styles.list}>
          <VideoList videos={videos} onVideoClick={null} display={'grid'} />
        </div>
      </section>
    </div>
  );
}

export default App;
