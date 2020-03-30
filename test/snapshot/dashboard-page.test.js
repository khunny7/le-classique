import React from 'react';
import renderer from 'react-test-renderer';
import DashboardPage from '../../src/dashboard/dashboard-page';
import * as LocaleContext from '../../src/context/locale-context';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('../../src/context/locale-context', () => ({
  useLocaleContext: () => ({
    textLoader: (key) => key,
    currentLocale: 'en',
  }),
}));

jest.mock('../../src/components/page-header', () => 'MockedPageHeader');

describe('<DashboardPage /> - snapshots', () => {
  test('DashboardPage ', () => {
    const component = renderer.create(
      <DashboardPage />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
