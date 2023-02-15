// import { Image } from '@chakra-ui/react';
import { P } from 'components/Typography/P';
import { CSSProperties } from 'react';
import { colors } from 'styles/foundations/colors';
//TODO: To delete

// const ImageIcon: React.FC<{ src: string }> = ({ src }) => (
//   <Image
//     cursor="not-allowed"
//     pointerEvents="none"
//     maxW={12}
//     minW={12}
//     h="auto"
//     pr={2}
//     src={src}
//     alt="item list"
//   />
// );

export const TopicList: React.FC<{
  topics?: string[];
  listIcon?: string | string[];
  ulStyle?: CSSProperties;
  liStyle?: CSSProperties;
  textColor?: string;
}> = ({
  topics,
  listIcon,
  ulStyle = {},
  liStyle = {},
  textColor = colors.text.light,
}) => {
  ulStyle.listStyle = listIcon ? 'none' : 'inside';
  ulStyle.marginTop = !ulStyle.marginTop ? '3em' : ulStyle.marginTop;

  liStyle.display = listIcon ? 'flex' : 'list-item';
  liStyle.marginTop = !liStyle.marginTop ? '3em' : liStyle.marginTop;
  liStyle.alignItems = !liStyle.alignItems ? 'center' : liStyle.alignItems;

  return null;
  // return (
  //   <ul style={ulStyle}>
  //     {topics &&
  //       topics.map((topic, index) => (
  //         <li key={index} style={liStyle}>
  //           {listIcon && (
  //             <>
  //               {Array.isArray(listIcon) ? (
  //                 <ImageIcon src={listIcon[index]} />
  //               ) : (
  //                 <ImageIcon src={listIcon} />
  //               )}
  //             </>
  //           )}
  //           <P color={textColor}>{topic}</P>
  //         </li>
  //       ))}
  //   </ul>
  // );
};
