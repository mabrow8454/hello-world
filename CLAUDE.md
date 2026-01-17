# CLAUDE.md - AI Assistant Development Guide

## Repository Overview

**Repository**: mabrow8454/hello-world
**Purpose**: Learning and experimentation repository
**Owner**: Matt Brown
**Current State**: Introductory/Hello World repository

This is a simple introductory repository created for learning GitHub workflows and version control. The repository currently contains minimal code and serves as a sandbox for experimentation.

## Repository Structure

```
hello-world/
├── .git/                 # Git version control directory
├── README.md            # Project introduction and personal notes
└── CLAUDE.md            # This file - AI assistant documentation
```

### Key Files

- **README.md**: Contains personal introduction and learning progress notes
  - Location: `/home/user/hello-world/README.md`
  - Purpose: Basic repository description and personal information

## Development Workflow

### Branch Strategy

This repository uses a specific branching strategy for AI-assisted development:

- **Claude Feature Branches**: All AI assistant work should be done on branches with the pattern `claude/*-{SESSION_ID}`
  - Example: `claude/add-claude-documentation-ZDbI5`
  - **CRITICAL**: Branch names MUST start with `claude/` and end with the matching session ID
  - Pushing to incorrectly named branches will fail with 403 HTTP error

### Current Development Branch

**Active Branch**: `claude/add-claude-documentation-ZDbI5`

All changes should be committed to this branch until the feature is complete.

### Git Operations

#### Pushing Changes
```bash
git push -u origin <branch-name>
```

**Important Guidelines**:
- Always use the `-u` flag for the first push to set upstream tracking
- Branch must follow `claude/*` naming convention
- If push fails due to network errors, retry up to 4 times with exponential backoff (2s, 4s, 8s, 16s)

#### Fetching/Pulling Changes
```bash
# Fetch specific branch
git fetch origin <branch-name>

# Pull changes
git pull origin <branch-name>
```

- Prefer fetching specific branches over fetching all
- Apply same retry logic (4 retries with exponential backoff) for network failures

### Commit Message Style

Based on the existing commit history, this repository uses informal, descriptive commit messages:

**Existing Commits**:
- "Wins column is within reach"
- "First time figuring this out"
- "Update README.md"
- "Initial commit"

**Recommended Style for AI Assistants**:
- Keep messages clear and descriptive
- Focus on what changed and why
- Use casual, friendly tone to match repository style
- Examples:
  - "Add CLAUDE.md documentation for AI assistants"
  - "Update README with project structure"
  - "Fix typo in documentation"

## Development Conventions

### Code Style and Standards

Since this is currently a minimal repository, establish conventions as the codebase grows:

1. **File Organization**
   - Keep root directory clean
   - Create subdirectories as needed (e.g., `src/`, `docs/`, `tests/`)
   - Use lowercase with hyphens for directory names

2. **Documentation**
   - Update README.md for user-facing documentation
   - Update CLAUDE.md for AI assistant guidance
   - Add inline comments for complex logic

3. **Version Control**
   - Commit frequently with clear messages
   - Never commit sensitive information (API keys, credentials)
   - Keep commits focused on single concerns

### AI Assistant Guidelines

When working with this repository, AI assistants should:

1. **Always Read Before Writing**
   - Use Read tool to check existing file contents before editing
   - Understand context before making changes
   - Verify current state of repository

2. **Follow Branching Rules**
   - Work exclusively on designated `claude/*` branches
   - Never push to main/master without explicit permission
   - Create branch locally if it doesn't exist

3. **Be Minimal and Focused**
   - Only make requested changes
   - Avoid over-engineering for this simple repository
   - Don't add unnecessary complexity
   - Keep the learning/experimental nature in mind

4. **Respect Repository Purpose**
   - This is a learning repository
   - Maintain simplicity and accessibility
   - Add features incrementally
   - Prioritize clarity over complexity

5. **Documentation Updates**
   - Update CLAUDE.md when development patterns change
   - Keep README.md in sync with actual repository state
   - Document any new conventions or workflows

## Common Tasks

### Adding New Files

```bash
# Create file
touch filename

# Add to git
git add filename

# Commit
git commit -m "Add filename with [purpose]"

# Push
git push -u origin <branch-name>
```

### Updating Documentation

1. Read current documentation with Read tool
2. Make targeted edits with Edit tool
3. Commit changes with descriptive message
4. Push to current feature branch

### Creating Pull Requests

When ready to merge changes:

```bash
# Ensure all changes are committed
git status

# Push to remote branch
git push -u origin <branch-name>

# Create PR using GitHub CLI
gh pr create --title "Title" --body "Description"
```

## Repository State (as of 2026-01-17)

- **Total Files**: 1 (README.md) + 1 (CLAUDE.md)
- **Lines of Code**: Minimal (README only)
- **Primary Language**: Markdown
- **Dependencies**: None
- **Build System**: None
- **Testing Framework**: None

## Future Development Considerations

As this repository grows, consider:

1. **Project Structure**
   - Add source code directories when needed
   - Implement consistent file organization
   - Create configuration files as required

2. **Development Tools**
   - Add package manager (npm, pip, etc.) when code is added
   - Set up linting and formatting tools
   - Implement testing framework

3. **Documentation**
   - Expand README.md with usage instructions
   - Add API documentation if applicable
   - Create contributing guidelines if opening to collaborators

4. **CI/CD**
   - Set up GitHub Actions for automated testing
   - Add build/deploy pipelines as needed
   - Implement code quality checks

## Notes for AI Assistants

- **Repository Owner**: Matt Brown (mabrow8454)
- **Experience Level**: Learning GitHub/Git workflows
- **Repository Maturity**: Early stage/experimental
- **Collaboration Style**: Open to suggestions, learning-focused
- **Safety**: No production code, safe for experimentation

## Contact & Support

- **Repository**: https://github.com/mabrow8454/hello-world
- **Issues**: Use GitHub Issues for questions or problems
- **Pull Requests**: Follow standard GitHub PR workflow

## Version History

- **2026-01-17**: Initial CLAUDE.md creation
  - Documented repository structure
  - Established development workflows
  - Defined AI assistant guidelines

---

*This document should be updated as the repository evolves and new conventions are established.*
