# Project Rules

## Active Technologies

- TypeScript 5.x + `vscode` (engine)
- **Testing**: `vitest` (Unit), `wdio` (E2E)
- **Build**: `esbuild`
- **Lint/Format**: `eslint`, `prettier`
- **Package Manager**: `pnpm`

## Project Structure

```text
src/
e2e/
```

## Code Style

TypeScript 5.x: Follow standard conventions

## Development Workflow

- First, run `pnpm install` to install dependencies
- After modifying `package.json` dependencies, always run `pnpm install` to update `pnpm-lock.yaml`
- Before committing, run `pnpm run validate` to check for linting and type errors

## Documentation

- **IMPORTANT**: Whenever you add, modify, or remove a feature, you MUST update `README.md` to reflect the changes
- Keep the Features section and examples in sync with the actual implementation

## Release Process

To publish a new version:

1. Go to the **Actions** tab on GitHub
2. Select the **Release** workflow
3. Click **Run workflow**
4. Choose the version bump type:
   - `patch`: Bug fixes (0.0.1 → 0.0.2)
   - `minor`: New features (0.0.1 → 0.1.0)
   - `major`: Breaking changes (0.0.1 → 1.0.0)
5. Click **Run workflow**

The workflow will automatically:

- Update `package.json` version
- Create a git commit and tag
- Push to the main branch
- Publish to VS Code Marketplace and Open VSX
