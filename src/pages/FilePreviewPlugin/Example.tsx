/**
 * FilePreviewPlugin 使用示例页
 * 从 components/FilePreviewPlugin/example.tsx 迁移到 pages 目录
 */

import React, { useState, useEffect, useMemo } from "react";
import {
  FilePreviewCore,
  withPlugins,
  createImagePreviewPlugin,
  createPdfPreviewPlugin,
  createVideoPreviewPlugin,
  createAudioPreviewPlugin,
  createCodePreviewPlugin,
  createMarkdownPreviewPlugin,
  createMammothDocxPlugin,
  createDocxPreviewPlugin,
  createXlsxPreviewPlugin,
  createPptxPreviewPlugin,
  createSimpleReactReaderEpubPlugin,
  createCsvPreviewPlugin,
  createJsonPreviewPlugin,
  createOfficePreviewPlugin,
  createZipPreviewPlugin,
  type FileInfo,
} from "../../components/FilePreviewPlugin";

// 组件内根据偏好动态创建插件列表

// 直接渲染核心组件，暂不挂载插件以确保页面稳定

// 示例文件列表
const exampleFiles: FileInfo[] = [
  {
    name: "vite.svg",
    size: 4 * 1024,
    type: "image/svg+xml",
    extension: ".svg",
    url: "/vite.svg",
  },
  {
    name: "document.pdf",
    size: 524288,
    type: "application/pdf",
    extension: ".pdf",
    url: "/typescript.pdf",
  },
  {
    name: "sample-online.docx",
    size: 100 * 1024,
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    extension: ".docx",
    // 使用在线预览 (OfficePreviewPlugin)
    url: "https://chinavane.netlify.app/test.docx",
    previewMode: "online", // 标记使用在线预览
  },
  {
    name: "sample-mammoth.docx",
    size: 100 * 1024,
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    extension: ".docx",
    // 使用 Mammoth 离线预览
    url: "/test.docx",
    previewMode: "offline", // 标记使用离线预览
    docxMode: "mammoth", // 指定使用 mammoth 模式
  },
  {
    name: "sample-docx-preview.docx",
    size: 100 * 1024,
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    extension: ".docx",
    // 使用 docx-preview 离线预览
    url: "/test.docx",
    previewMode: "offline", // 标记使用离线预览
    docxMode: "docx-preview", // 指定使用 docx-preview 模式
  },
  {
    name: "sample.xlsx",
    size: 200 * 1024,
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    extension: ".xlsx",
    url: "/test.xlsx",
  },
  {
    name: "sample.pptx",
    size: 300 * 1024,
    type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    extension: ".pptx",
    url: "/test.pptx",
  },
  {
    name: "video.mp4",
    size: 10485760,
    type: "video/mp4",
    extension: ".mp4",
    url: "/github-issue.mp4",
  },
  {
    name: "audio.mp3",
    size: 3145728,
    type: "audio/mpeg",
    extension: ".mp3",
    url: "/audio.mp3",
  },
  {
    name: "README.md",
    size: 2048,
    type: "text/markdown",
    extension: ".md",
    url: "/zustand.md",
  },
  {
    name: "code.tsx",
    size: 4096,
    type: "text/typescript",
    extension: ".tsx",
    url: "/code.tsx",
  },
  {
    name: "archive.zip",
    size: 2 * 1024 * 1024,
    type: "application/zip",
    extension: ".zip",
    // Zip 预览为模拟数据，此 URL 仅用于演示
    url: "/1001.zip",
  },
  {
    name: "Alice in Wonderland.epub",
    size: 188879,
    type: "application/epub+zip",
    extension: ".epub",
    url: "/pg.epub",
  },
  {
    name: "sample-data.csv",
    size: 2048,
    type: "text/csv",
    extension: ".csv",
    url: "/sample-data.csv",
  },
  {
    name: "sales-data.tsv",
    size: 1536,
    type: "text/tab-separated-values",
    extension: ".tsv",
    url: "/sales-data.tsv",
  },
  {
    name: "sample-data-semicolon.csv",
    size: 1024,
    type: "text/csv",
    extension: ".csv",
    url: "/sample-data-semicolon.csv",
  },
  {
    name: "sample-data-pipe.csv",
    size: 896,
    type: "text/csv",
    extension: ".csv",
    url: "/sample-data-pipe.csv",
  },
  {
    name: "mixed-data.csv",
    size: 512,
    type: "text/csv",
    extension: ".csv",
    url: "/mixed-data.csv",
  },
  {
    name: "sample-config.json",
    size: 2048,
    type: "application/json",
    extension: ".json",
    url: "/sample-config.json",
  },
];

