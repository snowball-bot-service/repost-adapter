/**
 * 请求人负载
 */
export interface RequesterPayload {
  /**
   * 用户 QQ 号
   */
  userId: string;
  /**
   * 用户昵称
   */
  nickname: string;
}

/**
 * 转发作者负载
 */
export interface AuthorPayload {
  /**
   * 用户 QQ 号
   */
  userId?: string;
  /**
   * 用户昵称
   */
  nickname: string;
  /**
   * 用户头像 URL
   */
  headshotUrl?: string;
}
