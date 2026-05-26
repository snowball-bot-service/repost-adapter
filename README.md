# @snowball-bot/repost-adapter

Contract package for `@snowball-bot/repost` plugin adapters.
Defines the interfaces that adapter authors must implement.

## Installation

```bash
pnpm add @snowball-bot/repost-adapter
```

## Usage

```typescript
import type { Adapter, AdapterContext } from '@snowball-bot/repost-adapter';

const adapter: Adapter = {
  manifest: {
    name: 'repost-adapter-twitter',
    provider: 'twitter',
    whitelistHosts: ['twitter.com', 'x.com', 't.co'],
    billing: {
      text: 200,
      token: 1000,
      media: 2000,
      green: 1,
    },
    providerInfo: {
      name: "推特",
      icon: "🐦",
      color: "#FFFFFF",
      bgColor: "#2196F3",
    },
    version: 1,
    author: 'your name',
  },

  async initState(ctx: AdapterContext) {
    ctx.on('onRepostRequest', async (req) => {
      // Handle your repost logics here...
      return {
        platform: 'twitter',
        author: { name: '...', handle: '...' },
        content: '...',
        createdAt: Date.now(),
        originalUrl: req.url,
      };
    });
  },
};

export default adapter;
```

## Versioning

This package follows Semantic Versioning. Breaking changes to the contract
will result in a major version bump.

## License

MIT
