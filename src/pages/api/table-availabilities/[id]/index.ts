import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { tableAvailabilityValidationSchema } from 'validationSchema/table-availabilities';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.table_availability
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTableAvailabilityById();
    case 'PUT':
      return updateTableAvailabilityById();
    case 'DELETE':
      return deleteTableAvailabilityById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTableAvailabilityById() {
    const data = await prisma.table_availability.findFirst(convertQueryToPrismaUtil(req.query, 'table_availability'));
    return res.status(200).json(data);
  }

  async function updateTableAvailabilityById() {
    await tableAvailabilityValidationSchema.validate(req.body);
    const data = await prisma.table_availability.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteTableAvailabilityById() {
    const data = await prisma.table_availability.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
