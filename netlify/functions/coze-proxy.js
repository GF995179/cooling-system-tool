exports.handler = async function(event, context) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const targetUrl = 'https://ch8xyc5wpj.coze.site/stream_run';

  try {
    const upstream = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjRmZWVmZDNiLThkZWItNGY0Mi04ZWVjLTE4YjE5ZmQyOWVmMiJ9.eyJpc3MiOiJodHRwczovL2FwaS5jb3plLmNuIiwiYXVkIjpbIlZQUENDdkJMOHRrbURHb1hKb3BTaDJZN0VkQXJTaGdXIl0sImV4cCI6ODIxMDI2Njg3Njc5OSwiaWF0IjoxNzg3ODg3MzAwLCJzdWIiOiJzcGlmZmU6Ly9hcGkuY296ZS5jbi93b3JrbG9hZF9pZGVudGl0eS9pZDo3Njc4NTIyMzI3MzE4OTIxMjQyIiwic3JjIjoiaW5ib3VuZF9hdXRoX2FjY2Vzc190b2tlbl9pZDo3Njc4OTE3NDg2MTQ5ODk0MTgwIn0.h6TpsqXsdadhBRyo5KHSVTxggYR5EojhfqGoWsuNAANjecd9lLEs98xbp__W7ywK4hkFHBZo96_RPt_vTt1fQrzq4i712grtVrHQyLEr3bRSVWSWSNGrrCzafOxPB1Oy1DjXkXA5cbi8FKPBg5w_efcgbpmTKKhDpQFsusBc7OMZps6ML0wm3h4FbY2oIQkSUjd3oewQvy2IF2gdsYHqq-0-kETcc5GSZXDIKQs1dg0p5ep11BrCd4m14fTWbSx5tPtH_Zda9TOkqPD_3Uy4eOBxv66DVzxunPr95pbLn96AwuTfVhfjXu4xECGFDkWZRAotmvr5YCBGqPxXgvIzvw',
      },
      body: event.body,
    });

    const text = await upstream.text();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
      body: text,
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Proxy error: ' + error.message }),
    };
  }
};
