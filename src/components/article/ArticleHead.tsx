import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import ArticleHeadInfo, {
  ArticleHeadInfoProps,
} from 'components/article/ArticleHeadInfo';

type GatsbyImgProps = {
  image: IGatsbyImageData;
  alt: string;
  className?: string;
};

export interface ArticleHeadProps extends ArticleHeadInfoProps {
  image: IGatsbyImageData;
}

const ArticleHeadWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const BackgroundImage = styled((props: GatsbyImgProps) => (
  <GatsbyImage {...props} style={{ position: 'absolute' }} />
))`
  z-index: -1;
  width: 100%;
  height: 400px;
  object-fit: cover;
  filter: brightness(0.25);

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const ArticleHead: FunctionComponent<ArticleHeadProps> = function ({
  title,
  date,
  categories,
  image,
}: ArticleHeadProps) {
  return (
    <ArticleHeadWrapper>
      <BackgroundImage image={image} alt="Article background image" />
      <ArticleHeadInfo title={title} date={date} categories={categories} />
    </ArticleHeadWrapper>
  );
};

export default ArticleHead;
