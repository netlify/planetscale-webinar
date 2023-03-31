import { schedule } from "@netlify/functions";
import { withPlanetscale } from "@netlify/planetscale";
import { updateUsage } from "../helpers/payment";

interface TeamUsageResult {
  team_id: string;
  message_count: number;
  team_name: string;
}

const processBillingHandler = withPlanetscale(async (event, context) => {
  const { connection } = context.planetscale;

  const { rows } = await connection.execute(
    "SELECT summaries.team_id, teams.team_name SUM(message_count) AS message_count FROM summaries LEFT JOIN teams ON summaries.team_id = teams.team_id GROUP BY team_id"
  );

  const usage = rows as TeamUsageResult[];

  console.log(`Processing ${usage.length} teams...`);

  for (const teamUsage of usage) {
    try {
      console.log("Processing team -", teamUsage.team_name);
      await updateUsage(teamUsage.team_id, teamUsage.message_count);

      console.log(
        `Team ${teamUsage.team_name} used ${teamUsage.message_count} messages`
      );
    } catch (e) {
      console.error(`Error processing ${teamUsage.team_id}`);
      console.error(e);
    }
  }

  return {
    statusCode: 200,
  };
});

export const handler = schedule("@daily", processBillingHandler);
