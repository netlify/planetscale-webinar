import { useUsage } from "../queries/usage";

const UsagePage = () => {
  const { data: usage, isLoading } = useUsage();

  const totalMessages = usage?.reduce(
    (acc, u) => acc + Number.parseInt(u.message_count),
    0
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <h1>Usage</h1>
        <div className="ml-auto">Total messages: {totalMessages}</div>
      </div>
      <div>
        {usage?.map((u) => (
          <div
            key={u.channel_id}
            className="w-full p-4 rounded shadow flex items-center"
          >
            <span className="font-bold" title="Channel ID">
              {u.channel_id}
            </span>
            <div className="ml-auto">
              <p>
                Total messages processed:{" "}
                <span className="">{u.message_count}</span>
              </p>
              <p>
                Total summaries: <span className="">{u.summary_count}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsagePage;
