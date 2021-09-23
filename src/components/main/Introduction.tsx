import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import ProfileImage from 'components/main/ProfileImage';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

const Background = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #1c1814;
  color: #fff;

  @media (max-width: 420px) {
    background: none;
    height: 220px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  padding: 10px 40px;

  @media (max-width: 420px) {
    width: 100%;
    padding: 30px 24px 0;
  }
`;

const BackgroundImageWrapper = styled.div`
  @media (max-width: 420px) {
    position: absolute;
    z-index: -1;
    height: 220px;
  }
`;

type GatsbyImgProps = {
  image: IGatsbyImageData;
  alt: string;
  className?: string;
};

const BackgroundImage = styled((props: GatsbyImgProps) => (
  <GatsbyImage {...props} />
))`
  filter: brightness(0.4);
`;

const TitleWrapper = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;

const SubTitle = styled.div`
  font-size: 20px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Title = styled.div`
  margin-top: 5px;
  font-size: 30px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

interface IntroductionProps {
  profileImage: IGatsbyImageData;
  backgroundImage: IGatsbyImageData;
}

const Introduction: FunctionComponent<IntroductionProps> = function ({
  profileImage,
  backgroundImage,
}: IntroductionProps) {
  return (
    <Background>
      <Wrapper>
        <ProfileImage profileImage={profileImage} />

        <TitleWrapper>
          <SubTitle>어제 보다 오늘 더 성장 중인</SubTitle>
          <Title>개발자 김명호입니다.</Title>
        </TitleWrapper>
      </Wrapper>
      <BackgroundImageWrapper>
        <BackgroundImage
          image={backgroundImage}
          alt="Article background image"
        />
      </BackgroundImageWrapper>
    </Background>
  );
};

export default Introduction;
