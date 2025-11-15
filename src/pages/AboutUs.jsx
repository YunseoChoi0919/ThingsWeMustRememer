import Header from "../components/Header";
import "../styles.css";

import Footer from "../components/Footer";

import "./AboutUs.css";
import "./ProjectIntro.css";
import ys from "../assets/profiles/ys.jpeg";
import BackButton from "../components/BackButton";

import dh from "../assets/profiles/dh.jpeg";
import sy from "../assets/profiles/sy.jpeg";




export default function AboutUs() {
    return <div className="artworks-page" id="about-us-content">
        <Header />
        <div className="project-intro-content" >
          <div className="main-title">팀 기록도록 </div>

    
          <div className="intro-content">&nbsp; &nbsp; 팀 기록도록은 2025 Art with Impact 프로그램 참여를 위해 모인 팀입니다.
             평소에 모두 서강대학교 순수 미술 동아리인 [강미반] 소속으로 친하게 지내면서 자연스럽게 모이게 되었습니다.
              <span>"너무 복잡하지 않게, 하지만 재밌는 것을 하자"</span>는 것이 저희의 모토입니다. 

      <br></br> </div>
    
      <div className="main-title">팀원 </div>
      <div className="members">

        <div className="member">
          <div className="profile">
            <img src={ys} width="100px"alt="" />
          </div>
          <div className="profile-contents">
            <div className="member-name">최윤서 (Lead)</div>
            <div className="member-intro">아트와 테크의 가운데를 잘 파고들고 싶은 최윤서입니다. 프론트엔드, 유니티, 일러스트 작업, 기계공학 등 잡다한 관심사가 있습니다.

            </div>
            <div className="contact">
              <div className="mail">yschoi0919@gmail.com</div>
              <div className="mail">@yschoi0919</div>

            </div>
          </div>
        </div>



                <div className="member">
          <div className="profile">
            <img src={dh} width="100px"alt="" />
          </div>
          <div className="profile-contents">
            <div className="member-name"> 김대희</div>
            <div className="member-intro">아트&테크놀로지학과 23학번 김대희입니다. 주로 게임 개발과 관련하여 재미를 느끼고 여러 경험을 해보고 있습니다.
            
            </div>
           <div className="contact">
              <div className="mail">kdaehee1021@gmail.com</div>
             

            </div>
          </div>
        </div>




                <div className="member">
          <div className="profile">
            <img src={sy} width="100px"alt="" />
          </div>
          <div className="profile-contents">
            <div className="member-name">김시윤</div>
            <div className="member-intro">
              다양한 경험을 쌓고 있는 김시윤입니다. 전공을 살려 예술과의 경계를 허무는 개발자를 꿈꾸고 있습니다. 프론트/백엔드, 게임, 임베디드 개발 등 가리지 않고 도전 중입니다.
            </div>

                       <div className="contact">
              <div className="mail">tldbs37@gmail.com</div>
              <div className="mail">@nuy.lv_</div>
             
            </div>
            
          </div>
        </div>


     

      </div>


              <div className="main-title">Credit</div>
        <div className="credit-container">
          <span>Creative</span><br></br>
Project Director - 최윤서<br></br>
Concept Development - 김대희, 김시윤, 최윤서<br></br>
Narrative Design & Storyboarding - 최윤서<br></br>
<br></br>

<span>Graphic</span><br></br>
UI Design - 최윤서<br></br>
Scene Design - 김대희, 최윤서<br></br>
Character Design & Animation - 김시윤<br></br>
<br></br>

 <span>Program</span><br></br>
C# Programming - 김대희, 김시윤, 최윤서<br></br>
Database Development - 최윤서<br></br>
AI Prompt Engineering - 김대희, 김시윤, 최윤서<br></br>
Web Development - 최윤서<br></br>
<br></br>


 <span>Sound</span><br></br>
Music Producer- 김대희

        </div>
    
    
        </div>
        <Footer id="project-intro-footer"/>
        <BackButton/>
    
      </div>;
    }