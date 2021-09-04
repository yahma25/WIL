import React, { FunctionComponent } from 'react';
import Text from 'components/Text';

const IndexPage: FunctionComponent = function () {
  return (
    <div>
      <Text text="Home" />
      <a href="/info/">To Info</a>
    </div>
  );
};

export default IndexPage;
