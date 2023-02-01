import './App.css';
import {Route,Switch} from "react-router-dom"
import Cards from './components/Cards';

function pp(){
  return(
    <h1>Hola</h1>
  )
}

function App() {
  return (
    <div className="App">
      <h1>Henry Dogs</h1>
      <Switch>
        <Route exact path="/" component={pp}/>
        <Route exact path="/home" component={Cards}/>

      </Switch>

    </div>
  );
}

export default App;
