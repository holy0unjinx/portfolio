import styled, { keyframes } from "styled-components";

const FlowText = () => {
  return (
    <FlowBox className="display-board">
      <FlowWrap>
        <Flow>
          <span>
            2019 국제로봇컨테스트 미션피지컬컴퓨팅 은상, 2023 국제로봇올림피아드
            Creative Idea 부문 Technical 상, 2023 국제로봇콘테스트 AI Soccer
            부문 장려상, 2023 국제로봇올림피아드 한국대회 드론미로 부문 은상,
            2023 전국 중학생 알고리즘 경진대회 4위, 2024 용인시 학교실험실
            프로젝트 참여, 현암중학교 2025학년도 학생자치회장,
            선린인터넷고등학교 여름방학 특별교육 우수상, 경기도 교육감 표창장
          </span>
          <span>
            2019 국제로봇컨테스트 미션피지컬컴퓨팅 은상, 2023 국제로봇올림피아드
            Creative Idea 부문 Technical 상, 2023 국제로봇콘테스트 AI Soccer
            부문 장려상, 2023 국제로봇올림피아드 한국대회 드론미로 부문 은상,
            2023 전국 중학생 알고리즘 경진대회 4위, 2024 용인시 학교실험실
            프로젝트 참여, 현암중학교 2025학년도 학생자치회장,
            선린인터넷고등학교 여름방학 특별교육 우수상, 경기도 교육감 표창장
          </span>
        </Flow>
      </FlowWrap>
    </FlowBox>
  );
};
export default FlowText;

const flowing = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
`;

const FlowBox = styled.div`
  width: 100%;
  overflow: hidden;
`;

const FlowWrap = styled.div`
  display: flex;
  top: 0;
  left: 0;
  align-items: center;
  width: 100%;
  height: 100%;
  white-space: nowrap;
`;

const Flow = styled.div`
  font-size: 3rem;
  animation: ${flowing} 40s linear infinite;
  span {
    display: inline-block;
    font-weight: 600;
    padding: 0 3rem;
  }
`;
