import { Container, Grid, GridColumn } from 'components/Layout';
import React from 'react';
import ReactPlayer from 'react-player';
import styles from './VideoBlock.module.scss';

const PlayButton = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none">
    <path
      fill="#fff"
      d="M40.97 7.021c-9.357-9.361-24.583-9.361-33.94 0A23.862 23.862 0 0 0 0 24a23.868 23.868 0 0 0 7.03 16.98c4.679 4.68 10.824 7.02 16.97 7.02 6.145 0 12.291-2.34 16.97-7.02 4.533-4.535 7.029-10.566 7.029-16.98a23.86 23.86 0 0 0-7.03-16.978h.002Zm-1.838 32.117c-8.345 8.347-21.92 8.347-30.264 0A21.272 21.272 0 0 1 2.6 24 21.275 21.275 0 0 1 8.868 8.86c4.173-4.173 9.653-6.259 15.133-6.259 5.48 0 10.96 2.087 15.132 6.26A21.281 21.281 0 0 1 45.401 24a21.27 21.27 0 0 1-6.268 15.137h-.001Z"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth="2"
      d="m18.547 15.82 13.09 8.182-13.09 8.182V15.82Z"
    />
  </svg>
);

export const VideoBlock: React.FC<any> = ({ specificContentModule }) => {
  const { videoUrl, thumbnail, caption, videoTitle, duration } =
    specificContentModule;

  return (
    <Container classes={styles.videoBlockWrapper}>
      <div className={styles.innerWrapper}>
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height={538}
          playing
          playIcon={
            <div className={styles.overlay}>
              <div className={styles.overlayInner}>
                <h3 className={styles.title}>Watch: {videoTitle}</h3>
                <div className={styles.durationWrapper}>
                  <span>{duration}</span>
                  <button className={styles.playButton}>
                    <PlayButton />
                  </button>
                </div>
              </div>
            </div>
          }
          light={thumbnail?.asset?.url}
        />
        {caption && (
          <figcaption className={styles.caption}>{caption}</figcaption>
        )}
      </div>
    </Container>
  );
};

export default VideoBlock;
