import {
  GlacierClient,
  ListVaultsCommand,
} from "@aws-sdk/client-glacier";

(async () => {
  // Assumes credentials are available through the default credential chain
  const client = new GlacierClient({
    region: "us-east-1",
  });
  client.middlewareStack.identifyOnResolve(true);
  client.middlewareStack.addRelativeTo((next, context) => args => {
    // console.log(JSON.stringify(context, null, 2));
    return next(args);
  }, {
    name: "CUSTOM CONTEXT IDENTIFIER",
    toMiddleware: "httpSigningMiddleware",
    relation: "after",
  });
  const command = new ListVaultsCommand({
    accountId: "INSERT ACCOUNT ID HERE",
  });
  console.log({
    response: await client.send(command)
  });
})();
