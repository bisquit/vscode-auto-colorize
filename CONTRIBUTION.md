## develop

```sh
pnpm i

pnpm dev
```

Debug > Run Extension

Open `DEBUG CONSOLE` (Cmd + Shift + y) to see logs.

After modifying, 「Cmd + Shift + P」 > 「Developer: Reload Window」 in extension host window.

## publish

```sh
pnpm add -g @vscode/vsce
```

```sh
pnpm dlx commit-and-tag-version
git push --follow-tags origin main

pnpm run vsce:package
pnpm run vsce:publish
```
