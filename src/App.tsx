import "./App.css";

import { NavLink, Navigate, Route, Routes } from "react-router-dom";

import FilePreviewExample from "./pages/FilePreviewPlugin/Example";

const App: React.FC = () => {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Vane FilePreview 演示</h2>
        <nav className="nav">
          <NavLink to="/" end>
            首页
          </NavLink>

          <h3 style={{ marginTop: 12 }}>文件预览</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <NavLink to="/fp-plugin/example">Example</NavLink>
          </div>
        </nav>
      </aside>
      <main className="main">
        <Routes>
          <Route path="/fp-plugin/example" element={<FilePreviewExample />} />
          <Route
            path="*"
            element={<Navigate to="/fp-plugin/example" replace />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
