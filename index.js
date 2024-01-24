const axios = require('axios');
const inquirer = require('inquirer');
require('dotenv').config();

const API_KEY = process.env.API_KEY; // Replace with your API key
const BASE_URL = 'https://api.themoviedb.org/3';

const getMovieId = async (movieName) => {
    const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movieName)}`);
    return response.data.results[0].id;
};

const getMovieCast = async (movieId) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
    return response.data.cast;
};

const getShowId = async (showName) => {
    const response = await axios.get(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(showName)}`);
    return response.data.results[0].id;
};

const getShowCast = async (showId, seasonNumber, episodeNumber) => {
    let url = `${BASE_URL}/tv/${showId}/credits?api_key=${API_KEY}`;
    if (seasonNumber) {
        url += `&season_number=${seasonNumber}`;
        if (episodeNumber) {
            url += `&episode_number=${episodeNumber}`;
        }
    }
    const response = await axios.get(url);
    return response.data.cast;
};

const getActorFilmography = async (actorId) => {
    const response = await axios.get(`${BASE_URL}/person/${actorId}/movie_credits?api_key=${API_KEY}`);
    return response.data.cast;
};

const displayFilmographyTable = async (filmographies, cast) => {
    // Aggregate popularity scores for each project
    const popularityMap = filmographies.flat().reduce((acc, film) => {
        acc[film.title] = (acc[film.title] || 0) + film.popularity;
        return acc;
    }, {});

    // Create a sorted array of projects based on popularity
    const sortedProjects = Object.keys(popularityMap)
        .map(title => ({ title, popularity: popularityMap[title] }))
        .sort((a, b) => b.popularity - a.popularity)
        .map(item => item.title);

    const { project } = await inquirer.prompt([
        {
            type: 'list',
            name: 'project',
            message: 'Choose a project:',
            choices: sortedProjects,
        },
    ]);

    const table = filmographies
        .flat()
        .filter(film => film.title === project)
        .map(film => ({
            Actor: film.actorName,
            CharacterInOriginal: film.characterInOriginal,
            CharacterInProject: film.character,
        }));

    console.table(table);

    const { nextStep } = await inquirer.prompt([
        {
            type: 'list',
            name: 'nextStep',
            message: 'Would you like to choose another project or end the app?',
            choices: ['Choose another project', 'End the app'],
        },
    ]);

    if (nextStep === 'Choose another project') {
        await displayFilmographyTable(filmographies, cast); // Recursive call
    }
};

const startApp = async () => {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Do you want to get info for a movie or TV show?',
            choices: ['Movie', 'TV Show'],
        },
    ]);

    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: `Enter the name of the ${choice.toLowerCase()}:`,
        },
    ]);

    let getId;
    let getCast;

    if (choice === 'Movie') {
        getId = getMovieId;
        getCast = getMovieCast;
    } else {
        const { season } = await inquirer.prompt([
            {
                type: 'input',
                name: 'season',
                message: 'Enter the season number:',
            },
        ]);

        const { episode } = await inquirer.prompt([
            {
                type: 'input',
                name: 'episode',
                message: 'Enter the episode number (leave blank for all episodes in the season):',
            },
        ]);

        getId = getShowId;
        getCast = (id) => getShowCast(id, season, episode);
    }

    const cast = await getId(name).then(getCast);
    const filmographies = await Promise.all(cast.map(actor => getActorFilmography(actor.id).then(films => films.map(film => ({...film, actorId: actor.id, actorName: actor.name, characterInOriginal: actor.character})))));
    
    await displayFilmographyTable(filmographies, cast);
};

startApp();