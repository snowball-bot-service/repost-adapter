import type { RepostHandler } from './handler';
import type { Helper } from './helper';

/**
 * 简化的日志接口（不绑定具体日志库）
 */
export interface ILogger {
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
  debug(message: string, ...args: unknown[]): void;
}

/**
 * adapter 可监听的事件名。
 * 当前只支持 onRepostRequest，未来可能扩展。
 */
export type AdapterEvent = 'onRepostRequest';

/**
 * 核心暴露给 adapter 的运行时能力。
 */
export interface AdapterContext {
  /**
   * 注册事件处理器。
   * 同一个事件在一个 adapter 中只能注册一次。
   */
  on(event: AdapterEvent, handler: RepostHandler): void;

  /**
   * 读取该 adapter 的配置项。
   */
  config<T = unknown>(key: string): T | undefined;

  /** 通用工具方法 */
  helper: Helper;

  /** 日志器（已自动带上 adapter 名前缀） */
  logger: ILogger;
}
