import { BrowserRouter, Route } from 'react-router-dom';

import './styles/estilo.css';
import './styles/bootstrap.min.css';

import Home from './pages/home';
import DetalheCampanha from './pages/detalhe-campanha';
import ListaDeCampanhas from './pages/lista-campanhas';
import ListaDeServicos from './pages/lista-servicos';
import ListaQuemSomos from './pages/lista-quemsomos';

function App() {

    return (

    <BrowserRouter >
      <Route exact path="/" component={Home} />
      <Route exact path="/Campanha/:campanhaAtual" component={DetalheCampanha} />
      <Route exact path="/lista-campanhas" component={ListaDeCampanhas} />
      <Route exact path="/lista-servicos" component={ListaDeServicos} />
      <Route exact path="/lista-quemsomos" component={ListaQuemSomos} />
    </BrowserRouter>
    
  );
}

export default App;
