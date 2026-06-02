import {SocialProvider} from "./provider";

export abstract class SnowballException extends Error {
  protected constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * 解析链接失败错误
 */
export class ParseLinkFailedException extends SnowballException {
  constructor(
    public readonly userId: string | number,
    public readonly provider: SocialProvider,
    public readonly msg: string,
  ) {
    super(`Parse Link Failed Exception | Provider: ${provider} | UID: ${userId} | Message: ${msg}`);
  }
}

/**
 * 抓取博文失败错误
 */
export class FetchPostFailedException extends SnowballException {
  constructor(
    public readonly userId: string | number,
    public readonly provider: SocialProvider,
    public readonly link: string,
    public readonly reason?: string,
  ) {
    super(`Fetch Post Failed Exception | Provider: ${provider} | UID: ${userId} | Direct: ${link} | Reason: ${reason}`);
  }
}

/**
 * 解析博文失败错误
 */
export class ParsePostFailedException extends SnowballException {
  constructor(
    public readonly userId: string | number,
    public readonly provider: SocialProvider,
    public readonly link: string,
    public readonly reason: string,
  ) {
    super(`Fetch Post Failed Exception | Provider: ${provider} | UID: ${userId} | Direct: ${link} | Reason: ${reason}`);
  }
}

/**
 * 内容未通过安全审查失败错误
 */
export class UnsafeFailedException extends SnowballException {
  constructor(
    public readonly userId: string | number,
    public readonly provider: SocialProvider,
    public readonly link: string,
  ) {
    super(`Fetch Post Failed Exception | Provider: ${provider} | UID: ${userId} | Direct: ${link}`);
  }
}

/**
 * 未找到有效的 URL 错误
 */
export class NoUrlFoundException extends SnowballException {
  constructor(text: string) {
    super(`Repost V2 | No Valid URL | No URL found in text: ${text.slice(0, 50)}...`);
  }
}
