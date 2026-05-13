<h1 align="center">Smart Study Advisor</h1>

<p align="center"> Smart study advisor for recommending the right courses for you. </p>

<div align="center">

<a href="https://github.com/Rapkt/Mix-paradigms/graphs/contributors">
  <picture>
    <source media="(prefers-color-scheme: dark)"  srcset="https://img.shields.io/github/contributors/Rapkt/Mix-paradigms?style=for-the-badge&labelColor=%23151b23&color=%234493f8">
    <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/contributors/Rapkt/Mix-paradigms?style=for-the-badge&labelColor=%23f6f8fa&color=%230969da">
    <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/Rapkt/Mix-paradigms?style=for-the-badge&labelColor=%23151b23&color=%234493f8">
  </picture>
</a>
<a href="https://github.com/Rapkt/Mix-paradigms/pulse">
  <picture>
    <source media="(prefers-color-scheme: dark)"  srcset="https://img.shields.io/github/last-commit/Rapkt/Mix-paradigms?style=for-the-badge&labelColor=%23151b23&color=%234493f8">
    <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/last-commit/Rapkt/Mix-paradigms?style=for-the-badge&labelColor=%23f6f8fa&color=%230969da">
    <img alt="GitHub Last Commit" src="https://img.shields.io/github/last-commit/Rapkt/Mix-paradigms?style=for-the-badge&labelColor=%23151b23&color=%234493f8">
  </picture>
</a>
<a href="https://github.com/Rapkt/Mix-paradigms/stargazers">
  <picture>
    <source media="(prefers-color-scheme: dark)"  srcset="https://img.shields.io/github/stars/Rapkt/Mix-paradigms?style=for-the-badge&labelColor=%23151b23&color=%234493f8">
    <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/stars/Rapkt/Mix-paradigms?style=for-the-badge&labelColor=%23f6f8fa&color=%230969da">
    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Rapkt/Mix-paradigms?style=for-the-badge&labelColor=%23151b23&color=%234493f8">
  </picture>
    </a>
</div>

## Features

<table width="100%">
  <tr>
    <td valign="top">
      <h3>Overview</h3>
      <ul>
      <li>Supports both AI-based and non-AI recommendation.</li>
      <li>Personalize course recommendations based on your preferences.</li>
      <li>Mobile application available for easy access.</li>
      </ul>
      <h3>AI Engine</h3>
      <p>Utilizes a large language model to generate personalized course recommendations based on free-form text input.</p>
      <ul>
        <li>Based on machine learning</li>
        <li>Free-form text input for preferences</li>
        <li>Provides a more flexible recommendation based on the model's understanding of the input</li>
      </ul>
      <h3>Prolog Engine</h3>
      <p>Employs logic programming to provide recommendations based on a structured set of rules and facts about courses, prerequisites, and user preferences.</p>
      <ul>
        <li>Based on a structured set of rules and facts</li>
        <li>Choose from a predefined set of preferences</li>
        <li>Provides a more deterministic recommendation based on the defined logic</li>
      </ul>
    </td>
    <td width="260px" valign="top" >
      <video src="https://github.com/Rapkt/Mix-paradigms/raw/main/.github/assets/demo.mp4" width="260" controls ></video>
    </td>
  </tr>
</table>

## Design and Structure

### Backend

The backend is built utilizing **Django** to serve as a robust HTTP API layer. It integrates multiple paradigms to formulate up appropriate course recommendations. The primary source code is located in the `backend/` directory with the following structure:

- **`core/`**: Contains the core Django settings and root URL routing configurations.
- **`api/`**: The main application that handles incoming HTTP requests.
  - **`views.py`**: Exposes the REST endpoints (`/api/ai/recommend` and `/api/prolog/recommend`). It parses incoming JSON requests and routes them to the requested engine.
  - **`schemas.py`**: Defines the data models using Pydantic, enforcing strict type validations for incoming request bodies to ensure the backend receives properly formatted parameters.
  - **`ai/`**: Employs an LLM-based agent workflow (AI Agent paradigm).
    - **`agent.py`**: Configures the LangChain agent using the `ChatGroq` model with fallback behaviors and strict prompt guidelines.
    - **`tools.py`**: Connects the LLM to project data. It utilizes the **Data-centric paradigm** via the `pandas` library to fetch uncompleted, valid courses from the CSV dataset.
  - **`prolog/`**: Uses **Logic Programming** to determine recommendations.
    - **`queries.py` & `queries.pl`**: Interfaces with SWI-Prolog through the `pyswip` bridge. It declares rules for traversing prerequisites, user preferences, and course difficulty to formulate a strict, rule-based recommendation schedule.
- **`data/`**: Acts as the shared data layer containing the knowledge base in `.csv` (for Pandas/AI) and `.pl` (for Prolog) formats.
- **`scripts/`**: Contains utility scripts, such as `convert_csv_to_pl.py`, designed to automate the synchronization between the tabular CSV data and the logical Prolog facts.

### Frontend

The frontend is a cross-platform mobile application built using **React Native** and the **Expo** framework. It leverages a **Declarative UI / Functional paradigm** through React components and hooks. The structure resides primarily in `frontend/`:

- **`app/`**: Implements Expo Router for file-based routing.
  - **`index.tsx`**: The main landing page orchestrating the step-by-step user onboarding flow (managing state for major, year, past courses, and engine choice).
  - **`results.tsx`**: Responsible for interpreting the backend payloads and dynamically rendering the recommended schedule (e.g., categorizing by AI reasoning or Prolog's difficulty tiering).
- **`app/components/wizard/`**: Encapsulates the multi-step form into isolated, modular React components.
  - **`Majors.tsx`, `TakenCourses.tsx`, `EngineChoice.tsx`, `AIPrompt.tsx`**: Pure functional components handling distinct fragments of user input to keep the application organized.
  - **`Summary.tsx` & `Recommendation.tsx`**: Compiles user input for a final review before dispatching the network request.
- **`constants/`**: Houses static configurations arrays, like the structured list of all university courses (`courses.ts`), used to map IDs to readable display names.
- **`services/`**:
  - **`api.ts`**: The dedicated communication layer. It abstracts the `fetch` logic, cleanly routing user payloads to either the Prolog or AI backend endpoints depending on user selection.
- **`types/`**: Contains TypeScript interfaces enforcing type safety across the frontend ecosystem.

## Building

### Prerequisites

- [Python](https://www.python.org/downloads/)
- [uv](https://docs.astral.sh/uv/getting-started/installation/)
- [SWI-Prolog](https://www.swi-prolog.org/Download.html)
- [Node.js](https://nodejs.org/en/download)

Clone the repository:

```bash
git clone https://github.com/Rapkt/Mix-paradigms.git
```

Navigate to the project directory:

```bash
cd Mix-paradigms
```

### Building Backend

Navigate to the backend directory:

```bash
cd backend
```

Copy .env.example as .env and replace the placeholders with your actual values:

```bash
cp .env.example .env
```

Install the dependencies using uv:

```bash
uv sync
```

Run the backend server:

```bash
uv run --env-file .env manage.py runserver
```

### Building Frontend

Navigate to the frontend directory:

```bash
cd frontend
```

Copy .env.example as .env and replace the placeholders with your actual values:

```bash
cp .env.example .env
```

Install the dependencies using npm:

```bash
npm install
```

Run the frontend application:

```bash
npx expo start
```
