import Header from "../components/Header";
import "../styles.css";
import "./ProjectIntro.css";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";

export default function ProjectIntro() {
  return <div className="artworks-page" id ="project-intro-page">
    <Header />
    <div className="project-intro-content">
      <div className="main-title">프로젝트 소개</div>
      <div className="quote">
      <div className="caption-ko">
        <span >우리가 잊지 말아야 할 것</span>은 무엇일까? 그리고 그것을 잊지 않기 위해 우리는 <span>노력</span>하고 있는가? 세상에 그것을 <span >표현</span>하고 있는가?
      </div>
      <div className="caption-en">
        What is the thing we must remember? And are we making an effort to hold on to it? Are we finding ways to show it to the world?
      </div>
      </div>

      <div className="intro-content">&nbsp; &nbsp;이미 잘 알고 있다고 생각하는 사실도 되새기지 않는 순간 쉽게 잊히고 망각됩니다. 
  따라서 ‘잊지 말아야 할 것’을 정말로 잊지 않기 위해서는 <span>다시 생각하고, 세상에 표현하고 사람들과 이야기하는 과정</span>이 필요합니다. 
  팀 기록도록은 이 과정을 ‘기록을 재생하는 것’이라고 정의했습니다. <br></br>
  &nbsp; &nbsp;기억을 잊지 않기 위해서는 단순히 어딘가에 ‘기록’하는 것이 아니라, 그것을 꺼내어 다시 생각해보고 살펴보아야 합니다. <span>이에 팀 기록도록은 누구나 쉽게 기억을 나누고 재생해볼 수 있도록, 그 매개체로서 ‘예술’을 활용해보고자 했습니다.</span>
  <br></br> </div>

  <div className="main-title">전시 줄거리</div>
  <div className="intro-content">&nbsp; &nbsp;전시 
    「우리가 잊지 말아야 할 것은 무엇인가요」
    에서는 여러분에게 우리가 잊지 말아야 할 것을 묻습니다. 그리고 그것을  [그림], [시], [공간], [3D 캐릭터]
    와 같은 <span>AI를 활용한 예술 작품</span>으로 표현하여 세상에 알릴 수 있도록 돕습니다. 
    <br></br>
  &nbsp; &nbsp;여러분의 참여로 제작된 작품은 세상 사람들에게 보여집니다. <span>작품의 메시지에 대부분의 사람들은 무관심한 가운데, 단 한 소녀만이 </span>그 메시지에 귀 기울이고 공감하며, 이후 자신의 작품을 관객에게 건네게 됩니다. 
  그 작품은 다름 아닌 <span>일본군 ‘위안부’ 문제를 다룬 것</span>으로, 오늘날에도 여전히 이어지고 있지만, 점점 사람들의 기억과 관심에서 멀어져가는 일본군 '위안부' 증언의 무게를 환기시킵니다.
  끝으로 <span>우리가 잊지 말아야 할 일을 기억하려고 노력</span>하고 있는지, <span>다른 사람들이 말하는 '기억해야 하는 일'에 관심을 가지고 있는지</span> 질문을 던지며 「우리가 잊지 말아야 할 것은 무엇인가요」는 마무리됩니다.


  <br></br>
  &nbsp; &nbsp;체험이 종료된 뒤 모든 결과물은 온라인 아카이브에 기록되어, 시간이 지나도 누구나 다시 찾아보고 이어갈 수 있습니다. 
  </div>


    </div>
    <BackButton />
    <Footer id="project-intro-footer"/>
    

  </div>;
}