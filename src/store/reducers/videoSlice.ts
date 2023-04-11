import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../api';

interface videoSnippetType {
  channelId: string;
  thumbnails: {
    default: {
      url: string;
    };
  };
}
export interface videoType {
  etag: string;
  id: string | { videoId: string };
  kind: string;
  channelImg: string;
  snippet: videoSnippetType;
}
export interface videoSearchType extends videoType {
  id: { videoId: string };
}
const getChannelsList = async (items: videoType[]) => {
  // 받아온 videos의 id List 를 string 배열화
  const channelIdString = items.map((item: videoType) => {
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
  const responseData = items;
  const channelsData: videoType[] = channelsListData.data.items;
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
  const channelsData = await getChannelsList(data.items);
  return channelsData;
});
export const getVideoSaerch = createAsyncThunk('video/getVideoSaerch', async (query: string) => {
  const { data } = await API.get('/search', {
    params: {
      part: 'snippet',
      maxResults: 24,
      type: 'video',
      q: query,
    },
  });
  const channelsData = (await getChannelsList(data.items)) as videoSearchType[];
  return channelsData.map((item: videoSearchType) => ({
    ...item,
    id: item.id.videoId,
  }));
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
    [getVideoSaerch.pending.type]: (state, action) => {
      state.loading = true;
    },
    [getVideoSaerch.fulfilled.type]: (state, action) => {
      state.videoList = action.payload;
      state.loading = true;
    },
    [getVideoSaerch.rejected.type]: (state, action) => {
      state.loading = false;
    },
  },
});
export const searchActions = videoSlice.actions;
export default videoSlice.reducer;
