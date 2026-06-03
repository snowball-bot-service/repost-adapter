import {AdapterRepostRequestParams, AdapterRepostResponsePayload} from "./repost";
import {AdapterProcessRequestParams, AdapterProcessResponsePayload} from "./process";

/**
 * 转发请求处理函数
 * 返回 null 表示 adapter 无法处理（核心会视为异常）
 */
export type RepostHandler = (
  params: AdapterRepostRequestParams
) => Promise<AdapterRepostResponsePayload | null>;

/**
 * 进程请求处理函数
 * 返回 null 表示 adapter 无法处理（核心会视为异常）
 */
export type ProcessHandler = (
  params: AdapterProcessRequestParams,
) => Promise<AdapterProcessResponsePayload | null>;
