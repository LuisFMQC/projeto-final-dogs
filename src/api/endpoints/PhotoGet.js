import React from 'react'
import URL from './URL'

const PhotoGet = () => {

    function handleSubmit(event){
        event.preventDefault();

        fetch(`${URL}/api/photo`)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(json => {
            console.log(json);
            return json;
        });
    }

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" />
        <button>Enviar</button>
    </form>
  )
}

export default PhotoGet