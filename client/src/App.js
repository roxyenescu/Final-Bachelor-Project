import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Main from "./pages/Main";
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import LoginRegister from './pages/LoginRegister';
import Profile from './pages/Profile';
import Home from './pages/Home';
import AdoptionForm from './pages/AdoptionForm';
import DonationsCash from './pages/DonationsCash';
import Contact from './pages/Contact';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoImage from './images/logo.png';
import AppointmentsList from './pages/ListAppointments';
import AllAppointments from './pages/AllAppointments';
import ViewForm from './pages/ViewForm';
import SuccessAdoptions from './pages/SuccessAdoptions';
import ViewFormSuccess from './pages/ViewFormSuccess';
import DonationsForm from './pages/DonationsForm';
import ListDonations from './pages/ListDonations';
import Charts from './pages/Charts';
import ChangePsw from './pages/ChangePsw';


function App() {

  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios.get('http://localhost:3003/auth/auth', {
      headers: {
        accessToken: localStorage.getItem('accessToken'),
      }
    }).then((response) => {
      if (response.data.error) {
        setAuthState({ ...authState, status: false });
      } else {
        setAuthState({
          email: response.data.email,
          id: response.data.id,
          status: true,
        });
      }
    });
  }, [authState]);



  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expirationTimestamp");
    setAuthState({
      email: "",
      id: 0,
      status: false,
    });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className='navbar-container'>
            <div className='navbar-left'>
              <img src={logoImage} alt="AnimalsCare" className="navbar-logo" />
            </div>

            <div className='navbar-right'>
              {authState.status ? (
                authState.email === 'roxana23@yahoo.com' ? (
                  <>
                    <Link to="/home" className="navbar-link">Acasă</Link>
                    <Link to="/" className="navbar-link">Anunțuri</Link>
                    <Link to="/allappointments" className="navbar-link">Toate programările</Link>
                    <Link to="/createpost" className="navbar-link">Creează o postare</Link>
                    <NavDropdown
                      id="nav-dropdown-dark-example"
                      title="Profil"
                      menuVariant="dark"
                      className="navbar-link"
                    >
                      <NavDropdown.Item href="/profile/success">Adopții finalizate cu succes</NavDropdown.Item>
                      <NavDropdown.Item href="/profile/statistics">Statistici</NavDropdown.Item>
                      <NavDropdown.Divider />
                      {authState.status && <NavDropdown.Item href="/" onClick={logout}>Deconectare</NavDropdown.Item>}
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <Link to="/contact" className="navbar-link">Contact</Link>
                    <Link to="/home" className="navbar-link">Acasă</Link>
                    <Link to="/" className="navbar-link">Anunțuri</Link>

                    <NavDropdown
                      id="nav-dropdown-dark-example"
                      title="Donații"
                      className="navbar-link"
                      menuVariant="dark"
                    >
                      <NavDropdown.Item href="/donations/cash">Cash</NavDropdown.Item>
                      <NavDropdown.Item href="/donations/toys&food">Jucării/Mâncare</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown
                      id="nav-dropdown-dark-example"
                      title="Profil"
                      className="navbar-link"
                      menuVariant="dark"
                    >
                      <NavDropdown.Item href="/profile/myprofile">Datele mele</NavDropdown.Item>
                      <NavDropdown.Item href="/profile/appoiments">Programări adopție</NavDropdown.Item>
                      <NavDropdown.Item href="/profile/donations">Programări donații</NavDropdown.Item>
                      <NavDropdown.Divider />
                      {authState.status && <NavDropdown.Item href="/" onClick={logout}>Deconectare</NavDropdown.Item>}
                    </NavDropdown>
                  </>
                )
              ) : (
                <>
                  <Link to="/contact" className="navbar-link">Contact</Link>
                  <Link to="/home" className="navbar-link">Acasă</Link>
                  <Link to="/" className="navbar-link">Anunțuri</Link>
                  <Link to="/login" className="navbar-link">Autentificare</Link>
                </>
              )}
            </div>

          </div>

          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/login" exact component={LoginRegister} />
            <Route path="/change-password" exact component={ChangePsw} />
            <Route path="/home" exact component={Home} />
            <Route path="/createpost" exact component={CreatePost} />
            <Route path="/updatepost/:id" exact component={UpdatePost} />
            <Route path="/profile/myprofile" exact component={Profile} />
            <Route path="/adoptionform/:id" exact component={AdoptionForm} />
            <Route path="/viewadoptionform/:id" exact component={ViewForm} />
            <Route path="/donations/cash" exact component={DonationsCash} />
            <Route path="/donations/toys&food" exact component={DonationsForm} />
            <Route path="/profile/donations" exact component={ListDonations} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/profile/appoiments" exact component={AppointmentsList} />
            <Route path="/allappointments" exact component={AllAppointments} />
            <Route path="/profile/success" exact component={SuccessAdoptions} />
            <Route path="/viewformsuccess/:id" exact component={ViewFormSuccess} />
            <Route path="/profile/statistics" exact component={Charts} />
            
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
