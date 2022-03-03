import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import { Container, Form } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import { Song } from './Song';
import axios from 'axios';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID
});

export const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  /**
   * set the access token in the spotifyApi object when it changes
   */
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  /**
   * get search results from the api using the search params
   */
  useEffect(() => {
    if (!accessToken) return;
    if (!search) return setSearchResults([]);

    let cancel = false;

    const words = search.split(' ');

    //only appends to state -> only sumbit once and refresh to the state
    //check for good title (only the word in the title)
    //check for correct order
    words.forEach((word) => {
      spotifyApi.searchTracks(word).then((res) => {
        if (cancel) return;
        //first track
        const track = res.body.tracks.items[0];
        setSearchResults((prev) => [
          ...prev,
          {
            //first artist listed -> track.artists.map(artist => artist.name) -> array of artist names
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            //smallest image
            albumUrl: track.album.images[2].url
          }
        ]);
      });
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <Container>
      <Form.Control
        type="search"
        placeholder="Enter your text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search.split(' ')}
      <div className="flex-grow-1 my-2" style={{ overflowY: 'auto' }}>
        {searchResults.map((track) => (
          <Song track={track} key={track.uri} />
        ))}
      </div>
    </Container>
  );
};
