import {RequesterPayload} from "./requester";
import {SocialProvider} from "./provider";

/**
 * 进程代号
 */
export type ProcessMethod = "strawberry" | "watermelon" | "apple";

/**
 * 媒体信息类型
 */
export type MediaInfoType = "image" | "video" | "audio";

/**
 * 进程媒体信息
 */
export interface ProcessMediaInfo {
  /**
   * 媒体消息类型
   */
  type: MediaInfoType;

  /**
   * URL
   */
  url: string;

  /**
   * 概要
   */
  summary?: string;
}

/**
 * 下一步进程信息, 特指: strawberry, watermelon
 */
export interface NextProcessInfo {
  /**
   * 进程 Emoji
   */
  emoji: string;
  /**
   * 进程代指功能, 不超过 6 个汉字
   */
  feature: string;
}

/** 进程请求事件 payload */
export interface AdapterProcessRequestParams {
  /**
   * 该请求的唯一 ULID, ResponsePayload 需要传回相同的 ULID 进行验证
   */
  code: string;

  /**
   * 进程代号
   */
  method: ProcessMethod;

  /**
   * 原数据
   */
  source: string;

  /**
   * 请求人负载
   */
  requester: RequesterPayload

  /**
   * 额外参数
   */
  meta?: Record<string, unknown>;
}

/** 适配器返回的标准化数据 */
export interface AdapterProcessResponsePayload {
  /**
   * 由 RequestParams 发送的 ULID, 传回相同的 ID
   */
  code: string;

  /**
   * 进程代号
   */
  method: ProcessMethod;

  /**
   * 平台标识
   */
  provider: SocialProvider;

  /**
   * 请求发起人信息
   */
  requester: RequesterPayload;

  /**
   * 媒体列表
   */
  medias: ProcessMediaInfo[];

  /**
   * 对于远程媒体，是否使用代理转发模式，常用于外网媒体, eg. Twitter
   */
  useProxy?: boolean;

  /**
   * 适配器自定义字段
   */
  extra?: Record<string, unknown>;
}
