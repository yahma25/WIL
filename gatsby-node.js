/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');

// 별칭 설정
// Adding a Custom webpack Config - https://www.gatsbyjs.com/docs/how-to/custom-configuration/add-custom-webpack-config/
exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  const output = getConfig().output || {};

  actions.setWebpackConfig({
    output,
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        utils: path.resolve(__dirname, 'src/utils'),
        hooks: path.resolve(__dirname, 'src/hooks'),
      },
    },
  });
};

// 마크다운에 외부 이미지 사용할 수 있도록 설정
// ex) 프로젝트 내에 이미지를 사용하지 않고
//    'https://placekitten.com/800/600' 사용
// 공식문서 https://www.gatsbyjs.com/docs/how-to/images-and-media/preprocessing-external-images/
const {
  createRemoteFileNode,
  createFilePath,
} = require('gatsby-source-filesystem');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      featuredImg: File @link(from: "featuredImg___NODE")
    }
    type Frontmatter {
      title: String!
      featuredImgUrl: String
      featuredImgAlt: String
    }
  `);
};

exports.onCreateNode = async ({
  node,
  actions: { createNode, createNodeField },
  store,
  cache,
  createNodeId,
  getNode,
}) => {
  // For all MarkdownRemark nodes that have a featured image url, call createRemoteFileNode
  if (
    node.internal.type === 'MarkdownRemark' &&
    node.frontmatter.featuredImgUrl !== null
  ) {
    let fileNode = await createRemoteFileNode({
      url: node.frontmatter.featuredImgUrl, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's Redux store
    });
    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      node.featuredImg___NODE = fileNode.id;
    }

    // Generate a Slug each article data
    const slug = createFilePath({ node, getNode });
    createNodeField({ node, name: 'slug', value: slug });
  }
};

/**
 * 동적으로 마크다운 페이지 생성
 * 공식 문서 https://www.gatsbyjs.com/docs/programmatically-create-pages-from-data/
 */
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  // 모든 마크다운 데이터의 slug 필드를 조회
  // 메인 페이지 목록 정렬와 동일하게 날짜, 제목 내림차순
  const queryAllMarkdownData = await graphql(
    `
      {
        allMarkdownRemark(
          sort: {
            order: DESC
            fields: [frontmatter___date, frontmatter___title]
          }
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `,
  );

  if (queryAllMarkdownData.errors) {
    reporter.panicOnBuild(`Error while running query`);
    return;
  }

  const ArticleTemplateComponent = path.resolve(
    __dirname,
    'src/templates/ArticleTemplate.tsx',
  );

  const generateArticlePage = ({
    node: {
      fields: { slug },
    },
  }) => {
    const pageOptions = {
      path: slug,
      component: ArticleTemplateComponent,
      context: { slug },
    };

    createPage(pageOptions);
  };

  queryAllMarkdownData.data.allMarkdownRemark.edges.forEach(
    generateArticlePage,
  );
};
