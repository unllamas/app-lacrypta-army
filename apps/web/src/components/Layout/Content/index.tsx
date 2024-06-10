import { Divider } from '@lawallet/ui';

import { ContentStyle } from './style';

export default function Content(props) {
  const { children } = props;

  return (
    <ContentStyle>
      {children}
      <Divider y={16} />
    </ContentStyle>
  );
}
