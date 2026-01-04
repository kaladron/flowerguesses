# Contributing to Flower Guesses

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/flowerguesses.git
   cd flowerguesses
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running the Development Server

```bash
npm run dev
```

This starts a development server at `http://localhost:5173`

### Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Linting and Formatting

```bash
# Check for linting errors
npm run lint

# Fix linting errors automatically
npm run lint:fix

# Check code formatting
npm run format:check

# Format code automatically
npm run format
```

### Building for Production

```bash
npm run build
```

### Type Checking

```bash
npm run type-check
```

## Code Style

- **TypeScript**: All new code should be written in TypeScript
- **Formatting**: Code is automatically formatted with Prettier
- **Linting**: ESLint is configured with TypeScript support
- **Naming Conventions**:
  - Classes: PascalCase (e.g., `GameState`)
  - Functions/Variables: camelCase (e.g., `guessLetter`)
  - Constants: UPPER_SNAKE_CASE (e.g., `MAX_ATTEMPTS`)
  - Private members: prefix with `#` (e.g., `#showCursor`)

## Testing Guidelines

- Write tests for all new features
- Maintain or improve code coverage
- Use descriptive test names
- Follow the existing test structure:
  ```typescript
  describe('FeatureName', () => {
    describe('methodName', () => {
      it('should do something specific', () => {
        // Test implementation
      });
    });
  });
  ```

## Commit Messages

Follow the Conventional Commits specification:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Test additions or modifications
- `chore:` Build process or tooling changes

Examples:

```
feat: add sound effects with mute toggle
fix: correct keyboard navigation in modals
docs: update README with installation steps
test: add tests for StatsManager
```

## Pull Request Process

1. **Ensure all tests pass**: `npm test`
2. **Ensure linting passes**: `npm run lint`
3. **Ensure formatting is correct**: `npm run format:check`
4. **Update documentation** if needed
5. **Write a clear PR description** explaining:
   - What changes were made
   - Why they were made
   - How to test them
6. **Link any related issues**
7. **Request review** from maintainers

### PR Checklist

- [ ] Tests pass locally
- [ ] Code is linted and formatted
- [ ] New tests added (if applicable)
- [ ] Documentation updated (if applicable)
- [ ] No console.log statements (use console.warn or console.error if needed)
- [ ] TypeScript compilation succeeds

## Project Structure

```
flowerguesses/
├── .github/
│   └── workflows/      # CI/CD workflows
├── public/            # Static assets
├── src/
│   ├── game/         # Game logic
│   ├── ui/           # UI components
│   ├── types/        # TypeScript types
│   ├── main.ts       # Entry point
│   └── style.css     # Global styles
├── tests/            # Unit tests
├── index.html        # HTML template
└── vite.config.ts    # Build configuration
```

## Feature Ideas

Looking for ideas? Here are some features that would be great additions:

### High Priority

- [ ] Create proper PNG icons for PWA
- [ ] Add sound effects (with mute toggle)
- [ ] Implement theme switching (light/dark mode)
- [ ] Add animations for win/loss states

### Medium Priority

- [ ] AI integration for word generation
- [ ] Multiple word categories (animals, countries, etc.)
- [ ] Share results feature (social media)
- [ ] Daily challenge mode
- [ ] Hint system

### Low Priority

- [ ] Leaderboard (requires backend)
- [ ] Multiplayer mode
- [ ] Custom word lists
- [ ] Achievement system

## Reporting Issues

When reporting issues, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: How to reproduce the issue
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: Browser, OS, device type
6. **Screenshots**: If applicable

## Questions?

If you have questions, feel free to:

- Open an issue on GitHub
- Start a discussion in the Discussions tab

## License

By contributing, you agree that your contributions will be licensed under the Apache License 2.0.
