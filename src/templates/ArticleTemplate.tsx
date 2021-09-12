import { FunctionComponent } from 'react';
import { graphql } from 'gatsby';
import Template from 'components/common/Template';

interface ArticleTemplateProps {}

const ArticleTemplate: FunctionComponent<ArticleTemplateProps> = function (
  props,
) {
  return <Template>Article Template</Template>;
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
    }
  }
`;
