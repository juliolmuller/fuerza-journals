<h1 title="fuerza nocturnal" align="center">
  <img alt="Fuerza Nocturnal" src=".github/logo.png" width="180px">
</h1>

<p align="center">
  <a href="#pencil-objectives">Objectives</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#trophy-lessons-learned">Lessons Learned</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-technologies--resources">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#hammer-setting-up-the-environment">Environment Setup</a>
</p>

<p align="center">
  <img src="https://img.shields.io/static/v1?labelColor=000000&color=5091D6&label=created%20at&message=Aug%202021" alt="Creation Date" />

  <img src="https://img.shields.io/github/last-commit/juliolmuller/fuerza-nocturnal?label=updated%20at&labelColor=000000&color=5091D6" alt="Update Date" />

  <img src="https://img.shields.io/static/v1?labelColor=000000&color=5091D6&label=PRs&message=welcome" alt="Pull Requests Welcome" />

  <img src="https://img.shields.io/github/license/juliolmuller/fuerza-nocturnal?labelColor=000000&color=5091D6" alt="Project License" />
</p>

<p align="center">
  <img src=".github/app-overview.png" alt="Application Overview" width="100%">
</p>

This application was proposed by [Fuerza Studio](https://www.fuerzastudio.com.br/en/) as part of their recruitment process for frontend developers. The challenge was to build a fully responsive client application in React using TypeScript and consuming a fake REST API. The original statement cam be found [here](.github/statement.md).

[Check out the application running!](https://fuerza-nocturnal.vercel.app/)

## :pencil: Objectives

- [x] Build the UI based on [Figma's prototype](https://www.figma.com/file/NLTV0LaT4wTayhMusGZppT/Fuerza-Teste-(Copy)?node-id=0%3A1);
- [x] Use the fake *mirage* REST API (already set in the project) to simulate calls to a backend;
- [x] Implement a simple authentication system;
- [x] Make the UI responsive;

## :trophy: Lessons Learned

- Interaction with `mirage.js`*`;
- State management using `zustand`;
- Input label shrinking, similar to Material Design's;

## :rocket: Technologies & Resources

**Frontend:**
- [React 17](https://reactjs.org)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Axios](https://github.com/axios/axios) (HTTP client)

**Development:**
- [Visual Studio Code](https://code.visualstudio.com/)
- [Cmder](https://cmder.net/) (terminal emulator)
- [Node.js](https://nodejs.org/en/) scripts (with Laravel Mix)

## :hammer: Setting up the Environment

Make sure to have **Node.js 10+** installed in your machine and its **npm** available in the command line, then use the following command to install dependencies:

```bash
$ npm install
```

To execute the application, you must just configure a storage key for the authenticated user to be "maintained", although the fake backend is restarted on application refresh. The storage key is being pulled from environment variables, so create a `.env` file, at project root based on `.env.example`.

At last, you can use the following commands to run the application:

```bash
$ yarn start   # Run development server
$ yarn build   # Build files for production
```
