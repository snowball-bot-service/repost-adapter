import type {
  Adapter,
  AdapterContext,
  RepostAdapterRequestParams,
  RepostAdapterResponsePayload,
} from '@snowball-bot/repost-adapter';

/**
 * Echo Adapter
 *
 * 一个最小化示例适配器，演示如何对接 @snowball-bot/repost-adapter 契约。
 * 它不调用任何真实 API，只是把传入的 URL 解析后回显成响应。
 *
 * 用途:
 *   - 作为新适配器作者的起点模板
 *   - 用于核心框架的端到端测试
 */
const adapter: Adapter = {
  manifest: {
    name: 'repost-adapter-echo',
    provider: 'echo',
    whitelistHosts: ['example.com'],
    billing: {
      text: 1024,
      media: 8192,
    },
    providerInfo: {
      name: "Example",
      icon: "",
      color: "#FFFFFF",
      bgColor: "#000000",
    },
    version: 1,
    author: "Snowball Bot",
  },

  async initState(ctx: AdapterContext) {
    // 读取可选配置（演示用，echo adapter 实际不需要任何配置）
    const greeting = ctx.config<string>('greeting') ?? 'Hello';

    ctx.logger.info(`[echo] initialized with greeting="${greeting}"`);

    ctx.on('onRepostRequest', async (req) => {
      return handle(req, greeting, ctx);
    });
  },

  async dispose() {
    // echo adapter 没有需要清理的资源
    // 真实 adapter 在这里关闭 HTTP client、定时器、连接池等
  },
};

async function handle(
  req: RepostAdapterRequestParams,
  greeting: string,
  ctx: AdapterContext
): Promise<RepostAdapterResponsePayload | null> {
  ctx.logger.debug(`[echo] handling ${req.source}`);

  const url = new URL(req.source);
  // 从 path 提取一个伪造的 "post id"
  const pathSegments = url.pathname.split('/').filter(Boolean);
  const postId = pathSegments[pathSegments.length - 1] ?? 'unknown';

  return {
    code: req.code,
    provider: 'echo',
    publishAt: new Date(),
    originalUrl: req.source,
    requester: {
      userId: "-1",
      nickname: "Requester",
    },
    author: {
      nickname: "Author Name",
    },
    content: `${greeting}, you posted: ${postId}`,
    method: "post",
    postId: "-1",
    extra: {
      // 演示 extra 字段的用法
      receivedHost: url.host,
      pathSegments,
    },
  };
}

export default adapter;
