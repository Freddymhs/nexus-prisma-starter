import { initializeServer } from "./server";

// run server
initializeServer()
  .then((app) => {
    app.listen(process.env.PORT, () => {
      console.log(`
    -Server is ready!
  
    Environment: ${process.env.NODE_ENV}
    API Gateway:  http://${process.env.DOMAIN}:${process.env.PORT}/graphql
  
    (Press CTRL+C to stop)
    `);
    });
  })
  .catch((error) => {
    console.error("Failed to start server with error:", error);
  });
