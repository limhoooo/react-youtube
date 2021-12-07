
import axios from 'axios'

export default class Youtube {
    constructor(key) {
        this.youtube = axios.create({
            baseURL: `https://www.googleapis.com/youtube/v3`,
            params: { key: key },
        });
    }

    async mostPopular() {
        const response = await this.youtube.get('videos', {
            params: {
                part: 'snippet',
                chart: 'mostPopular',
                maxResults: 24,
            },
        })
        const channelsData = await this.channelsList(response);
        return channelsData;

    }

    async search(query) {
        const response = await this.youtube.get('search', {
            params: {
                part: 'snippet',
                maxResults: 24,
                type: 'video',
                q: query,
            },
        })

        const channelsData = await this.channelsList(response);
        return channelsData.map(item => ({
            ...item,
            id: item.id.videoId
        }));
    }

    async channelsList(response) {
        let channelIdString = response.data.items.map(item => {
            return item.snippet.channelId
        })
        let concatString = channelIdString.join()
        const channelsListData = await this.youtube.get('channels', {
            params: {
                part: 'snippet',
                id: concatString
            },
        })

        const responseData = response.data.items;
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
    }
}