import { FunctionComponent } from 'react';
import styled from '@emotion/styled';

const FooterWrapper = styled.div`
  display: grid;
  place-items: center;
  margin-top: auto;
  padding: 50px 0;
  font-size: 15px;
  text-align: center;
  line-height: 1.5;
`;

const Footer: FunctionComponent = function () {
  return (
    <FooterWrapper>
      블로그에 방문해주셔서 감사합니다 🥳
      <br />© 2021 Developer Myoung Ho Kim, Powered By Gatsby.
    </FooterWrapper>
  );
};

export default Footer;
