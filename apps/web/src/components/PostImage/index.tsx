import Image from 'next/image';

import { PostImageStyle } from './style';

export const PostImage = (props) => {
  return (
    <PostImageStyle>
      <img {...props} loading="lazy" alt="" />
    </PostImageStyle>
  );
};
