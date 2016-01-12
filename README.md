# Integration tests with postman

This small "API" should demonstrate the power of postman (in combination with newman). Postman itself is a request runner based on google chrome. You can send any request you desire to any api and even modify them with a proxy in between. If you want to automate your integration tests, you can export the created collection and run it with newman in your CI-environment.

## Setup

```bash
npm install -g newman
npm install
npm start
```

Your demo api is running now.

## Execute tests

Since the api is only for demo cases, after each run (with or without data file) you need to restart the api so the objects array is emptied :wink:.

### Without a data file

Executing without a datafile means you run your testcollection once.

```bash
newman -c integration-tests.json
```

### With a data file

Executing with a data file means you run as many iterations as there are data-objects. In this test-case there are five iterations. Each iteration creates a different object with a different name and a incremented id. With this possibility, a CI envrionment can test multiple product creation and deletion cycles.

```bash
newman -c integration-tests-with-data.json -d test-data.json
```