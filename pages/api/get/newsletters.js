import { getSheet } from '../../../lib/googleSheets';

export async function getNewsletterValues(nid) {
  const results = await getSheet(`newsletters!A${nid}:B${nid}`);

  if (!results.hasOwnProperty('values')) {
    const error = new Error('Not Found');
    error.error = 'Not Found';
    throw error;
  }

  return results.values;
}

export default async function handler(req, res) {
  if (!req.query.hasOwnProperty('nid')) {
    res.status(400).json({ statusCode: 400, data: { error: '[nid] missing' } });
    return;
  }

  try {
    const nid = parseInt(req.query.nid) + 1;
    const values = await getNewsletterValues(nid);
    res.status(200).json({ statusCode: 200, data: values[0] });
    return;
  } catch (e) {
    console.log(e.message);
    res.status(500).json({
      statusCode: 500,
      data: e,
    });
    return;
  }
}
