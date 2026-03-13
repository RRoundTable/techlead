# Spec

## Capabilities

### User Authentication

#### Login
- Given a registered user with valid credentials
- When they submit their email and password
- Then they receive a JWT access token and refresh token

#### Token Refresh
- Given a user with a valid refresh token
- When they request a new access token
- Then they receive a fresh access token without re-authenticating

### Task Management

#### Create Task
- Given an authenticated user
- When they provide a task title and optional description
- Then a new task is created and assigned to them

#### List Tasks
- Given an authenticated user
- When they request their tasks
- Then they see all tasks assigned to them, ordered by creation date
