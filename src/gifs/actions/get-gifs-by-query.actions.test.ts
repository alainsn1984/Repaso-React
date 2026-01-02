import { beforeEach, describe, expect, test, vi } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";

import { giphyApi } from "../api/giphy.api";
import { getGifByQuery } from "./get-gifs-by-query.actions";
import { giphySearchResponseMock } from "../../../tests/mocks/giphy.response.data";

describe("getGifByQuery", () => {
  let mock = new AxiosMockAdapter(giphyApi);

  beforeEach(() => {
    // mock.reset();
    mock = new AxiosMockAdapter(giphyApi);
  });

  // test('should return a list of gifs', async() => {
  //     const gifs = await getGifByQuery('goku')
  //     const [ gifs1 ] = gifs;

  //     expect(gifs.length).toBe(10)
  //     expect(gifs1).toStrictEqual({
  //         id: expect.any(String),
  //         height: expect.any(Number),
  //         width: expect.any(Number),
  //         title: expect.any(String),
  //         url: expect.any(String),
  //     })
  // })

  test("should return a list of gifs", async () => {
    mock.onGet("/search").reply(200, giphySearchResponseMock);

    const gifs = await getGifByQuery("goku");
    console.log(gifs);
    expect(gifs.length).toBe(10);
    gifs.forEach((gif) => {
      expect(typeof gif.id).toBe("string");
      expect(typeof gif.height).toBe("number");
      expect(typeof gif.width).toBe("number");
      expect(typeof gif.url).toBe("string");
      expect(typeof gif.url).toBe("string");
    });
  });

  test("should return a empty list of gifs when query is empty", async () => {
    // mock.onGet("/search").reply(200, {data: []});
    mock.restore();
    const gifs = await getGifByQuery("");
    console.log(gifs);
    expect(gifs.length).toBe(0);
  });

  test("should handle error when API returns an error", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    mock.onGet("/search").reply(400, {
      data: {
        message: "Bad request",
      },
    });

    const gifs = await getGifByQuery("goku");
    console.log(gifs);
    expect(gifs.length).toBe(0);
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());
  });
});
