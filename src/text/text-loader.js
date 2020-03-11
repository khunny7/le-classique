import { has } from 'lodash';
import textData from './text-data';

const GetLocaleTextLoader = (locale) => {
  const getString = (key) => {
    if (has(textData, key)) {
      return textData[key][locale];
    }
    return key;
  };

  return getString;
};

export default GetLocaleTextLoader;
