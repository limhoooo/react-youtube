import { AxiosRequestConfig } from 'axios';
import { API } from '..';

interface SearchApiParam {
  params: {
    part: string;
    maxResults: number;
    type: string;
    q: string;
    id: string;
  };
}

export const GET_VIDEOLIST = (data: AxiosRequestConfig<SearchApiParam>) => API.get(`/videos`, data);
export const GET_SEARCH_VIDEOLIST = (data: AxiosRequestConfig<SearchApiParam>) => API.get('/search', data);
export const GET_CHANNEL_INFOLIST = (data: AxiosRequestConfig<SearchApiParam>) => API.get('/channels', data);
