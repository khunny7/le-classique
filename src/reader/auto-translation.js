import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import translateText from '../data/bing-translate';

const AutoTranslation = (props) => {
  const { originalText } = props;
  const [autoTranslatedText, setAutoTranslatedText] = useState('');

  useEffect(
    () => {
      translateText(originalText)
        .then((translated) => {
          setAutoTranslatedText(translated);
        });
    },
    [originalText],
  );

  return (
    <div>
      {
                autoTranslatedText.length > 0
                && autoTranslatedText
            }
    </div>
  );
};

AutoTranslation.propTypes = {
  originalText: PropTypes.string.isRequired,
};

AutoTranslation.defaultProps = {
};

export default AutoTranslation;
