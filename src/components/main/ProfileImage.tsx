import { FunctionComponent } from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { css } from '@emotion/react';

export interface ProfileImageProps {
  profileImage: IGatsbyImageData;
}

const profileImageCss = css(`
  width: 200px;
  height: 200px;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`);

const ProfileImage: FunctionComponent<ProfileImageProps> = function ({
  profileImage,
}) {
  return (
    <GatsbyImage
      alt="Profile image"
      image={profileImage}
      css={profileImageCss}
    />
  );
};

export default ProfileImage;
