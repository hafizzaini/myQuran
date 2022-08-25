import { wrapper } from '../../store/store';
import { withSessionSsr } from '../../../lib/session';
import { emptyLayout } from '../../store/pageConfigSlice';
import Login from '../../components/@Auth/Login';
import { useEffect } from 'react';
import axios from 'axios';

export default function LoginPage() {
    useEffect(() => {
        (async () => {
            const res = await axios.get(
                'https://staging.quran.com/api/qdc/verses/by_chapter/67?words=true&translation_fields=resource_name%2Clanguage_id&per_page=12&fields=text_uthmani%2Cchapter_id%2Chizb_number%2Ctext_imlaei_simple&translations=85%2C19%2C131&reciter=7&word_translation_language=en&page=1&word_fields=verse_key%2Cverse_id%2Cpage_number%2Clocation%2Ctext_uthmani%2Ccode_v1%2Cqpc_uthmani_hafs&mushaf='
            );

            console.log('res', res.data);
        })();
    }, []);

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
