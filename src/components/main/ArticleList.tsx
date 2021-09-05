import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import ArticleItem from 'components/main/ArticleItem';

const ARTICLE_ITEM_DATA = {
  title: 'Article Item Title',
  date: '2021.09.05',
  categories: ['Work', 'Web'],
  summary: '경청 잘하는 사람 되는 방법',
  thumbnail:
    'https://ji5485.github.io/static/e4f34c558ae8e8235ff53b0311085796/4d854/javascript-core-concept-summary-function-1.webp',
  link: '<https://www.google.co.kr/>',
};

const ArticleListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 768px;
  margin: 0 auto;
  padding: 50px 0 100px;
`;

const ArticleList: FunctionComponent = function () {
  return (
    <ArticleListWrapper>
      <ArticleItem {...ARTICLE_ITEM_DATA} />
      <ArticleItem {...ARTICLE_ITEM_DATA} />
      <ArticleItem {...ARTICLE_ITEM_DATA} />
      <ArticleItem {...ARTICLE_ITEM_DATA} />
    </ArticleListWrapper>
  );
};

export default ArticleList;
