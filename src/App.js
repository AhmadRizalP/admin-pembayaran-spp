import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Siswa from './Pages/Siswa';
import Admin from './Pages/Admin';
import Tagihan from './Pages/Tagihan';
import Pembayaran from './Pages/Pembayaran';
import Login from './Pages/Login';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/siswa" component={Siswa} />
        <Route path="/admin" component={Admin} />
        <Route path="/tagihan" component={Tagihan} />
        <Route path="/pembayaran" component={Pembayaran} />
        <Route path="/login" component={Login} />
      </Switch>
    );
  }
}

export default App;
