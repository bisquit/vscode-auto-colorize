## develop

```sh
pnpm i

pnpm dev
```

Debug > Run Extension

Open `DEBUG CONSOLE` (Cmd + Shift + y) to see logs.

After modifying, 「Cmd + Shift + P」 > 「Developer: Reload Window」 in extension host window.

## test

These are also checked in CI.

```sh
# unit testing
pnpm test

# lint, typecheck
pnpm validate
```

```sh
# e2e
pnpm e2e
```

## PR

Use `czg` or make sure to prefix type.

```sh
czg
```

## publish

### Manual publish

```sh
pnpm add -g @vscode/vsce
```

```sh
pnpm dlx commit-and-tag-version
git push --follow-tags origin main

pnpm run vsce:package
pnpm run vsce:publish
```
