import type {ProviderBilling, ProviderInfo, SocialProvider} from './provider';

export type AdapterName = `repost-adapter-${SocialProvider}`;

/**
 * 适配器元信息
 */
export interface AdapterManifest {
  /**
   * 适配器名称, eg. repost-adapter-twitter
   */
  name: AdapterName;
  /**
   * 适配器指示的平台, eg. twitter
   */
  provider: SocialProvider;
  /**
   * 该适配器信任的域名列表, 如果收到的消息内存在该域名, 则分发到该适配器
   */
  whitelistHosts: string[];
  /**
   * 适配器版本, 整数, 从 1 开始，每次 +1
   */
  version: number;
  /**
   * 适配器开发者
   */
  author?: string;
  /**
   * 适配器定价
   */
  billing: ProviderBilling;
  /**
   * 提供商信息
   */
  providerInfo: ProviderInfo;
}
