import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../api';

const getChannelsList = async (response: any) => {
  // 받아온 videos의 id List 를 직렬화
  const channelIdString = response.items.map((item: any) => {
    return item.snippet.channelId;
  });
  const concatString = channelIdString.join();
  const channelsListData = await API.get('/channels', {
    params: {
      part: 'snippet',
      id: concatString,
    },
  });
  // 받아온 videos의 해당하는 channels data 를 넣어줌
  const responseData = response.items;
  const channelsData = channelsListData.data.items;
  for (let i = 0; i < responseData.length; i++) {
    for (let j = 0; j < channelsData.length; j++) {
      if (responseData[i].snippet.channelId === channelsData[j].id) {
        responseData[i]['channelImg'] = channelsData[j].snippet.thumbnails.default.url;
        break;
      }
    }
  }
  return responseData;
};

export const getMostPopular = createAsyncThunk('video/getMostPopular', async () => {
  const { data } = await API.get(`/videos`, {
    params: {
      part: 'snippet',
      chart: 'mostPopular',
      maxResults: 24,
    },
  });
  const channelsData = getChannelsList(data);
  return channelsData;
});

const initialState = {
  videoList: [],
  loading: false,
};
const videoSlice = createSlice({
  name: 'videoSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [getMostPopular.pending.type]: (state, action) => {
      state.loading = true;
    },
    [getMostPopular.fulfilled.type]: (state, action) => {
      state.videoList = action.payload;
      state.loading = true;
    },
    [getMostPopular.rejected.type]: (state, action) => {
      state.loading = false;
    },
  },
});
export const searchActions = videoSlice.actions;
export default videoSlice.reducer;
