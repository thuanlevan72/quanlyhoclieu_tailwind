import React, { lazy } from 'react';
import { Provider, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import store from './redux/store';
import Admin from './routes/admin';
import Auth from './routes/auth';
import './static/css/style.css';
import config from './config/config';
import ProtectedRoute from './components/utilities/protectedRoute';
import 'antd/dist/antd.less';
import Students from './routes/student';
import Tutor from './routes/tutor';

const NotFound = lazy(() => import('./container/pages/404'));

const { theme } = config;
function RouterAuthorization() {
  const { decentralization } = useSelector((state) => {
    return {
      decentralization: state.auth.decentralization,
    };
  });
  console.log(decentralization);
  return (
    <>
      {decentralization === 'admin' && (
        <Routes>
          <Route path="/admin/*" element={<ProtectedRoute path="/*" Component={Admin} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
      {decentralization === 'student' && (
        <Routes>
          <Route path="/student/*" element={<ProtectedRoute path="/*" Component={Students} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
      {decentralization === 'tutor' && (
        <Routes>
          <Route path="/tutor/*" element={<ProtectedRoute path="/*" Component={Tutor} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
      {!decentralization && (
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}

      {/* <Routes>
        <Route path="/admin/*" element={<ProtectedRoute path="/*" Component={Admin} />} />
        <Route path="*" element={<NotFound />} />
      </Routes> */}
    </>
  );
}
function ProviderConfig() {
  const { rtl, isLoggedIn, topMenu, mainContent } = useSelector((state) => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      mainContent: state.ChangeLayoutMode.mode,
      isLoggedIn: state.auth.login,
      // decentralization: state.auth.decentralization,
    };
  });
  // const [path, setPath] = useState(window.location.pathname);
  // useEffect(() => {
  //   // let unmounted = false;
  //   // if (!unmounted) {
  //   //   setPath(window.location.pathname);
  //   // }
  //   // // eslint-disable-next-line no-return-assign
  //   // return () => (unmounted = true);
  // }, [setPath]);
  return (
    <ConfigProvider direction={rtl ? 'rtl' : 'ltr'}>
      <ThemeProvider theme={{ ...theme, rtl, topMenu, mainContent }}>
        <Router basename={process.env.PUBLIC_URL}>
          {!isLoggedIn ? (
            <Routes>
              <Route path="/*" element={<Auth />} />{' '}
            </Routes>
          ) : (
            <RouterAuthorization />
          )}
          {/* {!isLoggedIn && (path === process.env.PUBLIC_URL || path === `${process.env.PUBLIC_URL}/`) && (
            <Routes>
              <Route path="/" element={<Navigate to="/admin" />} />
            </Routes>
          )} */}
        </Router>
      </ThemeProvider>
    </ConfigProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ProviderConfig />
    </Provider>
  );
}

export default App;
