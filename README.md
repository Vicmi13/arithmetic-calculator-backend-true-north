# back end true-north

## Technical Stack

- Node 18.10.0
- Express: 4.18.2
- Sequelize: 6.28.0
- mysql2: 3.1.2

## Initial setup

- Node version require 18.10.0
- In root directory `npm i`
- IMPORTANT Configure environment variables:
  - `cp .env.example .env`
- Run script
- `npm dev`: starts the app locally

- P.S. In case you have a lower version of node, you can install [NVM](https://github.com/nvm-sh/nvm)
- Install Node 18.10.0 through nvm
- Once you have installed nvm, you can install the version `nvm i 18.10.0`
- Set the Node version to be used: `nvm use 18.10.0`

## Setup local

In case you want to execute the project locally the back end uses Sequelize as ORM,
and has migration and seeders file for create and insert initial values required for run the project
correctly

- Is mandatory that you have a Mysql connection running and
  can establish connection to it, using your own credentials - Database host is setting to local
- Inside your schema create the database required for the project with thw following name `true-north`
- At this point with your database already creater, in root directory `npm run migration-local`
- then in same path `npm run seeders-local`

This commands create the tables and insert data in the catalog for arithmetic operations

# API resources

Share the [URL](https://api.postman.com/collections/2815463-8d4c7d58-4f4d-4c63-9dd3-9353d01e0ece?access_key=PMAT-01GSBK1TC14EZ8SFQM6RST3SB2) for postman collection with backen end endpoints.
PS. All are pointing to localhost, in case you want to hit
the develop environment, here's the base [url](http://arithmeticcalculator-env.eba-ejcwhe8a.us-west-2.elasticbeanstalk.com/)

- `/user` endpoint it's public so that create any number of users of your preference
- All the other resource are protected and required the token in headers -> Authorization param
  i.e. Authorization - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthbGVpQGhvdG1haWwuY29tIiwic3RhdHVzIjp0cnVlLCJpZCI6MiwiaWF0IjoxNjc2NDk2MjE1LCJleHAiOjE2NzY0OTc0MTV9.L6Qu6Ats_ghtzP7gwKIHsoInfen2ZiBWK2mqdPodcdU

# Develop environment

The live version uses the next resources from AWS:

- EBS for create the web app

  - ECS
  - Cloud formation
  - S3 bucket
  - Securtiy groups
  - Cloudwatch
  - develop environment

- RDS with Mysql
  \
