import { describe, it, expect, vi } from 'vitest';
import type { AdapterContext, RepostHandler } from '@snowball-bot/repost-adapter';
import adapter from '../src';

/**
 * 构造一个 mock 的 AdapterContext，用于隔离测试 adapter 行为。
 * 这个工厂函数本身也是给第三方作者参考的——他们可以照抄。
 */
function createMockContext(): {
  ctx: AdapterContext;
  getHandler: () => RepostHandler;
} {
  let registeredHandler: RepostHandler | null = null;

  const ctx: AdapterContext = {
    on: vi.fn((event, handler) => {
      if (event === 'onRepostRequest') registeredHandler = handler;
    }),
    config: vi.fn(() => undefined),
    helper: {
      pick: (record, key, fallback) => record[key] ?? fallback!,
    },
    logger: {
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      debug: vi.fn(),
    },
  };

  return {
    ctx,
    getHandler: () => {
      if (!registeredHandler) throw new Error('Handler not registered');
      return registeredHandler;
    },
  };
}

describe('echo adapter', () => {
  it('declares correct manifest', () => {
    expect(adapter.manifest.name).toBe('repost-adapter-echo');
    expect(adapter.manifest.provider).toBe('echo');
    expect(adapter.manifest.whitelistHosts).toContain('example.com');
  });

  it('registers onRepostRequest handler on init', async () => {
    const { ctx } = createMockContext();
    await adapter.initState(ctx);
    expect(ctx.on).toHaveBeenCalledWith('onRepostRequest', expect.any(Function));
  });

  it('echoes back the URL path', async () => {
    const { ctx, getHandler } = createMockContext();
    await adapter.initState(ctx);

    const result = await getHandler()({
      source: 'https://example.com/posts/12345',
      requester: {
        nickname: "Requester",
        userId: "-1",
      },
      code: 'test-001',
    });

    expect(result).not.toBeNull();
    expect(result!.provider).toBe('echo');
    expect(result!.content).toContain('12345');
    expect(result!.originalUrl).toBe('https://example.com/posts/12345');
  });

  it('uses custom greeting from config', async () => {
    const { ctx, getHandler } = createMockContext();
    vi.mocked(ctx.config).mockImplementation((key) =>
      key === 'greeting' ? 'Hi' : undefined
    );

    await adapter.initState(ctx);

    const result = await getHandler()({
      source: 'https://example.com/posts/abc',
      requester: {
        nickname: "Requester",
        userId: "-1",
      },
      code: 'test-002',
    });

    expect(result!.content).toMatch(/^Hi,/);
  });
});
