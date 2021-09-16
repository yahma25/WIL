import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import GlobalStyle from 'components/common/GlobalStyle';
import Footer from 'components/common/Footer';

const NotFoundPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const NotFoundPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: inherit;
`;

const NotFoundText = styled.div`
  font-size: 150px;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 100px;
  }
`;

const NotFoundDescription = styled.div`
  font-size: 25px;
  text-align: center;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const GoToMainButton = styled(Link)`
  margin-top: 30px;
  font-size: 20px;
  text-decoration: underline;

  &:hover {
    text-decoration: underline;
  }
`;

const NotFoundPage: FunctionComponent = function () {
  return (
    <NotFoundPageContainer>
      <NotFoundPageWrapper>
        <GlobalStyle />
        <NotFoundText>404</NotFoundText>
        <NotFoundDescription>
          페이지를 찾을 수 없었습니다. 😭
          <br />
          주소를 다시 확인해봐주세요. 🙏
        </NotFoundDescription>
        <GoToMainButton to="/">메인으로</GoToMainButton>
      </NotFoundPageWrapper>
      <Footer />
    </NotFoundPageContainer>
  );
};

export default NotFoundPage;
