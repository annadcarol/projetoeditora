import React, { useState, useEffect } from 'react';
import ArtigoDataService from '../services/artigoDataService';

const AddArtigo = () => {
  const initialArtigoState = {
    id: null,
    titulo: "",
    resumo: "",
    publicado: true,
    idioma: "Português",
    autor: { idAutor: "" }
  };

  const [artigo, setArtigo] = useState(initialArtigoState);
  const [submitted, setSubmitted] = useState(false);
  const [autores, setAutores] = useState([]);
  const [erroMsg, setErroMsg] = useState('');

  useEffect(() => {
    ArtigoDataService.getAutores()
      .then(response => {
        setAutores(response.data);
      })
      .catch(e => {
        console.error("Erro ao carregar lista de autores:", e);
        setErroMsg("Não foi possível carregar a lista de autores. O servidor pode estar indisponível.");
      });
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    if (name === "idAutor") {
      setArtigo({ ...artigo, autor: { idAutor: value } });
    } else {
      setArtigo({ ...artigo, [name]: value });
    }
  };

  const saveArtigo = () => {
    setErroMsg('');

    var data = {
      titulo: artigo.titulo,
      resumo: artigo.resumo,
      publicado: true,
      idioma: artigo.idioma,
      autor: artigo.autor.idAutor ? { idAutor: parseInt(artigo.autor.idAutor) } : null
    };

    ArtigoDataService.create(data)
      .then(response => {
        setArtigo({
          id: response.data.id,
          titulo: response.data.titulo,
          resumo: response.data.resumo,
          publicado: response.data.publicado,
          idioma: response.data.idioma,
          autor: response.data.autor || { idAutor: "" }
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.error("Erro ao cadastrar artigo:", e);
        setErroMsg("Erro ao cadastrar artigo. Verifique a conexão com o servidor.");
      });
  };

  const newArtigo = () => {
    setArtigo(initialArtigoState);
    setSubmitted(false);
    setErroMsg('');
  };

  return (
    <div className="submit-form max-w-lg mx-auto col-md-6">
      {erroMsg && (
        <div className="alert alert-danger alert-dismissible fade show mb-3" role="alert">
          {erroMsg}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setErroMsg('')} 
            aria-label="Close"
          ></button>
        </div>
      )}

      {submitted ? (
        <div className="alert alert-success">
          <h4>Artigo cadastrado com sucesso!</h4>
          <button className="btn btn-success mt-3" onClick={newArtigo}>
            Cadastrar Novo Artigo
          </button>
        </div>
      ) : (
        <div className="card p-4 shadow-sm">
          <h3 className="mb-3">Novo Artigo</h3>
          <div className="form-group mb-3">
            <label htmlFor="titulo"><strong>Título *</strong></label>
            <input
              type="text"
              className="form-control"
              id="titulo"
              required
              value={artigo.titulo}
              onChange={handleInputChange}
              name="titulo"
              placeholder="Digite o título do artigo"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="resumo"><strong>Resumo *</strong></label>
            <textarea
              className="form-control"
              id="resumo"
              required
              rows="4"
              value={artigo.resumo}
              onChange={handleInputChange}
              name="resumo"
              placeholder="Digite o resumo do artigo"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="idAutor"><strong>Autor</strong></label>
            <select
              className="form-control"
              id="idAutor"
              name="idAutor"
              value={artigo.autor.idAutor}
              onChange={handleInputChange}
            >
              <option value="">Selecione um Autor (Opcional)</option>
              {autores.map(a => (
                <option key={a.idAutor} value={a.idAutor}>
                  {a.nome}
                </option>
              ))}
            </select>
          </div>

          <button onClick={saveArtigo} className="btn btn-success w-100">
            Salvar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddArtigo;