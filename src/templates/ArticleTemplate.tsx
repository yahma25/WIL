import { FunctionComponent } from 'react';
import { graphql } from 'gatsby';

interface ArticleTemplateProps {}

const ArticleTemplate: FunctionComponent<ArticleTemplateProps> = function (
  props,
) {
  return <div>Article Template</div>;
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
            date(formatString: "YYYY.MM.DD.")
            categories
            featuredImgUrl
            featuredImgAlt
          }
        }
      }
    }
  }
`;
