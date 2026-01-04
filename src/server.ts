// import app from './app';
// import config from './config';




// const startServer = async () => {
//   try {
 
//     app.listen(config.port || 4000, () => {
//       console.log(`🚀 Apollo Post Server running at http://localhost:${config.port || 4000}/graphql`)
//     });
//   } catch (error) {
  
//     console.error('Error starting server:', error);
//   }
// };

// startServer();



import { app, startApolloServer } from "./app";
import config from "./config";

const PORT = config.port || 4000;

async function startServer() {
  try {
    // ✅ Initialize Apollo FIRST
    await startApolloServer();

    // ✅ Then start Express
    app.listen(PORT, () => {
      console.log(
        `🚀 Apollo Post Server running at http://localhost:${PORT}/graphql`
      );
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
}

startServer();

