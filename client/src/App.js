import './App.css';
import {Route,Switch} from "react-router-dom"
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import { getTemperaments } from './redux/actions';
import Cards from './components/Cards';
import begin from './components/begin';
import Form from './components/Form';
import CardDetail from './components/CardDetail';
import NavBar from './components/NavBar';

// import begin from './components/begin';
import LandingPage from './components/LandingPage';
//background: #bba694
function pp(){
  return(
    <h1>Hola</h1>
  )
}

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getTemperaments())
  },[])

  const temperaments = useSelector((state)=>state.temperaments)
  

  return (
    <div className="App">
      
      <NavBar temperaments={temperaments}/>
      <Switch>
        <Route strict exact path="/" component={LandingPage}/> 
        <Route exact path="/home">
              <Cards />
          </Route> 
        <Route exact path="/postDog" component={Form}/>
        <Route exact path="/detail/:id" component={CardDetail}/>
      </Switch>

    </div>
  );
}

export default App;
