import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTypedSelector } from '.';
import { useDispatch } from 'react-redux';

  import { ActionTypes } from '../state/UI/ui.action-types';

export const useAuth = () => {
  const { data, loading } = useTypedSelector(state => state.user);
  const router = useRouter();
  const dispath = useDispatch()
  console.log('que pasa aca', data, loading)

  useEffect(() => {
    if (!data) {
      dispath({type: ActionTypes.OPEN_LOGIN})
    } else {
      dispath({type: ActionTypes.CLOSE_LOGIN})

    }
  }, [router, data]);

  return data;
};
