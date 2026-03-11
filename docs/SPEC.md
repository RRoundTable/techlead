# Spec

## Capabilities

### User Authentication
A user can securely identify themselves and maintain a session.

**Behaviors:**
- Given a registered user, when they provide valid credentials, then they receive a session token
- Given an expired token, when it is used, then the user is prompted to re-authenticate
- Given an unregistered email, when login is attempted, then the error message does not reveal whether the email exists

**Acceptance criteria:**
- [ ] Users can sign up with email and password
- [ ] Users can log in and receive a JWT token
- [ ] Users can log out (token invalidation)
- [ ] Failed login attempts do not reveal whether the email exists

### Task Management
A user can create, view, update, and delete their own tasks.

**Behaviors:**
- Given an authenticated user, when they create a task, then it appears in their task list
- Given a task owned by the user, when they update it, then the changes persist
- Given a task owned by the user, when they delete it, then it no longer appears in any list

**Acceptance criteria:**
- [ ] Authenticated users can create tasks with a title and optional description
- [ ] Users can list, filter, and sort their own tasks
- [ ] Users can update task title, description, and status
- [ ] Users can delete their own tasks

### Team Workspaces
A user can collaborate with others in shared workspaces with role-based access.

**Behaviors:**
- Given a workspace owner, when they invite a user, then that user can access the workspace's tasks
- Given a member with read-only role, when they attempt to edit a task, then the action is denied
- Given a workspace admin, when they change a member's role, then the member's permissions update immediately

**Acceptance criteria:**
- [ ] Users can create workspaces and invite members
- [ ] Roles (owner, admin, member, viewer) control what actions are available
- [ ] Task visibility is scoped to the workspace

## Invariants

- Unauthenticated requests can never access user-specific data
- A user can never access another user's tasks without explicit workspace membership
- Deleting a workspace does not delete the users — only the workspace and its tasks
- Role changes take effect immediately — no stale permission windows