function BasicPreview({ file }: { file: FileInfo }) {
  const isImage = file.type.startsWith("image/");
  const isPdf = file.type === "application/pdf" || file.extension === ".pdf";
  const isVideo = file.type.startsWith("video/");
  const isAudio = file.type.startsWith("audio/");
  const isText =
    file.type.startsWith("text/") ||
    [".md", ".txt", ".ts", ".tsx", ".js"].includes(file.extension);

  // 仅在文本类型时拉取并显示内容
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let aborted = false;
    if (isText) {
      setLoading(true);
      setError("");
      fetch(file.url)
        .then((res) => res.text())
        .then((t) => {
          if (!aborted) {
            setText(t);
          }
        })
        .catch((e) => {
          if (!aborted) setError(String(e));
        })
        .finally(() => {
          if (!aborted) setLoading(false);
        });
    } else {
      setText("");
      setLoading(false);
      setError("");
    }
    return () => {
      aborted = true;
    };
  }, [file.url, isText]);

  const commonBox: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
  };

  if (isImage) {
    return (
      <div style={commonBox}>
        <img
          src={file.url}
          alt={file.name}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
        />
      </div>
    );
  }

  if (isPdf) {
    return (
      <iframe
        src={file.url}
        title={file.name}
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    );
  }

  if (isVideo) {
    return (
      <video
        src={file.url}
        controls
        style={{ width: "100%", height: "100%", background: "#000" }}
      />
    );
  }

  if (isAudio) {
    return (
      <div style={commonBox}>
        <audio src={file.url} controls style={{ width: "80%" }} />
      </div>
    );
  }

  if (isText) {
    return (
      <div style={{ ...commonBox, justifyContent: "flex-start" }}>
        <pre
          style={{
            margin: 0,
            padding: 16,
            width: "100%",
            height: "100%",
            overflow: "auto",
            background: "#f7f7f7",
            fontSize: 13,
          }}
        >
          {loading ? "Loading..." : error ? `Load failed: ${error}` : text}
        </pre>
      </div>
    );
  }

  return (
    <div style={commonBox}>
      <div style={{ textAlign: "center", color: "#666" }}>
        <div style={{ marginBottom: 8 }}>暂不支持该文件类型的内嵌预览</div>
        <a href={file.url} target="_blank" rel="noreferrer">
          打开原文件
        </a>
      </div>
    </div>
  );
}

