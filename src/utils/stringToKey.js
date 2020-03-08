import md5 from './md5';

const stringToKey = (textString) => {
  const alphaString = textString.replace(/[^a-z]/gi, '');

  return md5(alphaString);
};

export default stringToKey;
