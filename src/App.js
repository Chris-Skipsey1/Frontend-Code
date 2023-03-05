import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyMedicines from './components/pages/MyMedicines';
import BookAppointment from './components/pages/BookAppointment';
import ListAppointments from './components/pages/ListAppointments';
import UpdateAppointment from './components/pages/UpdateAppointment';
import MyExercises from './components/pages/MyExercises';
import PageNotFound from './components/pages/404';
import Layout from './components/layouts/Layout';

import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path='/' element={<MyMedicines />} />
          <Route path='/bookappointment' element={<BookAppointment />} />
          <Route path='/listappointments' element={<ListAppointments />} />
          <Route path='/updateappointment' element={<UpdateAppointment />} />
          <Route path='/myexercises' element={<MyExercises />} />
          <Route path='*' element={<PageNotFound />} />
            

        </Routes>
      </Layout>
      
    </BrowserRouter>

  );
}

export default App;
