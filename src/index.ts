export type { SocialProvider, ProviderInfo, ProviderBilling } from './provider';
export type { AdapterManifest, AdapterName } from './manifest';
export type {
  RepostAdapterRequestParams,
  RepostAdapterResponsePayload,
  RepostHandler,
  BaseRepostAdapterResponsePayload,
  RepostMethod,
  RepostBadgeParams,
  NextProcessInfo,
} from './handler';
export type { Helper } from './helper';
export type { AdapterContext, AdapterEvent, ILogger } from './context';

/**
 * 适配器接口。所有 adapter 必须导出符合此结构的对象。
 */
export interface Adapter {
  /** 适配器元信息 */
  manifest: import('./manifest').AdapterManifest;

  /** 初始化（注册事件、读取配置等） */
  initState(ctx: import('./context').AdapterContext): void | Promise<void>;

  /** 卸载清理（可选） */
  dispose?(): void | Promise<void>;
}

/**
 * 契约包版本号（用于运行时检测）
 */
export const CONTRACT_VERSION = 1 as const;
