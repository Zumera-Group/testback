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
  } = req.body;

  const request =
    variant === 'blog'
      ? {
          firstName: firstName,
          lastName: lastName,
          company: company,
          country: country,
          // email: email,
          // phone: phone,
        }
      : {
          firstName: firstName,
          lastName: lastName,
          company: company,
          country: country,
          email: email,
          // phone: phone,
          // sector: 'sectorName',
        };

  const endPoint =
    variant === 'blog'
      ? 'http://go.zumera.com/l/931863/2023-06-02/36wd1'
      : 'http://go.zumera.com/l/931863/2023-05-16/34ydb';

  console.log(request);

  try {
    const response = await fetch('http://go.zumera.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(request).toString(),
    });
    if (response.ok) {
      res.status(200).json({ message: 'Form submitted successfully' });
      console.log(response);
    } else {
      res.status(500).json({ message: 'Form submission failed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
}
