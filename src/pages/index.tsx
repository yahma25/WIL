import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import GlobalStyle from 'components/common/GlobalStyle';
import Introduction from 'components/main/Introduction';
import Footer from 'components/common/Footer';
import CategoryList from 'components/main/CategoryList';
import ArticleList, { ArticleType } from 'components/main/ArticleList';
import { graphql } from 'gatsby';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CATEGORY_LIST = {
  All: 5,
  Work: 2,
  Web: 3,
};

interface IndexPageProps {
  data: {
    allMarkdownRemark: {
      edges: ArticleType[];
    };
  };
}

const IndexPage: FunctionComponent<IndexPageProps> = function ({
  data: {
    allMarkdownRemark: { edges },
  },
}) {
  return (
    <Container>
      <GlobalStyle />
      <Introduction />
      <CategoryList selectedCategory="Work" categoryList={CATEGORY_LIST} />
      <ArticleList articles={edges} />
      <Footer />
    </Container>
  );
};

export default IndexPage;

export const queryArticleList = graphql`
  query queryArticleList {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail
          }
        }
      }
    }
  }
`;
