import Head from 'next/head'

interface Props {}

const HeadWrapper: React.FC<Props> = () => {
  return (
    <Head>
      <title>Zumera</title>
      <meta name="description" content="zumera" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HeadWrapper;
