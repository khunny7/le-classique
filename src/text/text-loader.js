import textData from './text-data';

const GetLocaleTextLoader = (locale) => {
  const getString = (key, options) => {
    if (textData.hasOwnProperty(key)) {
      return textData[key][locale];
    } else {
      return key;
    }
  };

  return getString;
}

export default GetLocaleTextLoader;
