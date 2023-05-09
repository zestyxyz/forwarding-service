import express from 'express';
import request from 'request';
import cors from 'cors';
import * as networking from './utils/networking.js'

const app = express();
const port = 3000;
app.use(cors())

const imageType = {
  jpg: 'ffd8ffe0',
  png: '89504e47',
  gif: '47494638'
};

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Get image
app.get('/space/:id/image/:format/:style', async function(req, res) {
  let id = req.params.id;

  // validate style
  let formatSet = new Set(['tall', 'wide', 'square']);
  let styleSet = new Set(['standard', 'minimal', 'transparent']);
  let format = req.params.format.toLowerCase();
  let style = req.params.style.toLowerCase();

  if (!formatSet.has(format)) {
    res.status(400);
    res.send("Format not supported. Make sure format is 'tall', 'wide', 'square'.");
  }

  else if (!styleSet.has(style)) {
    res.status(400);
    res.send("Style not supported. Make sure style is 'standard', 'minimal', 'transparent'.");
  }

  else {
    const activeCampaign = await networking.fetchCampaignAd(id, req.params.format, req.params.style, req.query.url, req.headers.origin);
    let image = activeCampaign.Ads[0].asset_url;
    image = image.match(/^.+\.(png|jpe?g)/i) ? image : helpers.parseProtocol(image);
    const campaignId = activeCampaign.CampaignId;

    // If beacons are activated ?beacon=1 send an onload event
    if (parseInt(req.query.beacon) === 1) {
      try {
        await networking.sendOnLoadMetric(id, campaignId);
      } catch (err) {
        console.log(err);
      }
    }

    if (parseInt(req.query.url) === 1) {
      // Send Image URL
      res.send(image);
    }
    else {
      // Send Image Buffer
      request({
        url: image,
        encoding: null
      }, (err, resp, buffer) => {
        if (!err && resp.statusCode === 200) {
          var imageBytes = buffer.toString('hex',0,4);
          if (imageBytes == imageType.jpg) {
            res.set("Content-Type", "image/jpeg");
            res.send(resp.body);
          }
          else if (imageBytes == imageType.png) {
            res.set("Content-Type", "image/png");
            res.send(resp.body);
          }
          else if (imageBytes == imageType.gif) {
            res.set("Content-Type", "image/gif");
            res.send(resp.body);
          }
          else {
            res.status(400);
            res.send("Image file is not supported. Make sure image is either a jpeg, png, or gif");
          }
        } else {
          res.status(500);
          res.send("An error has occurred. Please inform the administrators at https://zesty.market"); 
          console.log(err);
        }
      });
    }
  }
});

// Get CTA
app.get('/space/:id/cta', async function(req, res) {
  const id = req.params.id;
  const activeCampaign = await networking.fetchCampaignAd(id, req.params.format, req.params.style, req.query.url,  req.headers.origin);
  const campaignId = activeCampaign.CampaignId;

  // If beacons are activated ?beacon=1 send an onclick event
  if (parseInt(req.query.beacon) === 1) {
    try {
      await networking.sendOnClickMetric(id, campaignId);
    } catch (err) {
      console.log(err);
    }
  }

  if (activeCampaign.Ads[0].cta_url) {
    res.redirect(activeCampaign.Ads[0].cta_url);
  } else {
    res.redirect(`https://www.zesty.market/`);
  }
});

app.listen(port, () => {
  console.log(`Forwarding service listening at http://localhost:${port}`)
})