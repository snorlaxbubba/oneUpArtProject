export async function handler(event, context) {

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "hello from one up art project using SST!",
    }),
  };
}
