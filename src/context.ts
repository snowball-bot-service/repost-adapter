import type {ProcessHandler, RepostHandler} from './handler';
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
 * 事件名 → 对应 handler 类型 的映射。
 *
 * 新增事件时只需在此处加一行，`AdapterEvent` 与 `on` 的类型会自动跟随。
 *
 * @argument onRepostRequest 转发请求
 * @argument onProcessRequest 下一步进程请求
 */
export interface AdapterEventMap {
  onRepostRequest: RepostHandler;
  onProcessRequest: ProcessHandler;
}

/**
 * adapter 可监听的事件名（由 {@link AdapterEventMap} 推导）。
 */
export type AdapterEvent = keyof AdapterEventMap;

/**
 * 核心暴露给 adapter 的运行时能力。
 */
export interface AdapterContext {
  /**
   * 注册事件处理器。
   * 同一个事件在一个 adapter 中只能注册一次。
   *
   * `handler` 的类型会根据 `event` 自动收窄：
   * - `on('onRepostRequest', ...)`  → {@link RepostHandler}
   * - `on('onProcessRequest', ...)` → {@link ProcessHandler}
   */
  on<E extends AdapterEvent>(event: E, handler: AdapterEventMap[E]): void;

  /**
   * 读取该 adapter 的配置项。
   */
  config<T = unknown>(key: string): T | undefined;

  /** 通用工具方法 */
  helper: Helper;

  /** 日志器（已自动带上 adapter 名前缀） */
  logger: ILogger;
}
