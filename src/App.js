import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyMedicines from './components/pages/MyMedicines';
import Info from './components/pages/Info';
import BookAppointment from './components/pages/BookAppointment';
import ListAppointments from './components/pages/ListAppointments';
import UpdateAppointment from './components/pages/UpdateAppointment';
import MyExercises from './components/pages/MyExercises';
import Client from './components/pages/Client';
import FavoriteExercisesPage from './components/pages/favoriteexercises';
import FavoriteMedicinePage from './components/pages/favouritemedicines';
import PageNotFound from './components/pages/404';
import Layout from './components/layouts/Layout';

import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path='/mymedicines' element={<MyMedicines />} />
          <Route path='/info' element={<Info />} />
          <Route path='/bookappointment' element={<BookAppointment />} />
          <Route path='/listappointments' element={<ListAppointments />} />
          <Route path='/updateappointment' element={<UpdateAppointment />} />
          <Route path='/myexercises' element={<MyExercises />} />
          <Route path='/clients' element={<Client />} />
          <Route path='/favoriteexercises' element={<FavoriteExercisesPage />} />
          <Route path='/favoritemedicines' element={<FavoriteMedicinePage />} />
          <Route path='*' element={<PageNotFound />} />
            

        </Routes>
      </Layout>
      
    </BrowserRouter>

  );
}

export default App;
