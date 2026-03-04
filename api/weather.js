
export default async function handler(req, res) {
    const { type, query, date } = req.query;
    const API_KEY = '9dce8151db29057351d1ec571dbf5e3c';
    const BASE_URL = 'http://api.weatherstack.com';

    if (!query) {
        return res.status(400).json({ error: { info: 'Query parameter is required' } });
    }

    let endpoint = '/current';
    const params = new URLSearchParams({
        access_key: API_KEY,
        query: query,
    });

    if (type === 'forecast') {
        endpoint = '/forecast';
        params.append('forecast_days', req.query.days || '7');
    } else if (type === 'historical') {
        endpoint = '/historical';
        params.append('historical_date', date);
    } else if (type === 'marine') {
        endpoint = '/marine';
    }

    try {
        const url = `${BASE_URL}${endpoint}?${params.toString()}`;
        const response = await fetch(url);
        const data = await response.json();

        // Always return 200 to the frontend, even if API has internal error
        // so we can handle the structured error object in the frontend
        res.status(200).json(data);
    } catch (error) {
        console.error('Proxy Error:', error);
        res.status(500).json({ error: { info: 'Failed to fetch weather through proxy' } });
    }
}
