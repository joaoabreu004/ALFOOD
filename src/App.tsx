import { Routes, Route } from "react-router-dom";
import PaginaBaseAdmin from "./paginas/Administracao/PaginaBaseAdmin";
import AdministracaoPratos from "./paginas/Administracao/Pratos/AdministracaoPratos";
import FormularioPrato from "./paginas/Administracao/Pratos/FormularioPrato";
import AdministracaoRestaurantes from "./paginas/Administracao/Restaurantes/AdministracaoRestaurantes";
import FormularioRestaurantes from "./paginas/Administracao/Restaurantes/FormularioRestaurantes";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path="/" element={<PaginaBaseAdmin/>}>
        <Route
          path="/admin/restaurantes"
          element={<AdministracaoRestaurantes />}
        />
        <Route
          path="/admin/restaurantes/novo"
          element={<FormularioRestaurantes />}
        />
        <Route
          path="/admin/restaurantes/:id"
          element={<FormularioRestaurantes />}
        />
        <Route
          path="/admin/pratos"
          element={<AdministracaoPratos/>}
        />
        <Route
          path="/admin/pratos/novo"
          element={<FormularioPrato/>}
        />
      </Route>
    </Routes>
  );
}

export default App;
