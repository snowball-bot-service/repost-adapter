# repost-adapter-echo (example)

A minimal example adapter that demonstrates the structure of an adapter built
on `@snowball-bot/repost-adapter`. It does not call any real API — it simply
echoes the requested URL back as a response.

Use this as a starting point for writing your own adapter.

## What this example shows

- How to declare an `AdapterManifest`
- How to implement `initState` and register the `onRepostRequest` handler
- How to read adapter-specific config via `ctx.config(key)`
- How to use `ctx.logger` for structured logging
- How to write unit tests for an adapter using a mocked context

## File structure

```
src/index.ts        — the adapter (~50 lines)
test/adapter.test.ts — unit tests with a mock context
```

## Run the tests

```bash
pnpm install
pnpm --filter repost-adapter-echo-example test
```

## Build your own adapter from this template

1. Copy this folder to a new repository
2. Replace `manifest.name`, `manifest.platform`, `manifest.whitelistHosts`
   with your platform's values
3. Replace the `handle` function with real API calls
4. Publish to npm as `repost-adapter-<your-platform>`

See the [main contract docs](../../README.md) for the full API reference.
