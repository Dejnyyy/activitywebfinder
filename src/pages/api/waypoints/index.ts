import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { latitude, longitude, text, color } = req.body;

    if (latitude === undefined || longitude === undefined || text === undefined || color === undefined) {
      return res.status(400).json({ error: 'Latitude, longitude, text, and color are required' });
    }

    const waypoint = await prisma.waypoint.create({
      data: { latitude, longitude, text, color },
    });

    res.status(201).json(waypoint);
  } else if (req.method === 'GET') {
    const waypoints = await prisma.waypoint.findMany();
    res.status(200).json(waypoints);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
