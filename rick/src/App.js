import React from 'react';
import './App.css';

import './lib/api'
import api from './lib/api';

/**
 * En react existen dos tipos de componentes
 * 1.- Componente como clase: puede tener props y estados
 * 
 * 1.1.- Props: 
 * 1.2.- Estado: Es la logica del componentes
 * 
 * 2.- Componente como funcion
 * 
 */

class App extends React.Component 
{
/**
 * Componente como clase
 * El componente como clase necesita el metodo render para poder ejecutarse
 * 
 */
  constructor(props)
  {
    super(props)
    this.state = {
      modalActivo : false,
      characters: [],
      personajeSeleccionado: {}
    }
  }

  activarModal(id)
  {
    api.getCharactersById(id)
        .then(personaje => {
          this.setState({
            modalActivo: true,
            personajeSeleccionado: personaje
          })
        })

    
  }

  desactivarModal()
  {
    this.setState({
      modalActivo: false
    })
  }

  componentDidMount()
  {
    api.getAllCharacters() //Carga de la funcion asincrona
      .then(results => {
        this.setState({
          characters: results
        })
      }) //Funcion que espera la respuesta como promesa
      .catch(e => console.error(e)) //Funcion que captura errores
  }

  renderCards(personaje)
  {
    return (
      <div key={personaje.id} class="card" onClick={e => this.activarModal(personaje.id)}>
              <div class="card-image">
                  <figure>
                    <img alt="Imagen" src={personaje.image} />
                  </figure>
              </div>
              <div class="card-description">
                  <div class="name">
                      <h3>{personaje.name}</h3>
                  </div>
              </div>
      </div>
    )
  }


  render() {
    
    const { modalActivo, characters } = this.state
    const cards = characters.map(element => this.renderCards(element))
    
    return(
      <div class="App">
        <div class="principal">
          <h1>
            Rick and Morty
          </h1>
          <div class="cards-container">
              {cards}
          </div>
          { modalActivo ? (
            <div class="modal" onClick={e => this.desactivarModal()}>
                
                <div class="card-detalle">
                      <div class="card-image">
                          <figure>
                            <img alt="Imagen" src={this.state.personajeSeleccionado.image} />
                          </figure>
                      </div>
                      <div class="card-descripcion">
                          <h3>{this.state.personajeSeleccionado.name}</h3>
                          <div class="caracteristicas">
                              <p>Status</p>
                              <p class="caracteristica-valor">
                              {this.state.personajeSeleccionado.status}
                              </p>
                          </div>
                          <div class="caracteristicas">
                              <p>Especie</p>
                              <p class="caracteristica-valor">
                                {this.state.personajeSeleccionado.species}
                              </p>
                          </div>
                          <div class="caracteristicas">
                              <p>Origen</p>
                              <p class="caracteristica-valor">
                                {this.state.personajeSeleccionado.origin.name}
                              </p>
                          </div>
                          <div class="caracteristicas">
                              <p>Especie</p>
                              <p class="caracteristica-valor">
                                {this.state.personajeSeleccionado.species}
                              </p>
                          </div>
                          <div class="caracteristicas">
                              <p>Genero</p>
                              <p class="caracteristica-valor">
                                {this.state.personajeSeleccionado.gender}
                              </p>
                          </div>
                      </div>
                </div>
                
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}

export default App;
