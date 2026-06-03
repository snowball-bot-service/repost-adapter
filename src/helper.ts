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
}
