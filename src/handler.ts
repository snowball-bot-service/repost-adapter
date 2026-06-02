import {AuthorPayload, RequesterPayload} from "./requester";
import {SocialProvider} from "./provider";
import {CanvasWidth} from "./canvas";

/**
 * 转发类型; post=推文, profile=资料页, live=直播页
 */
export type RepostMethod = "post" | "profile" | "live";

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

/**
 * 转发徽章负载
 */
export interface RepostBadgeParams {
  /**
   * 徽章 Emoji
   */
  emoji: string;
  /**
   * 徽章名称
   */
  name: string;
  /**
   * 徽章文字颜色, DEF: DARKEN-GREY
   */
  color?: string;
  /**
   * 徽章背景颜色, DEF: LIGHTEN-GREY
   */
  bgColor?: string;
  /**
   * 徽章是否加粗, DEF: FALSE
   */
  useBold?: boolean;
}

/** 转发请求事件 payload */
export interface RepostAdapterRequestParams {
  /**
   * 该请求的唯一 ULID, ResponsePayload 需要传回相同的 ULID 进行验证
   */
  code: string;
  /**
   * 原始 URL
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
export interface RepostAdapterResponsePayload extends BaseRepostAdapterResponsePayload {
  /**
   * 由 RequestParams 发送的 ULID, 传回相同的 ID
   */
  code: string;

  /**
   * 原始 URL
   */
  originalUrl: string;

  /**
   * 平台标识
   */
  provider: SocialProvider;

  /**
   * 对于远程媒体，是否使用代理转发模式，常用于外网媒体, eg. Twitter
   */
  useProxy?: boolean;

  /**
   * 请求发起人信息
   */
  requester: RequesterPayload;

  /**
   * 画布宽度
   */
  canvasWidth?: CanvasWidth;

  /**
   * 下一步进程信息
   */
  strawberry?: NextProcessInfo;
  /**
   * 下一步进程信息
   */
  watermelon?: NextProcessInfo;

  /**
   * 适配器自定义字段
   */
  extra?: Record<string, unknown>;
}

/**
 * 基础适配器回执负载
 */
export interface BaseRepostAdapterResponsePayload {
  /**
   * 转发类型
   */
  method: RepostMethod;

  /**
   * 帖子 ID
   */
  postId: string;

  /**
   * 公开时间
   */
  publishAt?: Date;

  /**
   * 作者信息
   */
  author: AuthorPayload;

  /**
   * 进行翻译; DEF: false
   */
  useTranslator?: boolean;

  /**
   * 标题
   */
  title?: string;

  /**
   * 正文
   */
  content: string;

  /**
   * 封面图 URL
   */
  cover?: string;

  /**
   * 覆盖到 Cover 之上的资源（仅 cover 存在时生效）
   */
  overlayCoverBuffer?: Buffer;

  /**
   * 图片组 URLs
   */
  images?: string[];

  /**
   * 徽章列表
   */
  badges?: RepostBadgeParams[][];

  /**
   * 子集, 子集将不出现 Footer 内容
   */
  child?: BaseRepostAdapterResponsePayload;
}

/**
 * 转发请求处理函数。
 * 返回 null 表示 adapter 无法处理（核心会视为异常）。
 */
export type RepostHandler = (
  params: RepostAdapterRequestParams
) => Promise<RepostAdapterResponsePayload | null>;
