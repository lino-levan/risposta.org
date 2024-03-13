# Risposta

Risposta is a next-generation open-source forum platform for educational
institutions.

## Features

- Google-Powered user authentication and authorization
- Create and view posts within a class
- Comment on posts and reply to comments
- Upvote and downvote posts and comments
- Tag posts with relevant categories
- Anonymous posting option
- Instructor-specific visibility setting for posts
- Editing and deleting posts
- General FAQ page
- Class management functionality

### User guide

Log in or sign up with your Google account on https://risposta.org. That's it!
Create a class or join an existing one to start posting and interacting with
your peers.

### Self-hosting guide

Make sure to install Deno: https://deno.land/manual/getting_started/installation

Rispota is built in fresh. To learn more you can follow the Fresh "Getting
Started" guide here: https://fresh.deno.dev/docs/getting-started

Then start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

#### Specific Project Structure

- routes/: Contains the route handlers for different pages and API endpoints.
- routes/api: Contains the route handlers for the API endpoints.
- islands/: Contains the interactive components used in the application.
- components/: Contains the re-used components used in the application.
- lib/: Contains utility functions and modules used throughout the project.
- db/: Contains all code that interfaces directly with the database.
- static/: Contains static assets such as images and CSS files.
- docs/: Contains the scrum documents and other project-related documents.

The surface level contains basic configurations and infrastructure-task related
files.

## Acknowledgements

- Fresh - The web framework used for building the application.
- Deno - The runtime for executing the application.
- Supabase - The open-source Firebase alternative used for the database and
  authentication.
