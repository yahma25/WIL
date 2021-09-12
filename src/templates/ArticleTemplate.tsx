import { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import Template from 'components/common/Template';
import ArticleHead from 'components/article/ArticleHead';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import ArticleContent from 'components/article/AticleContent';

interface ArticleTemplateProps {
  data: {
    allMarkdownRemark: {
      edges: [
        {
          node: {
            html: string;
            frontmatter: {
              title: string;
              summary: string;
              date: string;
              categories: string[];
            };
          };
        },
      ];
      nodes: [
        {
          featuredImg: {
            childImageSharp: {
              gatsbyImageData: IGatsbyImageData;
            };
          };
        },
      ];
    };
  };
}

const ArticleTemplate: FunctionComponent<ArticleTemplateProps> = function ({
  data: {
    allMarkdownRemark: { edges, nodes },
  },
}) {
  const {
    node: { html, frontmatter },
  } = edges[0];
  const {
    featuredImg: {
      childImageSharp: { gatsbyImageData },
    },
  } = nodes[0];
  return (
    <Template>
      <ArticleHead image={gatsbyImageData} {...frontmatter} />
      <ArticleContent html={html} />
    </Template>
  );
};

export default ArticleTemplate;

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
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
              formats: [AUTO, WEBP]
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
