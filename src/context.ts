
import { AuthUser } from "./auth/verifyToken";
import { PostAPI } from "./dataSources/postApi";
import jwt, { JwtPayload } from "jsonwebtoken";



export type DataSourceContext = {
  dataSources: {
    postAPI: PostAPI;
  };
  user?: AuthUser | null;
};