const axios = require('axios');
const inquirer = require('inquirer');
require('dotenv').config();

const API_KEY = process.env.API_KEY; // Replace with your API key
const BASE_URL = 'https://api.themoviedb.org/3';

const getShowId = async (showName) => {
    const response = await axios.get(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(showName)}`);
    return response.data.results[0].id;
  };
  
  const getShowCast = async (showId) => {
    const response = await axios.get(`${BASE_URL}/tv/${showId}/credits?api_key=${API_KEY}`);
    return response.data.cast;
  };
  
  const getActorFilmography = async (actorId) => {
    const response = await axios.get(`${BASE_URL}/person/${actorId}/movie_credits?api_key=${API_KEY}`);
    return response.data.cast;
  };
  
  const showName = process.argv[2]; // Get show name from command line arguments
  
  getShowId(showName)
    .then(getShowCast)
    .then(cast => {
      return inquirer.prompt([
        {
          type: 'list',
          name: 'actor',
          message: 'Choose an actor for more information:',
          choices: cast.map(actor => ({ name: actor.name, value: actor.id })),
        },
      ]);
    })
    .then(answers => getActorFilmography(answers.actor))
    .then(filmography => {
      console.table(filmography, ['title', 'character']); // Log the filmography in a table format
    })
    .catch(console.error);