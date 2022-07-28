import { Button } from "@mantine/core";
import { withSessionSsr } from "../../lib/session";
import { Layout } from "../components/Layout/Layout";
import { NotFound } from "../components/StaticPage/NotFound";
import { fullLayout } from "../store/pageConfigSlice";
import { wrapper } from "../store/store";

const IndexPage = ({ session }) => {
  return (
    <div>
      <NotFound />
      {/* <Button onClick={() => console.log('session', session)}>Test</Button> */}
    </div>
  );
};

export const getServerSideProps = withSessionSsr(
  wrapper.getServerSideProps((store) => async ({ req, res }) => {
    store.dispatch(fullLayout());
    return {
      props: { session: req.session },
    };
  })
);

export default IndexPage;
