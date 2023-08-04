import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(500).send({ message: 'Only POST requests allowed' });
    return;
  }

  const {
    firstName,
    lastName,
    phone,
    email,
    country,
    company,
    sectorName,
    variant,
    gclid,
    leadSourceURL,
  } = req.body;

  const coreFields = {
    firstName: firstName,
    lastName: lastName,
    company: company,
    country: country,
    email: email,
    phone: phone,
    leadSourceURL: leadSourceURL,
    gclid: gclid,
  };

  const request =
    variant === 'blog'
      ? {
          firstName: firstName,
          lastName: lastName,
          company: company,
          country: country,
          email: email,
          phone: phone,
          ...coreFields,
        }
      : {
          ...coreFields,
          sector: sectorName,
        };

  const endPoint =
    variant === 'blog'
      ? 'http://go.zumera.com/l/931863/2023-06-02/36wd1'
      : 'http://go.zumera.com/l/931863/2023-05-16/34ydb';

  try {
    const response = await fetch(endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(request).toString(),
    });

    const responseData = await response.text();
    if (
      responseData.includes('required') ||
      responseData.includes('no content')
    ) {
      res
        .status(500)
        .json({ message: 'Form submission failed', response: responseData });
    } else {
      res.status(200).json({ message: 'Success' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
}
