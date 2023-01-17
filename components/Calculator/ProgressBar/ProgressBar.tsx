import styles from './ProgressBar.module.scss';

interface Props {
  progress: any;
}

export const ProgressBar: React.FC<Props> = ({ progress }) => {
  console.log(progress);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="192"
      height="192"
      className={styles.progressWrapper}
      viewBox="0 0 192 192"
    >
      <circle
        r="89"
        cx="96"
        cy="96"
        strokeDashoffset={560 - (progress / 100) * 560}
        className={styles.progressCircle}
      />

      <path
        fill="url(#a)"
        fillRule="evenodd"
        d="M96 .984c-17.477 0-32.37 3.99-47.498 12.729-45.444 26.232-61.01 84.342-34.77 129.79 17.57 30.459 49.463 47.494 82.268 47.523 32.795-.029 64.688-17.074 82.269-47.523 26.239-45.448 10.664-103.558-34.77-129.79h-.001C128.37 4.973 113.477.983 96 .983zM48.01 12.86C63.288 4.035 78.35 0 96 0c17.65 0 32.712 4.035 47.99 12.861 45.905 26.504 61.641 85.215 35.13 131.134C161.357 174.76 129.133 191.98 96 192.01c-33.142-.03-65.367-17.24-83.12-48.015C-13.63 98.076 2.096 39.365 48.01 12.861z"
        clipRule="evenodd"
      />
      <g className={styles.textWrapper}>
        <text x="75" y="20">
          {Math.round(progress)}%
        </text>
      </g>
      <path
        fill="url(#b)"
        fillRule="evenodd"
        d="M96.001 14.005c-45.28 0-81.986 36.71-81.986 81.995 0 45.284 36.706 81.995 81.986 81.995S177.988 141.284 177.988 96c0-45.284-36.707-81.995-81.987-81.995zM13.031 96c0-45.828 37.147-82.978 82.97-82.978s82.97 37.15 82.97 82.978c0 45.828-37.147 82.978-82.97 82.978S13.031 141.828 13.031 96z"
        clipRule="evenodd"
      />
      <defs>
        <linearGradient
          id="a"
          x1="192"
          x2="0"
          y1="96"
          y2="96"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" stopOpacity="0"></stop>
          <stop offset="0.5" stopColor="#fff"></stop>
          <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
        </linearGradient>
        <linearGradient
          id="b"
          x1="178.971"
          x2="13.031"
          y1="96"
          y2="96"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" stopOpacity="0"></stop>
          <stop offset="0.5" stopColor="#fff"></stop>
          <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ProgressBar;
