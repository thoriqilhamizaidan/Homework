import './App.css';
import CreatePlaylist from './Container/CreatePlaylist';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './Container/Auth';
import GuardRoute from './components/GuardRoute';
import NotFound from './Container/NotFound';

function App() {
  return (
    <>
    <Router>
      <Switch>
        <GuardRoute path="/create-playlist" type="private" exact>
          <CreatePlaylist />
        </GuardRoute>
        <GuardRoute path="/" type="guest" exact>
          <Auth />
        </GuardRoute>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
    
    </>
  );
}

export default App;