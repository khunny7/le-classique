import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './translation-controller-style.less';

class TranslationController extends React.Component {
  constructor(props) {
    super(props);
    const { rendition } = props;

    this.state = {
      currentElement: null,
    };

    rendition.on('click', (e) => {
      e.stopPropagation();
      e.stopImmediatePropagation();

      const element = e.srcElement;

      const { currentElement } = this.state;

      if (currentElement !== null) {
        currentElement.style.backgroundColor = 'unset';
      }

      if (e.target.tagName.toUpperCase() !== 'P') {
        this.setState({
          currentElement: null,
        });
      } else {
        element.style.backgroundColor = 'tomato';

        this.setState({
          currentElement: element,
        });
      }
    });
  }

  render() {
    const { currentElement } = this.state;

    if (currentElement == null) {
      return (<div />);
    }

    const classNames = ['translation-controller-container'];

    if (currentElement.offsetTop > document.body.offsetHeight / 2) {
      classNames.push('top-place');
    } else {
      classNames.push('bottom-place');
    }

    return (
      <div className={classNames.join(' ')}>
        {currentElement.innerText}
      </div>
    );
  }
}

TranslationController.propTypes = {
  rendition: PropTypes.shape({
    next: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired,
  }).isRequired,
};

export default TranslationController;
