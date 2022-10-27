import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyMedicines from './components/pages/MyMedicines';
import SignIn from './components/pages/SignIn';
import ContactUs from './components/pages/ContactUs';
import PageNotFound from './components/pages/404';
import Layout from './components/layouts/Layout';

import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path='/' element={<MyMedicines />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>

  );
}

export default App;
