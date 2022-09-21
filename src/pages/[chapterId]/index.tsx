import { useRouter } from 'next/router';

const Chapter = () => {
  const route = useRouter();
  console.log(route.query);
  return <div>{`Chapter page `}</div>;
};

export default Chapter;
