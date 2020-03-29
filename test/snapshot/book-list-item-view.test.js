import React from 'react';
import _ from 'lodash/util';
import renderer from 'react-test-renderer';
import BookListItemView from '../../src/dashboard/book-list-item-view';
import { Book } from '../../src/model/book';

jest.mock('../../src/components/cover-image', () => 'MockedCoverImage');

test('BookListItemView - ', () => {
  const book = new Book('1234', {
    author: 'Younghoon Gim',
    title: 'My story',
    cover: '',
  });
  const component = renderer.create(
    <BookListItemView
      book={book}
      onBookSelected={_.noop}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});