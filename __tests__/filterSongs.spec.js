import React from 'react';
import Intro from '../Intro';

describe("Vote Room Query Function", () => {
    test("it should query the spotify database by a search term (link)", () => {
        const input = "Gucci"
        //SpotifyWebApi.search(event.nativeEvent.text,  ["track"], {limit: 20}).then(response => logResponse(response.tracks.items))
        const output = "Gucci Gang";

        expect(querySpotify().toEqual(output));
      });
  });