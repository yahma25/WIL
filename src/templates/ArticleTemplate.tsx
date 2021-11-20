import { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import Template from 'components/common/Template';
import ArticleHead from 'components/article/ArticleHead';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import ArticleContent from 'components/article/AticleContent';
import CommentWidget from 'components/article/CommentWidget';

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
            publicURL: string;
            childImageSharp: {
              gatsbyImageData: IGatsbyImageData;
            };
          };
        },
      ];
    };
  };
  location: {
    href: string;
  };
}

const ArticleTemplate: FunctionComponent<ArticleTemplateProps> = function ({
  data: {
    allMarkdownRemark: { edges, nodes },
  },
  location: { href },
}: ArticleTemplateProps) {
  const {
    node: {
      html,
      frontmatter: { title, summary, date, categories },
    },
  } = edges[0];
  const {
    featuredImg: {
      publicURL,
      childImageSharp: { gatsbyImageData },
    },
  } = nodes[0];
  return (
    <Template title={title} description={summary} url={href} image={publicURL}>
      <ArticleHead
        title={title}
        date={date}
        categories={categories}
        image={gatsbyImageData}
      />
      <ArticleContent html={html} />
      <CommentWidget />
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
          publicURL
          childImageSharp {
            gatsbyImageData(
              quality: 100
              placeholder: BLURRED
              formats: [AUTO, WEBP]
              transformOptions: { fit: INSIDE }
              layout: CONSTRAINED
            )
          }
        }
      }
    }
  }
`;
