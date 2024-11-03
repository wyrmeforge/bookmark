import { fetcher } from '@/lib/utils';
import useSWR from 'swr';

import axios from 'axios';
const fetchAnimeQuote = () => {
  return axios.get('https://anime-quotes5.p.rapidapi.com/api.php', {
    params: { random: 'random' },
    headers: {
      'x-rapidapi-key': 'ce9e13cdfbmsh16c89c6bb85521ep17f7cfjsn86003ca9b832',
      'x-rapidapi-host': 'anime-quotes5.p.rapidapi.com',
    },
  });
};

export const useAnimeQuote = () => {
  const { data, isLoading } = useSWR(
    'https://anime-quotes1.p.rapidapi.com/api/random',
    fetchAnimeQuote
  );

  return {
    quote: data?.data[0],
    isLoading,
  };
};
