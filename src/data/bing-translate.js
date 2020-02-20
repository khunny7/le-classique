const translateText = (textToTranslate) => {
  const data = [{
    text: textToTranslate,
  }];

  const fetchUrl = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=ko';

  return fetch(fetchUrl, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': 'fdfd6c7889374c069ae729ac66be206c',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((transObj) => transObj[0].translations[0].text);
};

export default translateText;
