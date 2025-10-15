/**
 * FilePreviewPlugin 使用示例页
 * 从 components/FilePreviewPlugin/example.tsx 迁移到 pages 目录
 */

import React, { useState, useEffect } from "react";
import {
  FilePreviewCore,
  withPlugins,
  createImagePreviewPlugin,
  createPdfPreviewPlugin,
  createVideoPreviewPlugin,
  createAudioPreviewPlugin,
  createCodePreviewPlugin,
  createMarkdownPreviewPlugin,
  type FileInfo,
} from "../../components/FilePreviewPlugin";

// 创建带插件的文件预览组件（仅挂载推荐的五类预览插件）
const FilePreview = withPlugins(FilePreviewCore, [
  createImagePreviewPlugin(),
  createPdfPreviewPlugin(),
  createVideoPreviewPlugin({ controls: true }),
  createAudioPreviewPlugin({ controls: true }),
  createCodePreviewPlugin({
    theme: "light",
    showLineNumbers: true,
    fontSize: 14,
  }),
  createMarkdownPreviewPlugin({ theme: "light" }),
]);

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
    url: "/src/App.tsx",
  },
];

function BasicPreview({ file }: { file: FileInfo }) {
  const isImage = file.type.startsWith("image/");
  const isPdf = file.type === "application/pdf" || file.extension === ".pdf";
  const isVideo = file.type.startsWith("video/");
  const isAudio = file.type.startsWith("audio/");
  const isText =
    file.type.startsWith("text/") ||
    [".md", ".txt", ".ts", ".tsx", ".js", ".json"].includes(file.extension);

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

  return (
    <div style={{ display: "flex", height: "100vh", gap: 16, padding: 16 }}>
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
        <FilePreview file={selectedFile} />
      </div>
    </div>
  );
}
