import { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

type GatsbyImgProps = {
  image: IGatsbyImageData;
  alt: string;
  className?: string;
};

export interface ArticleHeadProps {
  image: IGatsbyImageData;
}

const ArticleHeadWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
`;

const BackgroundImage = styled((props: GatsbyImgProps) => (
  <GatsbyImage {...props} style={{ position: 'absolute' }} />
))`
  z-index: -1;
  width: 100%;
  height: 400px;
  object-fit: cover;
  filter: brightness(0.25);
`;

const ArticleHead: FunctionComponent<ArticleHeadProps> = function ({
  image,
}: ArticleHeadProps) {
  return (
    <ArticleHeadWrapper>
      <BackgroundImage image={image} alt="Article background image" />
    </ArticleHeadWrapper>
  );
};

export default ArticleHead;
