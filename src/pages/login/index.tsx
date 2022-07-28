import { wrapper } from '../../store/store';
import { withSessionSsr } from '../../../lib/session';
import { emptyLayout } from '../../store/pageConfigSlice';
import Login from '../../components/@Auth/Login';

export default function LoginPage() {
  return <Login />;
}

export const getServerSideProps = withSessionSsr(
  wrapper.getServerSideProps((store) => async ({ req }) => {
    store.dispatch(emptyLayout());
    req.session.destroy();

    return {
      props: {},
    };
  })
);
