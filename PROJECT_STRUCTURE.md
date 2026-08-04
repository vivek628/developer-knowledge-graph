# Project structure

The application is split into two small JavaScript applications. The backend
owns all database access and the frontend only talks to the backend REST API.
This keeps CognoDB credentials out of the browser.

```text
developer-knowledge-graph/
|-- backend/
|   |-- config/       # Environment and application configuration
|   |-- controllers/  # Translate HTTP requests into service calls
|   |-- db/           # CognoDB connection and database helpers
|   |-- queries/      # Parameterized Cypher query strings
|   |-- routes/       # Express endpoint definitions
|   |-- seed/         # Realistic graph data and the seed command
|   |-- services/     # Application and graph traversal logic
|   `-- utils/        # Small shared backend helpers
|-- frontend/
|   |-- src/
|   |   |-- components/ # Reusable UI building blocks
|   |   |-- hooks/      # Reusable React state and data-loading logic
|   |   |-- layouts/    # Shared page structure and navigation
|   |   |-- pages/      # Route-level screens
|   |   `-- services/   # HTTP calls to the backend
|   |-- index.html
|   `-- vite.config.js
|-- .gitignore
`-- PROJECT_STRUCTURE.md
```

## Request flow

```text
React page -> frontend service -> Express route -> controller -> service
                                                    |
                                                    v
                                         parameterized Cypher query
                                                    |
                                                    v
                                                 CognoDB
```

Each layer has one clear job. Routes choose the endpoint, controllers handle
HTTP details, services contain application decisions, and queries contain the
Cypher. This is enough separation to keep the code maintainable without adding
unnecessary abstractions.
