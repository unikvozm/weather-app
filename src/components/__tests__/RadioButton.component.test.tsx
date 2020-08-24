import React from 'react';
import renderer from 'react-test-renderer';
import {RadioButtonComponent} from '../RadioButton.component';

test('RadioButtonComponent renders correctly', () => {
  const tree = renderer
    .create(
      <RadioButtonComponent
        data={[{value: 'value', text: 'text'}]}
        onValueChange={jest.fn}
        initialValue="value"
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
