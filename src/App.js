import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  BookView,
  CreateBusinessView,
  DetailView,
  EditBusinessView,
  EditServiceView,
  HistoryView,
  HomeView,
  LoginView,
  MyBusinessView,
  ProfileView,
  RegisterView,
  FavoriteView,
} from './views';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { UserContext } from './context/UserContext';
import { useContext, useEffect } from 'react';
import { CreateServiceView } from './views/CreateServiceView';
import jwtDecode from 'jwt-decode';
import { SearchProvider } from './context/SearchContext';

function App() {
  const { usuario, setUsuario } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode(token);
      setUsuario(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <SearchProvider>
          <Navigation />
          <div
            style={{
              flex: '1',
            }}
          >
            <Routes>
              {/* >>> Rutas públicas <<< */}
              <Route
                path='/'
                element={<HomeView />}
              />
              <Route
                path='/login'
                element={<LoginView />}
              />
              <Route
                path='/detalles/:id'
                element={<DetailView />}
              />

              <Route
                path='/registrate'
                element={<RegisterView />}
              />
              {/* >>> Rutas protegidas <<< */}
              <Route
                path='/perfil'
                element={usuario ? <ProfileView /> : <LoginView />}
              />
              <Route
                path='/historial'
                element={usuario ? <HistoryView /> : <LoginView />}
              />
              <Route
                path='/mis-peluquerias'
                element={usuario ? <MyBusinessView /> : <LoginView />}
              />
              <Route
                path='/crear-peluqueria'
                element={usuario ? <CreateBusinessView /> : <LoginView />}
              />
              <Route
                path='/editar-peluqueria/:id'
                element={usuario ? <EditBusinessView /> : <LoginView />}
              />
              <Route
                path='/crear-servicio/:id'
                element={usuario ? <CreateServiceView /> : <LoginView />}
              />
              <Route
                path='/editar-servicio/:id'
                element={usuario ? <EditServiceView /> : <LoginView />}
              />
              <Route
                path='/reservar/:id'
                element={usuario ? <BookView /> : <LoginView />}
              />
              <Route
                path='/favoritos'
                element={usuario ? <FavoriteView /> : <LoginView />}
              />
            </Routes>
          </div>
        </SearchProvider>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
