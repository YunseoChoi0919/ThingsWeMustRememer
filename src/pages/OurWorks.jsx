import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";
import "./OurWorks.css";
import kdh from "../assets/kdh.jpg";

const works = [
  {
    id: "space",
    title: "공간",
    subtitle: "우리가 잊지 말아야 할 것",
    tag: "일본군 ‘위안부’ 사건",
    type: "video",
    youtubeId: "vlFOd5cmUGo",
    videoTitle: "우리가 잊지 말아야 할 것 - 김시윤",
    description: `소녀상 옆의 빈 의자는 세상을 떠난 피해자들의 빈 자리이자, 우리가 소녀
옆에서 공감할 수 있는 공간을 의미합니다. 하지만 실제 소녀상 앞에는 현실
세계만이 놓여 있기 때문에, ‘공감’이라는 의도가 직접적으로 와닿지 않습니다.
따라서 작품 안에서는 의자에 앉으면 눈 앞의 공간이 피해자들에게 직접 공감할
수 있는 공간으로 변하도록 하여 소녀상의 의미를 전달하고자 했습니다. 또한
기존에는 의자 하나만 있던 공간에, 소녀상이 함께 보이도록 하여 임팩트 있는
연출을 기획했습니다.`
  },
  {
    id: "testimony",
    title: "은폐된 사실을 \n밝히고자 한 그들",
    subtitle: "우리가 잊지 말아야 할 것",
    tag: "일본군 '위안부' 사건의 증언자의 형상은 꽃이나 나비보다는 견고하고 맑은 무언가와 닮았다는 것.",
    type: "video",
    youtubeId: "XwMplxGAa1Q",
    videoTitle: "우리가 잊지 말아야 할 것 - 최윤서",
    description: `수 많은 전시 성폭력 사건이 수면 위로 올라오게 된 이유는 피해자의 용기있는 증언 때문이다. 기억하기조차 힘든 그날의 사실을 세상에 알리고자 했던 그들의 노력을 떠올리자. 그리고 기억하자.

그들의 증언을 기억하며 똑같은 일이 되풀이되지 않도록 하는 것은 우리의 책임임을 되새기자.

전시 성폭력 사건과 전시 성폭력을 금지하는 국제법의 존재를 알리기 위해 제작하였다.`
  },
  {
    id: "butterfly",
    title: "얽힌 나비",
    subtitle: "우리가 잊지 말아야 할 것",
    tag: "일본군 '위안부' 문제",
    type: "image",
    description: `이 작품은 철사 퍼즐의 형태를 활용하여 제작된 나비 조형물입니다.
나비는 흔히 자유와 가벼움의 상징으로 여겨집니다. 하지만 이 작품에서 나비는 철사에 얽혀 있으며, 그 무게로 인해 날개가 움직이지 않습니다. 관람객은 자연스럽게 이 얽힘을 풀고 싶어 하지만, 퍼즐은 쉽게 풀리지 않습니다.
이 "풀 수 없음"은 단순히 어려움의 문제가 아닙니다. 다루기 어려운 역사적 기억과도 같습니다. 해결해야 하지만 풀리지 않는 이야기들, 드러나야 하지만 쉽게 말할 수 없는 기억들 말입니다. 작가는 퍼즐에 구현된 이러한 얽힘을 활용하여 언어 유희를 통해 모순을 환기하고자 했습니다.`
  }
];

export default function OurWorks() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentWork = works[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + works.length) % works.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % works.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="our-works-page">
      <Header />

      <div className="project-intro-content">
        <div className="main-title">소녀의 작품</div>
        <div className="intro-content">
          일본군 '위안부' 문제를 주제로 각 팀원(최윤서, 김대희, 김시윤)이 생각한 우리가 잊지 말아야 할 사실을
          창작물로 제작하였습니다. 전시 「우리가 잊지 말아야 할 것은 무엇인가요」 속 소녀가 전했던 메세지가 바로
          여기에 아카이브되어 있습니다.
        </div>
      </div>

      <div className="our-works-slider">
        <div className="work-slider-meta">
          <span className="work-slider-label">작품 아카이브</span>
          <span className="work-slider-count">
            {String(currentIndex + 1).padStart(2, "0")} / {String(works.length).padStart(2, "0")}
          </span>
        </div>

        {/* 카드 한 장만 보여주는 영역 */}
        <div className="our-works" key={currentIndex}>
          <div className="work-item">
            <div className="work-header">
              <div className="work-title">{currentWork.title}</div>
              <div className="work-subtitle">{currentWork.subtitle}</div>
              <span>{currentWork.tag}</span>
            </div>

            <div className="work-file">
              {currentWork.type === "video" ? (
                <div className="video-wrapper">
                  <iframe
                    src={`https://www.youtube.com/embed/${currentWork.youtubeId}`}
                    title={currentWork.videoTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                <img src={kdh} width="100%" alt="얽힌 나비 작품" />
              )}
            </div>

            <div className="work-description">{currentWork.description}</div>
          </div>
        </div>

        {/* 슬라이더 하단 컨트롤 */}
        <div className="work-slider-controls">
          <button
            type="button"
            className="work-slider-nav-button"
            onClick={handlePrev}
            aria-label="이전 작품"
          >
            <span className="arrow">←</span>
            <span className="text">이전 작품</span>
          </button>

          <div className="work-slider-dots" aria-label="작품 선택">
            {works.map((work, index) => (
              <button
                key={work.id}
                type="button"
                className={`work-slider-dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
                aria-label={`${index + 1}번째 작품 보기`}
              />
            ))}
          </div>

          <button
            type="button"
            className="work-slider-nav-button"
            onClick={handleNext}
            aria-label="다음 작품"
          >
            <span className="text">다음 작품</span>
            <span className="arrow">→</span>
          </button>
        </div>
      </div>

      <BackButton />
      <Footer id="project-intro-footer" />
    </div>
  );
}
