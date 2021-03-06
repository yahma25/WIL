import { FunctionComponent } from 'react';
import styled from '@emotion/styled';

interface ArticleContentProps {
  html: string;
}

const MarkdownRenderer = styled.section`
  display: flex;
  flex-direction: column;
  width: 768px;
  margin: 0 auto;
  padding: 100px 0;
  font-size: 16px;
  line-height: 1.8;

  h1 {
    font-size: 32px;
  }

  h2 {
    font-size: 28px;
  }

  h3 {
    font-size: 25px;
  }

  h4 {
    font-size: 22px;
  }

  h2,
  h3,
  h4 {
    margin-top: 20px;
  }

  blockquote {
    margin: 10px 0;
    padding: 5px 15px;
    border-left: 4px solid #e5e5e5;
    color: #858585;
  }

  hr {
    border: 1px solid #000000;
    margin: 100px 0;
  }

  a {
    color: #4263eb;
    text-decoration: underline;
  }

  pre[class*='language-'] {
    margin: 10px 0;
    padding: 15px;
    font-size: 15px;

    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.5);
      border-radius: 3px;
    }
  }

  code[class*='language-'],
  pre[class*='language-'] {
    tab-size: 2;
  }

  code[class='language-text'] {
    color: hsla(0, 0%, 0%, 0.6);
    background-color: #f4f4f4;
    padding: 1px 4px;

    // common css 무효화
    text-shadow: none;
    &:before,
    &:after {
      letter-spacing: 0;
      content: none;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 60px 20px;

    img {
      width: 100%;
    }

    hr {
      margin: 50px 0;
    }
  }
`;

const ArticleContent: FunctionComponent<ArticleContentProps> = function ({
  html,
}) {
  return <MarkdownRenderer dangerouslySetInnerHTML={{ __html: html }} />;
};

export default ArticleContent;
