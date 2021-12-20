const express = require('express')
const axios = require('axios');
const networking = require('./utils/networking.js');
const helpers = require('./utils/helpers.js');


const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/:network/space/:id/image/:format/:style', async function(req, res) {
  const activeNFT = await networking.fetchNFT(req.params.id, req.params.network);
  let chainId;
  if (req.params.network == "polygon") {
    chainId = 137;
  } else if (req.params.network == "matic") {
    chainId = 137
  } else if (req.params.network == "rinkeby") {
    chainId = 4;
  } else {
    res.status(400);
    res.send("Chain not supported");
  }
  const activeBanner = await networking.fetchActiveBanner(activeNFT.uri, req.params.format, req.params.style);
  console.log(activeBanner);
  let image = activeBanner.data.image;
  image = image.match(/^.+\.(png|jpe?g)/i) ? image : helpers.parseProtocol(image);

  res.send(image);
});

app.get('/:network/space/:id/cta', async function(req, res) {
  const activeNFT = await networking.fetchNFT(req.params.id, req.params.network);
  let chainId;
  if (req.params.network == "polygon") {
    chainId = 137;
  } else if (req.params.network == "matic") {
    chainId = 137
  } else if (req.params.network == "rinkeby") {
    chainId = 4;
  } else {
    res.status(400);
    res.send("Chain not supported");
  }

  if (activeNFT.uri) {
    bannerObject = await networking.fetchActiveBanner(activeNFT.uri);
    res.send(bannerObject.data.url);
  } else {
    res.send(`https://zesty.market/space/${req.params.id}?chainId=${chainId}`);
  }
});

app.listen(port, () => {
  console.log(`Forwarding service listening at http://localhost:${port}`)
})