<h1 align="center">Smart Study Advisor</h1>

<p align="center"> Smart study advisor for recommending the right courses for you. </p>

<div align="center">

<a href="https://github.com/Rapkt/Mix-paradigm/graphs/contributors">
  <picture>
    <source media="(prefers-color-scheme: dark)"  srcset="https://img.shields.io/github/contributors/Rapkt/Mix-paradigm?style=for-the-badge&labelColor=%23151b23&color=%234493f8">
    <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/contributors/Rapkt/Mix-paradigm?style=for-the-badge&labelColor=%23f6f8fa&color=%230969da">
    <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/Rapkt/Mix-paradigm?style=for-the-badge&labelColor=%23151b23&color=%234493f8">
  </picture>
</a>
<a href="https://github.com/Rapkt/Mix-paradigm/pulse">
  <picture>
    <source media="(prefers-color-scheme: dark)"  srcset="https://img.shields.io/github/last-commit/Rapkt/Mix-paradigm?style=for-the-badge&labelColor=%23151b23&color=%234493f8">
    <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/last-commit/Rapkt/Mix-paradigm?style=for-the-badge&labelColor=%23f6f8fa&color=%230969da">
    <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/Rapkt/Mix-paradigm?style=for-the-badge&labelColor=%23151b23&color=%234493f8">
  </picture>
</a>
<a href="https://github.com/Rapkt/Mix-paradigm/stargazers">
  <picture>
    <source media="(prefers-color-scheme: dark)"  srcset="https://img.shields.io/github/stars/Rapkt/Mix-paradigm?style=for-the-badge&labelColor=%23151b23&color=%234493f8">
    <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/stars/Rapkt/Mix-paradigm?style=for-the-badge&labelColor=%23f6f8fa&color=%230969da">
    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Rapkt/Mix-paradigm?style=for-the-badge&labelColor=%23151b23&color=%234493f8">
  </picture>
    </a>
</div>

## Features

- Supports both AI-based and non-AI recommendation.
- Personalize course recommendations based on your preferences.
- Mobile application available for easy access.

## Building

### Prerequisites

- [Python](https://www.python.org/downloads/)
- [uv](https://docs.astral.sh/uv/getting-started/installation/)
- [SWI-Prolog](https://www.swi-prolog.org/Download.html)

Clone the repository:

```bash
git clone https://github.com/Rapkt/Mix-paradigm.git
```

Navigate to the project directory:

```bash
cd Mix-paradigm
```

### Building Backend

Navigate to the backend directory:

```bash
cd backend
```

Install the dependencies using uv:

```bash
uv sync
```

Run the backend server:

```bash
uv run manage.py runserver
```

### Building Frontend

Navigate to the frontend directory:

```bash
cd Front/paradigms
```

Install the dependencies using npm:

```bash
npm install
```

Run the frontend application:

```bash
npx expo start
```

## Design and Structure

### Backend

### Frontend
