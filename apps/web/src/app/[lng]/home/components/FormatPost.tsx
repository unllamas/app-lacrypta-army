import { useTheme } from 'styled-components';
import { Text } from '@lawallet/ui';

import { PostImage } from '@/components/PostImage';

export default function FormatPost(props) {
  const { content } = props;

  const theme = useTheme();

  function parseContent(inputString) {
    // Expresiones regulares para detectar URLs de webs y de imágenes
    const urlRegex = /https?:\/\/[^\s]+/g;
    const imageRegex = /\.(jpeg|jpg|gif|png|svg)$/i;

    // Encontrar todas las URLs en el string
    const urls = inputString.match(urlRegex) || [];

    let url_website = null;
    let url_image = null;

    // Separar las URLs de web y de imágenes
    urls.forEach((url) => {
      if (imageRegex.test(url)) {
        url_image = url;
      } else {
        url_website = url;
      }
    });

    // Limpiar el input string de estas URLs
    const content = inputString.replace(urlRegex, '').trim();

    return {
      content: content,
      url_website: url_website,
      url_image: url_image,
    };
  }

  return (
    <>
      <Text color={theme.colors.text}>{parseContent(content).content}</Text>
      {parseContent(content).url_image && <PostImage src={parseContent(content).url_image} />}
    </>
  );
}
