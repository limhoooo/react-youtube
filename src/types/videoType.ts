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
  id: string | { videoId: string };
  key?: string;
  kind: string;
  channelImg: string;
  snippet: videoSnippetType;
}
export interface videoSearchType extends videoType {
  id: { videoId: string };
}
