import { FunctionComponent, useMemo } from 'react';
import styled from '@emotion/styled';
import Introduction from 'components/main/Introduction';
import CategoryList, { CategoryListProps } from 'components/main/CategoryList';
import ArticleList, { ArticleType } from 'components/main/ArticleList';
import { graphql } from 'gatsby';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { CategoryType } from '../model/Category/Types';
import queryString, { ParsedQuery } from 'query-string';
import Template from 'components/common/Template';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

type FeaturedImgType = {
  featuredImg: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
};

type ImageFileType = {
  publicURL: string;
  name: string;
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData;
  };
};

interface IndexPageProps {
  location: {
    search: string;
  };
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        siteUrl: string;
      };
    };
    allMarkdownRemark: {
      edges: ArticleType[];
      nodes: FeaturedImgType[];
    };
    allFile: {
      nodes: ImageFileType[];
    };
  };
}

const IndexPage: FunctionComponent<IndexPageProps> = function ({
  location: { search },
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    allMarkdownRemark: { edges, nodes },
    allFile,
  },
}: IndexPageProps) {
  const parsed: ParsedQuery<string> = queryString.parse(search);
  const selectedCategory: CategoryType =
    typeof parsed.category !== 'string' || !parsed.category
      ? 'All'
      : (parsed.category as CategoryType);

  const categoryList = useMemo(
    () =>
      edges.reduce(
        (
          list: CategoryListProps['categoryList'],
          {
            node: {
              frontmatter: { categories },
            },
          }: ArticleType,
        ) => {
          categories.forEach(category => {
            if (list[category] === undefined) list[category] = 1;
            else list[category]++;
          });

          list['All']++;

          return list;
        },
        { All: 0 },
      ),
    [],
  );

  const imgFileList: ImageFileType[] = Array.from(allFile.nodes);

  const profileImage = imgFileList.find(file => file.name === 'profile')
    .childImageSharp.gatsbyImageData;
  const indexPublicURL = imgFileList.find(
    file => file.name === 'profile-ryan',
  ).publicURL;
  const backgroundImage = imgFileList.find(
    file => file.name === 'just-go-when-having-goal',
  ).childImageSharp.gatsbyImageData;

  return (
    <Template
      title={title}
      description={description}
      url={siteUrl}
      image={indexPublicURL}
    >
      <Container>
        <Introduction
          profileImage={profileImage}
          backgroundImage={backgroundImage}
        />
        <CategoryList
          selectedCategory={selectedCategory}
          categoryList={categoryList}
        />
        <ArticleList
          selectedCategory={selectedCategory}
          articles={edges.map((articleType, idx) => {
            // articles 파라미터로 하나로 사용하기 위해
            // 중간에서 gatsbyImageData 주입.
            articleType.node.frontmatter.gatsbyImageData =
              nodes[idx].featuredImg.childImageSharp.gatsbyImageData;
            return articleType;
          })}
        />
      </Container>
    </Template>
  );
};

export default IndexPage;

export const queryArticleList = graphql`
  query queryArticleList {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
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
    allFile(
      filter: {
        name: { in: ["profile", "profile-ryan", "just-go-when-having-goal"] }
      }
    ) {
      nodes {
        name
        publicURL
        childImageSharp {
          gatsbyImageData(
            quality: 100
            placeholder: BLURRED
            formats: [AUTO, WEBP]
            transformOptions: { fit: INSIDE }
            layout: CONSTRAINED
            height: 400
          )
        }
      }
    }
  }
`;
