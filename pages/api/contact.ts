import Email from "email-templates";
import type { NextApiRequest, NextApiResponse } from "next";

const user = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
const pass = process.env.NEXT_PUBLIC_CONTACT_PASSWORD;
const host = process.env.NEXT_PUBLIC_CONTACT_HOST;
const port: any = process.env.NEXT_PUBLIC_CONTACT_PORT;

const emailTemp = new Email({
  message: {
    from: user,
  },
  preview: false,
  send: true,
  transport: {
    host,
    port,
    auth: {
      user,
      pass,
    },
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { contactName, contactEmail, contactMessage } = req.body;

  await emailTemp.send({
    template: "contact",
    message: {
      to: user,
      subject: `Message from ${contactName}`,
    },
    locals: {
      contactName,
      contactEmail,
      contactMessage,
    },
  });

  res.status(200).json({ contactName, contactEmail, contactMessage });
}
