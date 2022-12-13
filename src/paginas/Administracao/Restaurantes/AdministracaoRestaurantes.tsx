import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import {
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Link } from "react-router-dom";
import http from "../../../http";

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    http
      .get<IRestaurante[]>("restaurantes/")
      .then((resposta) => setRestaurantes(resposta.data));
  }, []);


  const excluir = (restauranteASerExcluido: IRestaurante) => {
    http
    .delete(`restaurantes/${restauranteASerExcluido.id}/`)
    .then(() => {
      const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteASerExcluido.id)
      setRestaurantes([...listaRestaurante])
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>NOME</TableCell>
            <TableCell>EDITAR</TableCell>
            <TableCell>EXCLUIR</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => (
            <TableRow>
              <TableCell>{restaurante.nome}</TableCell>
              <TableCell>
                [
                <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>
                ]
              </TableCell>
              <TableCell><Button variant='outlined' color='error' onClick={() => excluir(restaurante)}>EXCLUIR</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default AdministracaoRestaurantes;
