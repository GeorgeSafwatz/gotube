interface Video {
  id: {
    videoId: string;
  };
  snippet: {
    publishTime: string;
    channelTitle: string;
    description: string;
    title: string;
    channelId: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
}

interface VideoDetails {
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    channelTitle: string;
    tags: string[];
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
}
export interface VideoInfoProps {
  items: VideoDetails[];
}

interface PlaylistVideo {
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    channelTitle: string;
    playlistId: string;
    videoOwnerChannelTitle: string;
    videoOwnerChannelId: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    resourceId: {
      videoId: string;
    };
  };
}

export interface PlaylistVideosProps {
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: PlaylistVideo[];
}

interface CommentProps {
  id?: string;
  snippet: {
    channelId?: string;
    videoId?: string;
    topLevelComment: {
      id?: string;
      snippet: {
        channelId?: string;
        videoId?: string;
        authorProfileImageUrl?: string;
        authorDisplayName: string;
        textDisplay: string;
        authorChannelId?: {
          value: string;
        };
        likeCount?: number;
        publishedAt: string;
      };
      totalReplyCount?: number;
    };
  };
}

export interface VideoCommentsProps {
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: CommentProps[];
}

interface PlaylistInfo {
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    channelTitle: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
}

export interface PlaylistDetails {
  items: PlaylistInfo[];
}

export interface ChannelInfo {
  id: string;
  snippet: {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
  contentDetails: {
    relatedPlaylists: {
      uploads: string;
    };
  };
  statistics: {
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
  };
  brandingSettings: {
    image: {
      bannerExternalUrl: string;
    };
  };
}

export interface ChannelDetails {
  items: ChannelInfo[];
}
export interface SuggestedVideos {
  nextPageToken: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: Video[];
}

export type ChannelVideosProps = SuggestedVideos;

export type SearchVideos = SuggestedVideos;

export interface AddedChannelsInfo {
  id: string;
  url: string;
  title: string;
  description: string;
  subscriberCount: number;
  videoCount: number;
}
export interface AddedChannels {
  items: AddedChannelsInfo[];
}

export interface AddedVideosInfo {
  id: string;
  url: string;
  publishTime: string;
  channelTitle: string;
  description: string;
  title: string;
  channelId: string;
}
export interface AddedVideos {
  items: AddedVideosInfo[];
}

export interface AddedPlaylists {
  items: {
    id: string;
    title: string;
    description: string;
    url: string;
    vidsNum: number;
  }[];
}
