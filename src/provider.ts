/**
 * 支持的社交平台标识
 */
export type SocialProvider =
  | 'twitter'
  | 'weibo'
  | 'bilibili'
  | 'rednote'
  | 'bluesky'
  | (string & {})

/**
 * 提供商定价
 */
export interface ProviderBilling {
  /**
   * 文本定价，单位：字符
   *
   * 计算规则：每 X 个字符耗费 1 雪花
   *
   * @example text: 200 => 每 200 字符耗费 1 雪花
   */
  text?: number;

  /**
   * 媒体定价，单位：字节
   *
   * 计算规则：每 X 字节耗费 1 雪花
   *
   * @example media: 2000 => 每 2000 字节耗费 1 雪花
   */
  media?: number;

  /**
   * 模型调用定价，单位：词元
   *
   * 计算规则：每 X 词元耗费 1 雪花
   *
   * @example token: 2000 => 每 2000 词元耗费 1 雪花
   */
  token?: number;

  /**
   * 安全审查定价，单位：张
   *
   * 计算规则：每 X 张媒体耗费 1 雪花
   *
   * @example green: 1 => 每 1 张媒体耗费 1 雪花
   */
  green?: number;
}

/**
 * 提供商信息
 */
export interface ProviderInfo {
  /**
   * 提供商名称
   */
  name: string;

  /**
   * 提供商 Emoji 图标
   */
  icon: string;

  /**
   * 提供商文字颜色
   */
  color: string;

  /**
   * 提供商背景颜色
   */
  bgColor: string;
}
