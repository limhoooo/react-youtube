interface videoSnippetType {
  channelId: string;
  title: string;
  channelTitle: string;
  description: string;
  thumbnails: {
    default: {
      url: string;
    };
    medium: {
      url: string;
    };
  };
}

export interface videoType {
  etag: string;
  id: string;
  key?: string;
  kind: string;
  channelImg: string;
  snippet: videoSnippetType;
}
export interface videoSearchType {
  etag: string;
  key?: string;
  kind: string;
  channelImg: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
  id: {
    kind: string;
    videoId: string;
  };
}
