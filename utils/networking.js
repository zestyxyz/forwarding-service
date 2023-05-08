import axios from 'axios';
import { formats } from '../utils/formats.js';
//import { v4 as uuidv4 } from 'uuid'

const BEACON_API_BASE = 'https://beacon.zesty.market'
const BEACON_GRAPHQL_URI = 'https://beacon2.zesty.market/zgraphql'

const DB_ENDPOINT = 'https://api.zesty.market/api';
// TODO: Determine best way to enable switching to staging
const STAGING_DB_ENDPOINT = 'https://api-staging.zesty.market/api';

//const sessionId = uuidv4();

const fetchCampaignAd = async (adUnitId, format = 'tall', style = 'standard', url, origin) => {
  try {
    const hostHeader = { Host: origin.split('//')[1], origin }
    const res = await axios.get(`${DB_ENDPOINT}/ad?ad_unit_id=${adUnitId}&url=${url}`, {
      headers: hostHeader
    });
    return res.data;
  } catch (err) {
    console.warn('No active campaign banner could be located. Displaying default banner.')
    return { Ads: [{ asset_url: formats[format].style[style], cta_url: 'https://www.zesty.market' }], CampaignId: 'TestCampaign'};
  }
}

/**
 * Increment the on-load event count for the space
 * @param {string} spaceId The space ID
 * @returns A Promise representing the POST request
 */
const sendOnLoadMetric = async (spaceId, campaignId = null) => {
  try {
    const spaceCounterEndpoint = BEACON_API_BASE + `/api/v1/space/${spaceId}`
    await axios.put(spaceCounterEndpoint)

    await axios.post(
      BEACON_GRAPHQL_URI,
      { query: `mutation { increment(eventType: visits, spaceId: \"${spaceId}\", campaignId: \"${campaignId}\", platform: { name: Unknown, confidence: None }) { message } }` },
      { headers: { 'Content-Type': 'application/json' }}
    )
  } catch (e) {
    console.log("Failed to emit onload event", e.message)
  }
};

const sendOnClickMetric = async (spaceId, campaignId = null) => {
  try {
    const spaceClickEndpoint = BEACON_API_BASE + `/api/v1/space/click/${spaceId}`
    await axios.put(spaceClickEndpoint)

    await axios.post(
      BEACON_GRAPHQL_URI,
      { query: `mutation { increment(eventType: clicks, spaceId: \"${spaceId}\", campaignId: \"${campaignId}\", platform: { name: Unknown, confidence: None }) { message } }` },
      { headers: { 'Content-Type': 'application/json' }}
    )
  } catch (e) {
    console.log("Failed to emit onclick event", e.message)
  }
}

const analyticsSession = async (spaceId, campaignId) => {
  try {
    await axios.post(
      BEACON_GRAPHQL_URI,
      { query: `mutation { increment(eventType: session, spaceId: \"${spaceId}\", campaignId: \"${campaignId}\", platform: { name: Unknown, confidence: None }) { message } }` },
      { headers: { 'Content-Type': 'application/json' }}
    )
  } catch (e) {
    console.log(`Failed to emit session analytics`, e.message)
  }
}

export { fetchCampaignAd, sendOnLoadMetric, sendOnClickMetric, analyticsSession };
