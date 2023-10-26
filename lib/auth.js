import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";

const withAuth = async (req, res, next) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    next();
  } else {
    res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
};

export default withAuth;
