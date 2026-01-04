

// import express, { type Application, type Request, type Response } from "express";
// import { ApolloServer } from "@apollo/server";
// import { expressMiddleware } from "@as-integrations/express5";
// import gql from "graphql-tag";
// import { readFileSync } from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// import {resolvers} from "./resolver/resolver"


// import { DataSourceContext } from "./context";
// import { PostAPI } from "./dataSources/postApi";
// import { AuthUser, verifyToken } from "./auth/verifyToken";
// import { JwtPayload } from "jsonwebtoken";
// import cors from "cors";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app: Application = express();
// app.use(express.json());

// const typeDefs = gql(
//   readFileSync(path.join(__dirname, "schema/post.graphql"), "utf-8")
// );

// app.get("/", (_req: Request, res: Response) => {
//   res.send({ message: "Apollo Post Server is running..." });
// });

// const server = new ApolloServer({
 
//     typeDefs,
//     resolvers: resolvers as any,
 
// });

// await server.start();

// app.use("/graphql",
//    cors({
//     origin: [
//       "http://localhost:3000",
//       "https://your-frontend.vercel.app",
//     ],
//     credentials: true,
//   }),
//    expressMiddleware(server,{
//     context: async ({req}) : Promise<DataSourceContext>  => {
//       const { cache } = server;
//          // 1. Read Authorization header
//       const authHeader = req.headers.authorization;
       
//       let user: AuthUser | null = null;

//       // 2. Verify token if exists
//       if (authHeader?.startsWith("Bearer ")) {
//         const token = authHeader.split(" ")[1];

//         if(!token) throw new Error('Invalid Token')

//         try {
//           user = verifyToken(token);
        
//         } catch (err) {
//           throw new Error("Invalid or expired token");
//         }
//       }

//       return {
//         user,
//         dataSources: {
//           postAPI: new PostAPI({ cache }),
//         },
//       };
//     },
//   }));

// export default app;



import express, { type Application, type Request, type Response } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import gql from "graphql-tag";
import { readFileSync } from "fs";
import path from "path";
import cors from "cors";

import { resolvers } from "./resolver/resolver";
import { DataSourceContext } from "./context";
import { PostAPI } from "./dataSources/postApi";
import { AuthUser, verifyToken } from "./auth/verifyToken";

const app: Application = express();
app.use(express.json());

// ✅ Use process.cwd() to locate schema
const typeDefs = gql(
  readFileSync(path.resolve(process.cwd(), "src/schema/post.graphql"), "utf-8")
);

// ✅ Simple health check
app.get("/", (_req: Request, res: Response) => {
  res.send({ message: "Apollo Post Server is running..." });
});

// ✅ Wrap ApolloServer startup in async function
async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers as any,
  });

  await server.start();

  // ✅ Attach Apollo middleware
  app.use(
    "/graphql",
    cors({
      origin: [
        "http://localhost:3000",
        "https://your-frontend.vercel.app", // frontend URL
      ],
      credentials: true,
    }),
    expressMiddleware(server, {
      context: async ({ req }): Promise<DataSourceContext> => {
        const { cache } = server;

        const authHeader = req.headers.authorization;
        let user: AuthUser | null = null;

        if (authHeader?.startsWith("Bearer ")) {
          const token = authHeader.split(" ")[1];
          if (!token) throw new Error("Invalid token");

          try {
            user = verifyToken(token);
          } catch {
            throw new Error("Invalid or expired token");
          }
        }

        return {
          user,
          dataSources: {
            postAPI: new PostAPI({ cache }),
          },
        };
      },
    })
  );
}

export { app, startApolloServer };
