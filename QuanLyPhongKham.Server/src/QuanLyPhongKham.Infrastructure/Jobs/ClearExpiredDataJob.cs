using Quartz;
using QuanLyPhongKham.Application.Interfaces.Background;

namespace QuanLyPhongKham.Infrastructure.Jobs
{
    [DisallowConcurrentExecution]
    public class ClearExpiredDataJob : IJob
    {
        private readonly IClearExpiredDataHandler _handler;

        public ClearExpiredDataJob(IClearExpiredDataHandler handler)
        {
            _handler = handler;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            await _handler.HandleAsync();
        }
    }
}
