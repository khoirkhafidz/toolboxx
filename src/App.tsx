import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, ToolPage } from '@/pages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tools/:toolId" element={<ToolPage />} />
      </Routes>
    </BrowserRouter>
  );
}
