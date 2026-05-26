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
}
