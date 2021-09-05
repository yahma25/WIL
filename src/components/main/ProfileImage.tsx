import { FunctionComponent } from 'react';
import styled from '@emotion/styled';

const PROFILE_IMAGE_PATH = '../../images/profile.jpg';

const ProfileImageWrapper = styled.img`
  width: 250px;
  height: 250px;
  margin-bottom: 30px;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const ProfileImage: FunctionComponent = function () {
  return <ProfileImageWrapper src={PROFILE_IMAGE_PATH} alt="Profile Image" />;
};

export default ProfileImage;
