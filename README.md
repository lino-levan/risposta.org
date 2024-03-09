# Risposta

Rispota is built in fresh. To learn more you can follow the Fresh "Getting
Started" guide here: https://fresh.deno.dev/docs/getting-started

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

### Usage

Make sure to install Deno: https://deno.land/manual/getting_started/installation

Then start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

#### Specific Project Structure

- routes/: Contains the route handlers for different pages and API endpoints.
- islands/: Contains the interactive components used in the application.
- lib/: Contains utility functions and modules used throughout the project.
- static/: Contains static assets such as images and CSS files.

The surface level contains basic configurations and infrastructure-task related
files.

## Acknowledgements

- Fresh - The web framework used for building the application.
- Deno - The runtime for executing the application.
- Supabase - The open-source Firebase alternative used for the database and
  authentication.
