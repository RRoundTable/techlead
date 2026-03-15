# Spec: Task Management API

## Capabilities

### User Authentication
A user can authenticate with the system using email and password credentials.

**Behaviors:**
- Given a registered user, when they provide valid credentials, then they receive a session and can access protected features
- Given a registered user, when they provide an incorrect password, then they are informed the credentials are invalid without revealing which field was wrong
- Given an authenticated user, when their session is about to expire, then they can refresh it without re-entering credentials
- Given an authenticated user, when they log out, then their session is immediately invalidated

**Acceptance criteria:**
- [ ] Users can log in with email and password
- [ ] Invalid credentials show a generic error message
- [ ] Sessions can be refreshed before expiry
- [ ] Logout invalidates the session immediately

### Task CRUD
A user can create, view, update, and delete their own tasks.

**Behaviors:**
- Given an authenticated user, when they create a task with a title, then the task appears in their task list
- Given an authenticated user, when they view their task list, then they see only their own tasks ordered by creation date
- Given a task owner, when they update a task's title or status, then the change is reflected immediately
- Given a task owner, when they delete a task, then it is permanently removed from their task list
- Given a non-owner, when they attempt to modify another user's task, then they are denied access

**Acceptance criteria:**
- [ ] Users can create tasks with a title
- [ ] Task list shows only the authenticated user's tasks
- [ ] Task owners can update title and status
- [ ] Task owners can delete their tasks
- [ ] Non-owners cannot modify or delete others' tasks

## Invariants
- A task always belongs to exactly one user
- Authentication is required for all task operations
- Users can never see or modify other users' tasks
