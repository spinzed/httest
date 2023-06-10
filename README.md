This repo contains solution for a task that was provided by Hrvatski Telekom as a selection task for their internship.  

The project goal is to make a CRUD-like Dashboard app for packets/parcels that Hrvatski Telekom tracks. Frontend is made in React + TypeScript, backend in Node + Express and data is stored in a Postgres database.  

The entire project is dockerised and designed to run inside Docker containers via docker-compose. To run the project, install Docker and docker-compose and run in the root of this project:  

```shell
docker-compose build
docker-compose up
```

This will compile and run the app and expose an access point to the dashboard on port 80. To view it, go to your browser on http://localhost.

Disclaimer: due to severe time pressure, I had to make compromises in a few places regarding functionality and code quality.