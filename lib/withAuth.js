// /lib/withAuth.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";

const withAuth = (handler) => async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
    return;
  }

  req.session = session;

  return handler(req, res);
};

export default withAuth;
