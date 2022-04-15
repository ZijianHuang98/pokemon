
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


import React, { useEffect, useState } from 'react'

import superagent from 'superagent'
require('./app.css');
function App() {
  const [id, setId] = useState('25')
  const [pok, setPok] = useState([])

  const getPok = async () => {

    const pokemonRes = await superagent.post(`http://localhost:3001/pokemon`)
      .send(
        {
          "ids": id.split(',')
        }
      )
    const pokemon = pokemonRes.body
    setPok(pokemon)
  }

  useEffect(() => {
    getPok()
  }, [id])
  return (
    <>
      <h3>Please enter the Pokemon Id(seperate by ,)</h3>
      <TextField
          required
          id="outlined-required"
          label="Enter Here"
          defaultValue={id}
          onChange={event => { setId(event.target.value) }}
        />
      <div className='all'>
      
      {pok.map(pokemon => {
        return (<Card sx={{ maxWidth: 550 }}>
          <CardMedia
            component="img"
            height="350"
            image={pokemon.sprites}
            alt="pic"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {pokemon.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {pokemon.type}
            </Typography>
          </CardContent>
        </Card>)
      })}
      </div>
    </>
  );
}

export default App;
