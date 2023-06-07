import stream from 'stream';
import { promisify } from 'util';
import fetch from 'node-fetch';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

const pipeline = promisify(stream.pipeline);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { file } = req.body;

  const response = await fetch(file);
  if (!response.ok)
    throw new Error(`Unexpected response ${response.statusText}`);

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename=${path.basename(file)}`,
  );
  await pipeline(response.body, res);
};

export default handler;
