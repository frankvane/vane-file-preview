/**
 * 插件系统导出
 */

export { createPluginBus } from "./PluginBus";
export { createPluginManager } from "./PluginManager";
export { withPlugins } from "./withPlugins";
export type { WithPluginsConfig } from "./withPlugins";

export type {
  FileInfo,
  PreviewDimensions,
  PreviewProgress,
  PreviewState,
  PreviewStateInfo,
  PluginBus,
  PluginContext,
  PluginHooks,
  FilePreviewPlugin,
  PluginManager,
} from "./types";
