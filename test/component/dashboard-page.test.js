import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DashboardPage from '../../src/dashboard/dashboard-page';
import * as LocaleContext from '../../src/context/locale-context';

configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('<DashboardPage />', () => {
  test('DashboardPage - renders without error', () => {
    const localeContextValues = {
      textLoader: (key) => key,
      currentLocale: 'en',
    };

    jest
      .spyOn(LocaleContext, 'useLocaleContext')
      .mockImplementation(() => localeContextValues);

    const dashboardPage = shallow(<DashboardPage />);
  });
});
