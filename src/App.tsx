import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import SearchHeader from './components/search_header/search_header';
import VideoDetail from './components/video_detail/video_detail';
import VideoList from './components/video_list/video_list';
import { useAppDispatch, useAppSelector } from './hook/hooks';
import { getMostPopular, getChannelsList } from './store/reducers/videoSlice';
import { videoType } from './types/videoType';

const AppStyled = styled.div`
  max-width: 80rem;
`;
const ContentStyled = styled.div`
  display: flex;
  padding-top: 4rem;
  @media screen and (max-width: 48rem) {
    .content {
      flex-direction: column;
    }
  }
`;
const ErrorText = styled.p`
  color: white;
  width: 330px;
`;
function App() {
  const dispatch = useAppDispatch();
  const videos = useAppSelector(video => video.video.videoList);
  const error = useAppSelector(video => video.video.error);
  const [selectedVideo, setSelectedVideo] = useState<videoType | null>(null);
  const selectVideo = (video: videoType) => {
    setSelectedVideo(video);
  };
  const onLogoClick = () => {
    setSelectedVideo(null);
  };

  const getMostPopularFnc = useCallback(async () => {
    const response = await dispatch(getMostPopular()).unwrap();
    await dispatch(getChannelsList({ items: response, type: 'list' }));
  }, [dispatch]);
  const errorMsg = error ? (
    <ErrorText>
      <p>Youtude API Error (최대 요청초과)</p>
      <p>일일할당량 10000건을 초과하였고 한국기준 오후 4시에 초기화됩니다</p>
    </ErrorText>
  ) : (
    ''
  );
  useEffect(() => {
    getMostPopularFnc();
  }, [getMostPopularFnc]);

  return (
    <AppStyled>
      <SearchHeader onLogoClickFnc={onLogoClick} />
      <ContentStyled>
        {errorMsg}
        {selectedVideo && <VideoDetail video={selectedVideo} />}
        <VideoList videos={videos} onVideoClick={selectVideo} display={selectedVideo ? 'list' : 'grid'} />
      </ContentStyled>
    </AppStyled>
  );
}

export default App;
