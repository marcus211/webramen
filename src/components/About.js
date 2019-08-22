import React from "react";
import styled from "styled-components";

const BoxBase = styled.div`
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  color: white;
`;
const DivBox = styled.div`
  width:60%;
  height: 400px;
  padding: 10px 10px 10px 10px;
  border-width: 2px;
  border-style: none;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  @media screen and (max-width: 800px) {
    width:90%;
    height: 450px;
  }
`
const DivText = styled.div`
  text-align:left;
  padding:5px 5px 5px 5px;
  display: inline-flex;
`
const ALink = styled.a`
  text-align:left;
`

function About() {
  return (
    <BoxBase>
      <DivBox>
        <h2>關於本站</h2>
        <DivText>
          這是一個查詢拉麵店搜尋網站，以react框架建置成的測試作品，會做這個網站的原因，一開始是看到社團內有強者把全臺灣拉麵店資料統整後放到google mymap服務上，心裡突然冒出一個念頭，若把這些資料結合網站呈現，是不是以後找拉麵店會更方便快速？於是就花了一個月時間建置了這個網站，裡面內容或code寫法醜得要命，請多見諒，未來也會持續不定期進行更新，請大家多多包涵了！
        </DivText><br />
        <DivText>
          【台灣拉麵愛好會專屬】地圖：<ALink href='https://bit.ly/TWRamenClubMAP' target='_blank'>【點我進去】</ALink>
        </DivText><br />
        <DivText>
          【台灣拉麵愛好會專屬】社團：<ALink href='https:facebook.com/groups/RamenTW/about/' target='_blank'>【點我進去】</ALink>
        </DivText>
      </DivBox>
    </BoxBase>
  );
}

export default About;
