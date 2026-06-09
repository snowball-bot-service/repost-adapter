/**
 * 精灵图 -> GIF 请求负载
 */
export interface SpriteToImagesParams {
  /**
   * 横向缩略图数量
    */
  imgLenX: number;
  /**
   * 纵向缩略图数量
   */
  imgLenY: number;
  /**
   * 单张缩略图宽度
   */
  imgSizeX: number;
  /**
   * 单张缩略图高度
   */
  imgSizeY: number;
  /**
   * 最多输出多少帧, 忽略表示全部
   */
  maxFrames?: number;
  /**
   * 视频长度（秒），对于视频长度过段，但帧过多的视频，将只截取存在帧
   */
  duration?: number;
}

/**
 * 精灵图 -> 分割图片返回模式
 */
export type SpriteToImagesReturn = {
  buffer: Buffer[];
  path: string;
}

/**
 * 帧转换 GIF 动图请求体
 */
export interface ConvertFramesToGifParams {
  /**
   * 帧列表
   */
  frames: Buffer[];
  /**
   * 帧数
   */
  frameRate?: number;
}

/**
 * 视频提取图片组请求体
 */
export interface VideoExtractImagesParams {
  /**
   * 原始视频数据
   */
  input: Buffer;
  /**
   * 每秒截取多少张
   */
  framesPerSec: number;
  /**
   * 至多提取多少张
   */
  maxImages: number;
}

/**
 * 从 URL 获取媒体资源
 */
export interface FetchMediaFromUrlParams {
  /**
   * URL
   */
  url: string;
  /**
   * 最大获取秒数; 忽略表示所有视频
   */
  maxSecond?: number;
  /**
   * 输入媒体格式; 默认: mp4
   */
  inputFormat?: string;
  /**
   * 扩展 HTTP Headers
   */
  extendHeaders?: Record<string, string>;
  /**
   * 监听器: 进度
   * @param progress
   */
  onProgress?: (progress: FFMpegProgress) => void;
  /**
   * 获取超时时间（毫秒）
   */
  timeout?: number;
}

/**
 * FFMpeg 进度
 */
export interface FFMpegProgress {
  frames: number;
  currentFps: number;
  currentKbps: number;
  targetSize: number;
  timemark: string;
  percent?: number;
}

/**
 * 核心提供给 adapter 的通用工具方法集。
 */
export interface Helper {
  /**
   * 从对象中按 key 取值，不存在时返回 fallback。
   */
  pick: <K extends string | number, R>(
    record: Record<K, R>,
    key: K,
    fallback?: R
  ) => R;

  /**
   * 格式化数字为人类可读，如 1.2K, 3M, 同时添加前缀 / 尾缀
   * @param num 数字
   */
  extraHumanable: (prefix: string, number: number, suffix: string) => string,

  /**
   * 将秒数转换为可读的时长字符串
   * @param duration 时长（秒）
   * @param forceHours 是否强制显示小时部分（默认 false，仅在 >= 1 小时时显示）
   * @returns 格式化的时长字符串，如 "02:00" 或 "01:23:45"
   */
  humanableDuration: (duration: number, forceHours?: boolean) => string,

  /**
   * 将精灵图按照特定方案切割，返回切割后的图片存储到的临时目录
   * @param mode 存储模式; buffer: 存储到内存; save: 存储到本地
   * @param sprite
   * @param params
   */
  spriteToFrames: <Mode extends keyof SpriteToImagesReturn>(
    mode: Mode, sprite: Buffer, params: SpriteToImagesParams
  ) => Promise<SpriteToImagesReturn[Mode]>,

  /**
   * 将帧图片转换成 GIF
   * @param params
   */
  convertFramesToGIF: (params: ConvertFramesToGifParams) => Promise<Buffer | null>,

  /**
   * 将图片拆解成帧图片
   * @param params
   */
  videoExtractToFrames: (params: VideoExtractImagesParams) => Promise<Buffer[]>,

  /**
   * 下载媒体数据
   * @param params
   */
  fetchMediaFromURL: (params: FetchMediaFromUrlParams) => Promise<Buffer>,
}
