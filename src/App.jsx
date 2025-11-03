import React from "react";
// [1. 수정] v6에 맞는 컴포넌트를 import 합니다.
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ArtworksPage from "./pages/ArtworksPage";
import ProjectIntro from "./pages/ProjectIntro";
import AboutUs from "./pages/AboutUs";
import OurWorks from "./pages/OurWorks";

import "./styles.css"; // 전역 스타일시트 임포트

import ArtworkDetailPage from "./pages/ArtworkDetailPage";


export default function App() {
  return (
    // [3. 수정] 'browserRouter' -> 'BrowserRouter' (대문자 B)
    <BrowserRouter>
      {/* 모든 페이지 이동 시 스크롤을 상단으로 이동시킵니다. */}


      {/* [4. 수정] <Routes>로 모든 <Route>를 감쌉니다. */}
      <Routes>
        {/* [5. 수정] component={} -> element={<... />} 문법으로 변경 */}
        <Route path="/" element={<ArtworksPage />} />
        <Route path="/project" element={<ProjectIntro />} />
        <Route path="/about" element={<AboutUs />} /> {/* [6. 오타 수정] */}
        <Route path="/our-works" element={<OurWorks />} />


        {/* [2. 추가] 작품 상세 페이지를 위한 동적 라우트 */}
        <Route path="/artwork/:id" element={<ArtworkDetailPage />} />
      </Routes>
      
      {/* 참고: 만약 모든 페이지에 공통 Navbar가 필요하다면 
        <Navbar /> 컴포넌트를 이 위치(Routes 밖)에 두면 됩니다.
      */}
      
    </BrowserRouter>
  );
}