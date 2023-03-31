import { withPlanetscale } from "@netlify/planetscale";

export const handler = withPlanetscale(async (event, context) => {
  const { connection } = context.planetscale;

  const { rows: usage } = await connection.execute(
    "SELECT channel_id, SUM(message_count) AS message_count, count(*) as summary_count FROM summaries GROUP BY channel_id"
  );

  return {
    statusCode: 200,
    body: JSON.stringify(usage),
  };
});
