import { getSheet } from '../../../lib/googleSheets';

export async function getNewsletterList() {
  const results = await getSheet(`newsletters!A2:A`);

  if (!results.hasOwnProperty('values')) {
    const error = new Error('Not Found');
    error.error = 'Not Found';
    throw error;
  }

  return results.values;
}

export default async function handler(req, res) {
  try {
    let values = await getNewsletterList();
    values = values.map((value) => value[0]);
    res.status(200).json({ statusCode: 200, data: values });
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