export default function FilePreviewExample() {
  const [selectedFile, setSelectedFile] = useState<FileInfo>(exampleFiles[0]);
  // Toggle: true -> use online Office viewer for DOCX; false -> use offline mammoth
  // 默认使用离线预览，避免本地文件无法被在线查看器访问的问题
  const [preferOnlineDocx, setPreferOnlineDocx] = useState<boolean>(false);

  const Preview = useMemo(() => {
    // 根据当前选择的文件决定插件配置
    const isOnlineDocx = selectedFile.previewMode === "online";
    const isOfflineDocx = selectedFile.previewMode === "offline";
    const docxMode = selectedFile.docxMode || "mammoth"; // 默认使用 mammoth

    const plugins = [
      createImagePreviewPlugin(),
      createPdfPreviewPlugin(),
      createVideoPreviewPlugin({ controls: true }),
      createAudioPreviewPlugin({ controls: true }),
      createCodePreviewPlugin({
        showLineNumbers: true,
      }),
      createMarkdownPreviewPlugin(),
      // Offline Office plugins - 根据文件类型启用/禁用
      createMammothDocxPlugin({
        enabled: isOfflineDocx && docxMode === "mammoth",
      }),
      createDocxPreviewPlugin({
        enabled: isOfflineDocx && docxMode === "docx-preview",
      }),
      createXlsxPreviewPlugin(),
      createPptxPreviewPlugin(),
      createSimpleReactReaderEpubPlugin(),
      createCsvPreviewPlugin({
        pageSize: 20,
        maxPreviewRows: 500,
        autoDetectDelimiter: true,
        autoDetectEncoding: true,
      }),
      createJsonPreviewPlugin({
        maxFileSize: 10 * 1024 * 1024, // 10MB
        enableSearch: true,
        enableCopy: true,
        theme: "light",
        collapsed: 2,
      }),
      // Online Office viewer - 根据文件类型启用/禁用
      createOfficePreviewPlugin({
        preferDocxOnline: isOnlineDocx || (!isOfflineDocx && preferOnlineDocx),
        viewer: "google", // 直接使用 Google Docs Viewer，避免 Microsoft 连接问题
      }),
      createZipPreviewPlugin(),
    ];
    return withPlugins(FilePreviewCore, plugins);
  }, [preferOnlineDocx, selectedFile]);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        gap: 16,
        padding: 16,
        boxSizing: "border-box",
      }}
    >
      {/* 文件列表 */}
      <div
        style={{
          width: 280,
          background: "#f5f5f5",
          borderRadius: 8,
          padding: 16,
          overflow: "auto",
        }}
      >
        <h3 style={{ margin: "0 0 16px", fontSize: 16 }}>Files</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {exampleFiles.map((file, index) => (
            <button
              key={index}
              onClick={() => setSelectedFile(file)}
              style={{
                padding: "12px 16px",
                background:
                  selectedFile.name === file.name ? "#2196f3" : "#fff",
                color: selectedFile.name === file.name ? "#fff" : "#333",
                border: "1px solid #ddd",
                borderRadius: 6,
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s",
                fontSize: 14,
              }}
            >
              <div style={{ fontWeight: 500 }}>{file.name}</div>
              <div
                style={{
                  fontSize: 12,
                  marginTop: 4,
                  opacity: 0.8,
                }}
              >
                {file.extension} • {(file.size / 1024).toFixed(0)} KB
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 预览区域 */}
      <div
        style={{
          flex: 1,
          background: "#fff",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* 简易切换控件 - 只在没有明确指定预览模式的 DOCX 文件时显示 */}
        {selectedFile.extension.toLowerCase() === ".docx" &&
          !selectedFile.previewMode && (
            <div style={{ padding: 8, borderBottom: "1px solid #eee" }}>
              <label style={{ fontSize: 12, color: "#555" }}>
                <input
                  type="checkbox"
                  checked={preferOnlineDocx}
                  onChange={(e) => setPreferOnlineDocx(e.target.checked)}
                  style={{ marginRight: 8 }}
                />
                Prefer online viewer for DOCX (Office Online)
              </label>
            </div>
          )}

        {/* 显示当前预览模式信息 */}
        {selectedFile.extension.toLowerCase() === ".docx" &&
          selectedFile.previewMode && (
            <div
              style={{
                padding: 8,
                borderBottom: "1px solid #eee",
                background:
                  selectedFile.previewMode === "online" ? "#e3f2fd" : "#f3e5f5",
                fontSize: 12,
                color: "#555",
              }}
            >
              📄{" "}
              {selectedFile.previewMode === "online"
                ? "在线预览 (Office Online)"
                : `离线预览 (${
                    selectedFile.docxMode === "mammoth"
                      ? "Mammoth"
                      : "docx-preview"
                  })`}
            </div>
          )}
        <Preview file={selectedFile} />
      </div>
    </div>
  );
}
