
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import React, { useEffect, useState } from 'react'

import superagent from 'superagent'

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
    < >
      <h1>Please enter the Pokemon Id(seperate by ,)</h1>
      <input type="text" value={id} onChange={event => { setId(event.target.value) }} />
      {pok.map(pokemon => {
        return (<Card sx={{ maxWidth: 450 }}>
          <CardMedia
            component="img"
            height="200"
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
    </>
  );
}

export default App;
