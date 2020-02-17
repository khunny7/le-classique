import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const ReaderController = (props) => {
  const { rendition } = props;

  return (
    <div className="reader-controller-container">
      <Button
        className="navigation-button prev-button"
        onClick={() => rendition.prev()}
      >
        ‹
      </Button>
      <Button
        className="navigation-button next-button"
        onClick={() => rendition.next()}
      >
        ›
      </Button>
    </div>
  );
};

ReaderController.propTypes = {
  rendition: PropTypes.shape({
    next: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired,
  }).isRequired,
};

export default ReaderController;
