import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './Header';
import Body from './Body';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ImagesPage from './ImagesPage';

const store = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path='/images_page' element={<ImagesPage />} />
          <Route path='*' element={<Body />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);