import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/home/HomePage';
import Login from './Pages/login/LoginPage';
import RelatorioPage from './Pages/relatorios/relatorios';
import AnalisePage from './Pages/analise/analise';
import CatsPage from './Pages/cadastro/cadastro';
import AcessoPage from './Pages/acesso/acesso';
import AnalysisPage from './Pages/analise-id/analise_id';
import Cadastro from './Pages/PassosAnalise/index';
import CriarCliente from './Pages/criarCliente/index';
import CriarUsuario from './Pages/criarUsuario/index';
import AlterarCliente from './Pages/alterarCliente/index';
import AlterarUsuario from './Pages/alterarUsuario/index';
import LoadingPage from './Pages/carregamento/index';
import Relatorio from './Pages/relatorio/analise';


const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
  {/* <Route path="/home" element={<HomePage />} */} {/* Added "/home" route */}
      <Route path="/login" element={<Login />} />
      <Route path="/analise" element={<AnalisePage />} />
      <Route path="/relatorio" element={<RelatorioPage />} />
      <Route path="/cadastro" element={<CatsPage />} />   
      <Route path="/acesso" element={<AcessoPage />} /> {/* Added AcessoPage route */}
      <Route path="/analise/:id" element={<AnalysisPage />} />
      <Route path="/clientes" element={<clientesCadastrados />} />
      <Route path="/passosAnalise/*" element={<Cadastro />} />
      <Route path="/criarcliente" element={<CriarCliente />} />
      <Route path="/criarusuario" element={<CriarUsuario />} />
      <Route path="/alterarcliente/:id" element={<AlterarCliente />} />
      <Route path="/alterarusuario/:id" element={<AlterarUsuario />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/relatorios" element={<Relatorio />} />
      </Routes>
  </Router>
);

export default AppRoutes;
