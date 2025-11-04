export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' });

  try {
    const order = req.body || {};
    if (!order?.profile?.phone || !Array.isArray(order?.items) || !order.items.length) {
      return res.status(400).json({ ok: false, error: 'invalid payload' });
    }
    console.log('NEW ORDER ::', JSON.stringify(order, null, 2));
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('ORDER API ERROR:', e);
    return res.status(500).json({ ok: false, error: 'server error' });
  }
}
