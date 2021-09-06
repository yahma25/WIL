import { FunctionComponent, useMemo } from 'react';
import styled from '@emotion/styled';
import ArticleItem from 'components/main/ArticleItem';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { CategoryType } from '../../model/Category/Types';

export type ArticleType = {
  node: {
    id: string;
    frontmatter: {
      title: string;
      summary: string;
      date: string;
      categories: string[];
      featuredImgUrl: string;
      featuredImgAlt: string;
      gatsbyImageData: IGatsbyImageData;
    };
  };
};

interface ArticleProps {
  selectedCategory: CategoryType;
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

const ArticleList: FunctionComponent<ArticleProps> = function ({
  selectedCategory,
  articles,
}) {
  const articleListData = useMemo(
    () =>
      articles.filter(
        ({
          node: {
            frontmatter: { categories },
          },
        }: ArticleType) =>
          selectedCategory !== 'All'
            ? categories.includes(selectedCategory)
            : true,
      ),
    [selectedCategory],
  );

  return (
    <ArticleListWrapper>
      {articleListData.map(({ node: { id, frontmatter } }: ArticleType) => (
        <ArticleItem
          key={id}
          {...frontmatter}
          link={'<https://www.google.co.kr/>'}
        />
      ))}
    </ArticleListWrapper>
  );
};

export default ArticleList;
