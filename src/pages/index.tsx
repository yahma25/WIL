import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import GlobalStyle from 'components/common/GlobalStyle';
import Introduction from 'components/main/Introduction';
import Footer from 'components/common/Footer';
import CategoryList from 'components/main/CategoryList';
import ArticleList from 'components/main/ArticleList';

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

const IndexPage: FunctionComponent = function () {
  return (
    <Container>
      <GlobalStyle />
      <Introduction />
      <CategoryList selectedCategory="Work" categoryList={CATEGORY_LIST} />
      <ArticleList />
      <Footer />
    </Container>
  );
};

export default IndexPage;
