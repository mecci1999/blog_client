import { Plugin } from 'vuex';
import { setStroage } from '../utils/localStorage';
import { RootState } from '../store/index';

export const LocalStorageStroePlugin: Plugin<RootState> = (store) => {
  store.subscribe((mutation) => {
    switch (mutation.type) {
      case 'theme/setTheme':
        setStroage('theme', mutation.payload);
        break;
    }
  });
};
