
import Header from "../components/Header"
import "../styles.css";
import "./ProjectIntro.css";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";

export default function OurWorks() {
    return <div className="artworks-page" id ="our-works-page">
        <Header />
        <div className="project-intro-content">
          <div className="main-title">소녀의 작품 아카이브</div>
          <div className="our-works">
            <div className="work-item">
              <div className="work-title">작품 제목 1</div>
              <div className="work-description">이 작품은 ... 내용을 담고 있습니다.</div>
            </div>
          </div>

    
    
        </div>
        <BackButton />
        <Footer id="project-intro-footer"/>
        </div>
    }