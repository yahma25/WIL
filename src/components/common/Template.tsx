import { FunctionComponent, ReactNode } from 'react';
import styled from '@emotion/styled';
import GlobalStyle from './GlobalStyle';
import Footer from './Footer';
import { Helmet } from 'react-helmet';

interface TemplateProps {
  title: string;
  description: string;
  url: string;
  image: string;
  children: ReactNode;
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Template: FunctionComponent<TemplateProps> = function ({
  title,
  description,
  url,
  image,
  children,
}: TemplateProps) {
  return (
    <Container>
      <Helmet>
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

        {/* Open Graph data */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={title} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:site" content="@mcmh55" />
        <meta name="twitter:creator" content="@mcmh55" />

        {/* Google Search Console에 사이트 소유자 인증 */}
        <meta
          name="google-site-verification"
          content="J8DdnSmlxekSos6icVzhFH7fmpvNmC08ZA3hzWRNBzg"
        />
        {/* Naver Search Advisor에 사이트 소유자 인증 */}
        <meta
          name="naver-site-verification"
          content="238246b3c2880f4ef63161bf09504768aaaacc0c"
        />

        <html lang="ko" />
      </Helmet>
      <GlobalStyle />
      {children}
      <Footer />
    </Container>
  );
};

export default Template;
