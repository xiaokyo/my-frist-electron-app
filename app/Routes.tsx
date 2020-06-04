import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import { Window, TitleBar, Text } from 'react-desktop/windows';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';

type Props = {
  color: string;
  theme: string;
};

export default function Routes({ color = '#cc7f29', theme = 'light' }: Props) {
  const [isMaximized, setIsMaximized] = useState(false);

  const close = () => ipcRenderer.send('topBar-tools', { type: 'close' });
  const minimize = () => ipcRenderer.send('topBar-tools', { type: 'minimize' });
  const toggleMaximize = () => {
    const maximized = !isMaximized;
    ipcRenderer.send('topBar-tools', { type: 'toggleMaximize' });
    setIsMaximized(maximized);
  };

  return (
    <Window color={color} theme={theme} chrome height="100vh" padding="12px">
      <TitleBar
        title="My Windows Application"
        controls
        isMaximized={isMaximized}
        onCloseClick={close}
        onMinimizeClick={minimize}
        onMaximizeClick={toggleMaximize}
        onRestoreDownClick={toggleMaximize}
      />
      <Text color={theme === 'dark' ? 'white' : '#333'}>Hello World</Text>
      <App>
        <Switch>
          <Route path={routes.COUNTER} component={CounterPage} />
          <Route path={routes.HOME} component={HomePage} />
        </Switch>
      </App>
    </Window>
  );
}
