/**
 * FilePreviewPlugin 系统入口
 * 插件式文件预览组件架构
 */

// 核心组件
export { default as FilePreviewCore } from "./core/FilePreviewCore";
export type {
  FilePreviewCoreProps,
  FilePreviewCoreRef,
} from "./core/FilePreviewCore";

// 插件系统
export { withPlugins, createPluginBus, createPluginManager } from "./plugins";
export type {
  WithPluginsConfig,
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
} from "./plugins";

// 预览插件
export * from "./custom-plugins";
