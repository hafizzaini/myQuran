import { Button } from '@mantine/core';
import clientPromise from 'lib/mongodb';
import { MongoClient } from 'mongodb';
import { withSessionSsr } from '../../lib/session';
import { Layout } from '../components/Layout/Layout';
import { NotFound } from '../components/StaticPage/NotFound';
import { fullLayout } from '../store/pageConfigSlice';
import { wrapper } from '../store/store';

const IndexPage = ({ session, isConnected }) => {
  console.log(11, isConnected);
  return (
    <div>
      <div>isConnect: {isConnected.toString()}</div>
      <NotFound />
      {/* <Button onClick={() => console.log('session', session)}>Test</Button> */}
    </div>
  );
};

export const getServerSideProps = withSessionSsr(
  wrapper.getServerSideProps((store) => async ({ req, res }) => {
    let isConnected = false;
    // const client = new MongoClient(process.env.MONGODB_URI);
    // await client.connect();

    // const db = await client
    //   .db('test')
    //   .collection('pets')
    //   .find({})
    //   .toArray()
    //   .then((res) => {
    //     isConnected = true;
    //     console.log('res', res);
    //   });
    try {
      // await clientPromise.then(async (res) => {
      //   const a = await res.db('test').collection('pets').find({}).toArray();
      //   console.log('result', a);
      // });

      // await clientPromise.then(async (res) => {
      //   const doc = { name: 'Neapolitan pizza', shape: 'round' };
      //   const a = await res.db('test').collection('pets').insertOne(doc);
      //   console.log('result', a);
      // });

      // `await clientPromise` will use the default database passed in the MONGODB_URI
      // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
      //
      // `const client = await clientPromise`
      // `const db = client.db("myDatabase")`
      //
      // Then you can execute queries against your database like so:
      // db.find({}) or any of the MongoDB Node Driver commands
      isConnected = true;
      console.log((await clientPromise).db);
    } catch (e) {
      console.error(e);
    }

    store.dispatch(fullLayout());
    return {
      props: { session: req.session, isConnected },
    };
  })
);

export default IndexPage;
