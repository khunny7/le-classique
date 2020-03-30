import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GetLocaleTextLoader from '../text/text-loader';

const LocaleContext = React.createContext({
  currentLocale: 'en',
});

const LocaleContextProvider = (props) => {
  const { children } = props;
  const [currentLocale, setCurrentLocale] = useState('en');

  return (
    <LocaleContext.Provider value={
      {
        textLoader: GetLocaleTextLoader(currentLocale),
        setCurrentLocale: (locale) => setCurrentLocale(locale),
        currentLocale,
      }
    }
    >
      {children}
    </LocaleContext.Provider>
  );
};

const withLocaleContext = (Component) => (
  (props) => (
    <LocaleContext.Consumer>
      {(context) => <Component localeContext={context} {...props} />}
    </LocaleContext.Consumer>
  )
);

const useLocaleContext = () => useContext(LocaleContext);

LocaleContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export {
  LocaleContext, LocaleContextProvider, withLocaleContext, useLocaleContext,
};
