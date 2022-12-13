import {
  Box,
  Button,
  TextField,
  Typography,
  AppBar,
  Toolbar,
  Link,
  Container,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioPrato = () => {
  const [nomePrato, setNomePrato] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tag, setTag] = useState("");
  const [restaurante, setRestaurante] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [tags, setTags] = useState<ITag[]>([]);
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  const selecionarArquivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setImagem(e.target.files[0]);
    } else {
      setImagem(null);
    }
  };

  useEffect(() => {
    http.get<{ tags: ITag[] }>("tags/").then((resp) => setTags(resp.data.tags));
    http
      .get<IRestaurante[]>("restaurantes/")
      .then((resp) => setRestaurantes(resp.data));
  }, []);

  const aoSubmeterForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("nome", nomePrato);
    formData.append("descricao", descricao);
    formData.append("tag", tag);
    formData.append("restaurante", restaurante);

    if (imagem) {
      formData.append("imagem", imagem);
    }

    http
      .request({
        url: "pratos/",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
      .then(() => {


        setNomePrato('')
        setDescricao('')
        setTag('')
        setRestaurante('')
        alert("Prato Cadastrado com Sucesso!");
      })
      .catch((erro) => console.log("Deu erro: " + erro));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h6">
        Formulário de Pratos
      </Typography>
      <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
        <TextField
          fullWidth
          value={nomePrato}
          onChange={(e) => setNomePrato(e.target.value)}
          id="standard-basic"
          label="Nome do Prato"
          variant="standard"
          required
          margin="dense"
        />
        <TextField
          fullWidth
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          id="standard-basic"
          label="Descrição do Prato"
          variant="standard"
          required
          margin="dense"
        />

        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select
            labelId="select-tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          >
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.value}>
                {tag.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-restaurante">Restaurante</InputLabel>
          <Select
            labelId="select-restaurante"
            value={restaurante}
            onChange={(e) => setRestaurante(e.target.value)}
          >
            {restaurantes.map((restaurante) => (
              <MenuItem key={restaurante.id} value={restaurante.id}>
                {restaurante.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <input type="file" onChange={selecionarArquivo} />

        <Button
          sx={{ marginTop: 1 }}
          type="submit"
          fullWidth
          variant="outlined"
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
};
export default FormularioPrato;
