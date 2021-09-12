import { FunctionComponent } from 'react';
import styled from '@emotion/styled';

interface ArticleContentProps {
  html: string;
}

const MarkdownRenderer = styled.div`
  display: flex;
  flex-direction: column;
  width: 768px;
  margin: 0 auto;
  padding: 100px 0;
`;

const ArticleContent: FunctionComponent<ArticleContentProps> = function ({
  html,
}) {
  return <MarkdownRenderer dangerouslySetInnerHTML={{ __html: html }} />;
};

export default ArticleContent;
