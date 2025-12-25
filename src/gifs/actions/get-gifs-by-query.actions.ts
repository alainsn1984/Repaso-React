import type { GiphyResponse } from "../interface/giphy.response";
import type { Gif } from "../interface/gif.interface";

import { giphyApi } from "../api/giphy.api";

export const getGifByQuery = async (query: string): Promise<Gif[]> => {
  // https://api.giphy.com/v1/gifs/search?api_key=ZgkSxXVnpn4EEPh7aOou00YV21WMBtbe&q=saitama&limit=10&lang=es

  if (query.trim().length === 0) {
    return [];
  }

  try {
    const response = await giphyApi<GiphyResponse>("/search", {
      params: {
        q: query,
        limit: 10,
      },
    });

    return response.data.data.map((gif) => ({
      id: gif.id,
      title: gif.title,
      url: gif.images.original.url,
      width: Number(gif.images.original.width),
      height: Number(gif.images.original.height),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};
