# evora's backend

![GitHub contributors](https://img.shields.io/github/contributors/EXEFPT/evora)
![GitHub top language](https://img.shields.io/github/languages/top/EXEFPT/evora)
![GitHub repo size](https://img.shields.io/github/repo-size/EXEFPT/evora)
![GitHub License](https://img.shields.io/github/license/EXEFPT/evora)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=EXEFPT_evora&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=EXEFPT_evora)

> A foundation connects customers with event organizers quickly through detailed online booking.

## Configuration

Create a `.env` file there and add the following environment variables:

| #   | Variable Name | Description                          | Example                 |
| --- | ------------- | ------------------------------------ | ----------------------- |
| 1   | BACKEND_PORT  | The port number to run the server on | 3000                    |
| 2   | DATABASE_URL  | The URL to the MongoDB database      | localhost:27017/evora   |
| 3   | JWT_SECRET    | The secret key for JWT               | secret-key              |
| 4   | JWT_EXPIRES   | The expiration time for JWT          | 1h                      |

## Development

- Step 1: Install dependencies

  ```bash
  npm i
  ```

- Step 2: Start the development server

  ```bash
  npm run start:dev
  ```

- Step 3: Open the browser and navigate to [http://localhost:3000](http://localhost:3000)