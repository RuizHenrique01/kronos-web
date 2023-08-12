import { encryptValue, decryptValue } from '../utils/crypto';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const persistAtom = (key: string) => ({setSelf, onSet} : {setSelf: (data: any) => any, onSet: (data: any) => any}) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(decryptValue(savedValue)));
    }
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSet((newValue :string, _:any, isReset:boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, encryptValue(JSON.stringify(newValue)));
    });
  };

export default persistAtom;