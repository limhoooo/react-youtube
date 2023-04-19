import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { videoSearchType, videoType } from '../../types/videoType';
import _ from 'lodash';
import { GET_CHANNEL_INFOLIST, GET_SEARCH_VIDEOLIST, GET_VIDEOLIST } from '../../api/video/videoApi';

interface getChannelsListType {
  items: videoSearchType[];
  type: string;
}

// GET 인기있는 동영상 리스트
export const getMostPopular = createAsyncThunk('video/getMostPopular', async () => {
  const { data } = await GET_VIDEOLIST({
    params: {
      part: 'snippet',
      chart: 'mostPopular',
      maxResults: 24,
    },
  });
  return data.items;
});

// GET Search 동영상
export const getVideoSaerch = createAsyncThunk('video/getVideoSaerch', async (query: string) => {
  try {
    const { data } = await GET_SEARCH_VIDEOLIST({
      params: {
        part: 'snippet',
        maxResults: 24,
        type: 'video',
        q: query,
      },
    });
    return data.items;
  } catch (error) {
    console.log(error);
  }
});

// GET Search 미리보기 동영상
export const getVideoSaerchPreview = createAsyncThunk('video/getVideoSaerchPreview', async (query: string) => {
  try {
    const { data } = await GET_SEARCH_VIDEOLIST({
      params: {
        part: 'snippet',
        maxResults: 5,
        type: 'video',
        q: query,
        intitle: query,
      },
    });
    return data.items;
  } catch (error) {
    console.log(error);
  }
});

// 채널 정보 넣어주는 Fnc
export const getChannelsList = createAsyncThunk(
  'video/getChannelsList',
  async ({ items, type }: getChannelsListType) => {
    try {
      // 받아온 videos의 id List 를 string 배열화
      const channelIdString = items.map((item: videoSearchType) => {
        return item.snippet.channelId;
      });
      const concatString = channelIdString.join();
      const channelsListData = await GET_CHANNEL_INFOLIST({
        params: {
          part: 'snippet',
          id: concatString,
        },
      });

      // 받아온 videos의 해당하는 channels data 를 넣어줌
      const responseData = _.cloneDeep(items);
      const channelsData = channelsListData.data.items;
      responseData.forEach(item => {
        const channel = channelsData.find((channel: videoType) => channel.id === item.snippet.channelId);
        if (channel) {
          item.channelImg = channel.snippet.thumbnails.default.url;
        }
      });

      if (type === 'search') {
        return responseData.map((item: videoSearchType) => ({
          ...item,
          id: item.id.videoId,
        }));
      } else {
        return responseData;
      }
    } catch (error) {
      console.log(error);
    }
  }
);
interface initialStateType {
  videoList: videoType[];
  getMostPopularList: videoType[];
  searchList: videoType[];
  loading: boolean;
  error: boolean;
}
const initialState: initialStateType = {
  videoList: [],
  getMostPopularList: [],
  searchList: [],
  loading: false,
  error: false,
};

const videoSlice = createSlice({
  name: 'videoSlice',
  initialState,
  reducers: {
    initSearchList: state => {
      state.searchList = [];
    },
  },
  extraReducers: {
    [getMostPopular.pending.type]: (state, action) => {
      state.loading = true;
    },
    [getMostPopular.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [getMostPopular.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = true;
    },

    [getVideoSaerch.pending.type]: (state, action) => {
      state.searchList = [];
      state.loading = true;
    },
    [getVideoSaerch.fulfilled.type]: (state, action) => {
      state.loading = false;
    },
    [getVideoSaerch.rejected.type]: (state, action) => {
      state.searchList = [];
      state.loading = false;
      state.error = true;
    },
    [getChannelsList.pending.type]: (state, action) => {
      state.videoList = [];
      state.loading = true;
    },
    [getChannelsList.fulfilled.type]: (state, action) => {
      state.videoList = action.payload;
      state.loading = false;
    },
    [getChannelsList.rejected.type]: (state, action) => {
      state.videoList = [];
      state.loading = false;
      state.error = true;
    },
    [getVideoSaerchPreview.pending.type]: (state, action) => {
      state.searchList = [];
      state.loading = true;
    },
    [getVideoSaerchPreview.fulfilled.type]: (state, action) => {
      state.searchList = action.payload;
      state.loading = false;
    },
    [getVideoSaerchPreview.rejected.type]: (state, action) => {
      state.searchList = [];
      state.loading = false;
      state.error = true;
    },
  },
});
export const videoActions = videoSlice.actions;
export default videoSlice.reducer;
