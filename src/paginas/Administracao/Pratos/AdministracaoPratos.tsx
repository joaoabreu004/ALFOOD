import { useEffect, useState } from "react";
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
import IPrato from "../../../interfaces/IPrato";

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    http.get<IPrato[]>("pratos/").then((resposta) => setPratos(resposta.data));
  }, []);

  const excluir = (pratoASerExcluido: IPrato) => {
    http.delete(`pratos/${pratoASerExcluido.id}/`).then(() => {
      const listaPratos = pratos.filter(
        (prato) => prato.id !== pratoASerExcluido.id
      );
      setPratos([...listaPratos]);
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>NOME</TableCell>
            <TableCell>DESCRIÇÃO</TableCell>
            <TableCell>TAG</TableCell>
            <TableCell>IMAGEM</TableCell>
            <TableCell>EDITAR</TableCell>
            <TableCell>EXCLUIR</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => (
            <TableRow>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.descricao}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell>
                <a href={prato.imagem} target="_blank" rel="noreferrer">VER IMAGEM</a>
              </TableCell>
              <TableCell>
                [<Link to={`/admin/pratos/${prato.id}`}>Editar</Link>]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(prato)}
                >
                  EXCLUIR
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default AdministracaoPratos;
