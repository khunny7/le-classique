import md5 from './md5';

const stringToKey = (textString) => {
  const alphaString = textString.toLowerCase().replace(/[^a-z]/gi, '');

  return md5(alphaString);
};

export default stringToKey;
