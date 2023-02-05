import './App.css';
import {Route,Switch} from "react-router-dom"
import {useEffect} from "react"
import {useDispatch} from "react-redux"
import { GET_TEMPERAMENTS } from './redux/actions';
import Cards from './components/Cards';
import Form from './components/Form';

function pp(){
  return(
    <h1>Hola</h1>
  )
}

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(GET_TEMPERAMENTS())
  },[])

  

  return (
    <div className="App">
      <h1>Henry Dogs</h1>
      <Switch>
        <Route exact path="/" component={pp}/>
        <Route exact path="/home" component={Cards}/>
        <Route exact path="/postDog" component={Form}/>
      </Switch>

    </div>
  );
}

export default App;
