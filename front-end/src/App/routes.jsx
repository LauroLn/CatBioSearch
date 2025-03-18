import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  HomePage,
  Login,
  RelatorioPage,
  AnalisePage,
  CatsPage,
  AcessoPage,
  AnalysisPage,
  Cadastro,
  CriarCliente,
  CriarUsuario,
  AlterarCliente,
  AlterarUsuario,
  LoadingPage,
  Relatorio,
} from "../Pages";


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
