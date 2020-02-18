import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const BookReaderSettingsModal = (props) => {
  const { onHide, book } = props;
  const [fontSize, setFontSize] = useState(100);

  const increaseBookFontSize = () => {
    if (fontSize > 500) {
      return;
    }

    setFontSize(fontSize + 20);
    // props.book.rendition.themes.fontSize(`${fontSize}%`);
  };

  const decreaseBookFontSize = () => {
    if (fontSize < 50) {
      return;
    }

    setFontSize(fontSize - 20);
  };

  const onClose = () => {
    book.rendition.themes.fontSize(`${fontSize}%`);

    onHide();
  };

  return (
    <Modal
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      size="lg"
      area-labelledby="book-reader-settings-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Book Reader Setting
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Font Size Setting</h4>
        <div
          className="text-preview-area"
          style={
            {
              fontSize: `${fontSize}%`,
            }
          }
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a odio a felis condimentum consectetur sit amet gravida nisi. Nullam id tincidunt ligula. Etiam non neque dolor. Nulla ac ex ante. Ut purus lectus, dapibus accumsan ornare sed, posuere nec elit. Cras laoreet ligula quis ante pharetra venenatis. Suspendisse et metus non justo laoreet tincidunt.
        </div>
        <Button onClick={() => increaseBookFontSize()}>&#43;</Button>
        <Button onClick={() => decreaseBookFontSize()}>&#8722;</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

BookReaderSettingsModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  book: PropTypes.shape({
    setStyle: PropTypes.func,
  }),
};

BookReaderSettingsModal.defaultProps = {
  book: null,
};

export default BookReaderSettingsModal;
