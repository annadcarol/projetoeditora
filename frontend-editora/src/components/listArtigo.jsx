import React, { useState, useEffect } from 'react';
import ArtigoDataService from '../services/artigoDataService';
import { Link } from 'react-router-dom';

const ListArtigo = () => {
  const [artigos, setArtigos] = useState([]);
  const [currentArtigo, setCurrentArtigo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitulo, setSearchTitulo] = useState('');
  const [erroMsg, setErroMsg] = useState('');

  useEffect(() => {
    retrieveArtigos();
  }, []);

  const onChangeSearchTitulo = e => {
    const searchTitulo = e.target.value;
    setSearchTitulo(searchTitulo);
  };

  const retrieveArtigos = () => {
    setErroMsg('');
    ArtigoDataService.getAll()
      .then(response => {
        setArtigos(response.data);
      })
      .catch(e => {
        console.error("Erro ao carregar artigos:", e);
        setErroMsg("Não foi possível carregar os artigos. O servidor Back-End pode estar off-line.");
      });
  };

  const refreshList = () => {
    retrieveArtigos();
    setCurrentArtigo(null);
    setCurrentIndex(-1);
  };

  const setActiveArtigo = (artigo, index) => {
    setCurrentArtigo(artigo);
    setCurrentIndex(index);
  };

  const removeArtigo = (id) => {
    setErroMsg('');
    ArtigoDataService.delete(id)
      .then(response => {
        refreshList();
      })
      .catch(e => {
        console.error("Erro ao excluir artigo:", e);
        setErroMsg("Erro ao excluir artigo. Verifique a conexão com o servidor.");
      });
  };

  const findByTitulo = () => {
    setErroMsg('');
    ArtigoDataService.findByTitulo(searchTitulo)
      .then(response => {
        setArtigos(response.data);
      })
      .catch(e => {
        console.error("Erro ao pesquisar por título:", e);
        setErroMsg("Erro ao realizar a busca. O servidor pode estar indisponível.");
      });
  };

  return (
    <div className="list row">
      {/* Alerta em vermelho no topo caso ocorra erro de conexão */}
      {erroMsg && (
        <div className="col-md-12">
          <div className="alert alert-danger alert-dismissible fade show mb-3" role="alert">
            {erroMsg}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setErroMsg('')} 
              aria-label="Close"
            ></button>
          </div>
        </div>
      )}

      {/* Barra de Pesquisa */}
      <div className="col-md-8 mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Pesquisar por título"
            value={searchTitulo}
            onChange={onChangeSearchTitulo}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={findByTitulo}
          >
            Pesquisar
          </button>
        </div>
      </div>

      {/* Lista de Artigos */}
      <div className="col-md-6">
        <h4>Lista de Artigos</h4>
        <ul className="list-group">
          {artigos &&
            artigos.map((artigo, index) => (
              <li
                className={"list-group-item " + (index === currentIndex ? "active" : "")}
                onClick={() => setActiveArtigo(artigo, index)}
                key={index}
                style={{ cursor: 'pointer' }}
              >
                {artigo.titulo}
              </li>
            ))}
        </ul>
        {artigos.length === 0 && !erroMsg && (
          <p className="mt-2 text-muted">Nenhum artigo encontrado.</p>
        )}
      </div>

      {/* Detalhes do Artigo Selecionado */}
      <div className="col-md-6">
        {currentArtigo ? (
          <div className="card p-3 shadow-sm">
            <h4>Detalhes do Artigo</h4>
            <div>
              <label><strong>Título:</strong></label> {currentArtigo.titulo}
            </div>
            <div>
              <label><strong>Resumo:</strong></label> {currentArtigo.resumo}
            </div>
            <div>
              <label><strong>Idioma:</strong></label> {currentArtigo.idioma}
            </div>
            <div>
              <label><strong>Autor:</strong></label>{' '}
              {currentArtigo.autor ? currentArtigo.autor.nome : "Não informado"}
            </div>

            <div className="mt-3">
              <Link
                to={"/upd/" + currentArtigo.id}
                className="btn btn-warning me-2"
              >
                Editar
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => removeArtigo(currentArtigo.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Clique em um artigo para ver os detalhes...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListArtigo;