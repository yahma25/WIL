import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import ArticleItem from 'components/main/ArticleItem';

export type ArticleType = {
  node: {
    id: string;
    frontmatter: {
      title: string;
      summary: string;
      date: string;
      categories: string[];
      thumbnail: string;
    };
  };
};

interface ArticleProps {
  articles: ArticleType[];
}

const ArticleListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 768px;
  margin: 0 auto;
  padding: 50px 0 100px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
    padding: 50px 20px;
  }
`;

const ArticleList: FunctionComponent<ArticleProps> = function ({ articles }) {
  return (
    <ArticleListWrapper>
      {articles.map(
        ({
          node: {
            id,
            frontmatter: { ...rest },
          },
        }) => (
          <ArticleItem
            key={id}
            {...rest}
            link={'<https://www.google.co.kr/>'}
          />
        ),
      )}
    </ArticleListWrapper>
  );
};

export default ArticleList;
