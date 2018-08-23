import * as React from 'react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import { Link } from 'react-router-dom';

const TasksFallbackContent: React.SFC = () => (
  <div
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <h3>リストがありません</h3>
    <Link to="/tasklists/new">
      <Button primary icon="plus" content="最初のリストを作成する" size="large" />
    </Link>
  </div>
);

export { TasksFallbackContent };
