import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import GlobalStyle from 'components/common/GlobalStyle';
import Introduction from 'components/main/Introduction';
import Footer from 'components/common/Footer';
import CategoryList from 'components/main/CategoryList';
import ArticleList, { ArticleType } from 'components/main/ArticleList';
import { graphql } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';

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

type FeaturedImgType = {
  featuredImg: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
};

interface IndexPageProps {
  data: {
    allMarkdownRemark: {
      edges: ArticleType[];
      nodes: FeaturedImgType[];
    };
  };
}

const IndexPage: FunctionComponent<IndexPageProps> = function ({
  data: {
    allMarkdownRemark: { edges, nodes },
  },
}) {
  return (
    <Container>
      <GlobalStyle />
      <Introduction />
      <CategoryList selectedCategory="Work" categoryList={CATEGORY_LIST} />
      <ArticleList
        articles={edges.map((articleType, idx) => {
          // articles 파라미터로 하나로 사용하기 위해
          // 중간에서 gatsbyImageData 주입.
          articleType.node.frontmatter.gatsbyImageData =
            nodes[idx].featuredImg.childImageSharp.gatsbyImageData;
          return articleType;
        })}
      />
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
            date(formatString: "YYYY.MM.DD")
            categories
            featuredImgUrl
            featuredImgAlt
          }
        }
      }
      nodes {
        featuredImg {
          childImageSharp {
            gatsbyImageData(
              quality: 100
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              transformOptions: { fit: INSIDE }
              layout: CONSTRAINED
              width: 768
              height: 200
            )
          }
        }
      }
    }
  }
`;
