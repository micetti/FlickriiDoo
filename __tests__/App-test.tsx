/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {ImageTile} from '../src/ImageTile';

it('renders correctly', () => {
  renderer.create(
    <ImageTile
      info={{
        id: 'string',
        owner: 'string',
        secret: 'string',
        server: 'string',
        farm: 1,
        title: 'string',
        ispublic: 1,
        isfriend: 1,
        isfamily: 1,
      }}
    />,
  );
});
