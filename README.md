# Movie and TV Show Info Application

This application provides a user-friendly interface for fetching and displaying cast information for movies and TV shows from The Movie Database (TMDb) API.

## Features

- Search for movies or TV shows by name.
- Display a list of cast members for the selected movie or TV show.
- For TV shows, option to specify the season and episode number.
- Fetch and display filmographies for the entire cast of the selected project.
- List filmographies ordered by shared actors and popularity.
- Interactive prompts for user selections.

## How It Works

The application follows these steps to provide the information to the user:

- **Prompt User for Project Type**: Users can select whether they want to search for a movie or a TV show.
- **Search by Name**: Users enter the name of the movie or TV show they are interested in.
- **Season and Episode Selection**: If a TV show is selected, users have the option to specify the season and episode number.
- **Display Cast**: The application fetches and displays a list of cast members for the selected project.
- **Fetch Filmographies**: For each cast member, the application fetches their filmography, which includes both movies and TV shows.
- **List Projects by Shared Actors**: The application lists projects that share the most actors from the originally searched project, ordered by popularity.
- **User Selection of Filmography**: Users can select a project from the filmography list to see more details.
- **Display Table**: A table is displayed showing the actor, their character in the original project, and their character in the selected filmography project.
- **Repeat or End**: Users can choose to select another project from the filmography list or end the application.

## Installation

To run this application, you'll need Node.js and npm installed. Follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/matthelton/rthey.git
   ```
2. Navigate to the project directory:
   ```bash
   cd your-repo-name
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the application:
   ```bash
   npm start
   ```

## Usage

After starting the application, follow the on-screen prompts to navigate through the application's features.

## Contributing

Contributions to this project are welcome. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b your-branch-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the original branch: `git push origin your-repo-name/your-branch-name`.
5. Create the pull request.

Alternatively, see the GitHub documentation on [creating a pull request](https://help.github.com/articles/creating-a-pull-request/).

## License

This project is licensed under the [MIT License](LICENSE.md).

## Contact

For any queries or feedback, please contact [Matt Helton](mailto:mjoelhelton@me.com).