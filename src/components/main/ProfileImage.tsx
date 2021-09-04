import { FunctionComponent } from 'react';
import styled from '@emotion/styled';

const PROFILE_IMAGE_PATH = '../../image/profile.jpg';

const ProfileImageWrapper = styled.img`
  width: 250px;
  height: 250px;
  margin-bottom: 30px;
  border-radius: 50%;
`;

const ProfileImage: FunctionComponent = function () {
  return <ProfileImageWrapper src={PROFILE_IMAGE_PATH} alt="Profile Image" />;
};

export default ProfileImage;
