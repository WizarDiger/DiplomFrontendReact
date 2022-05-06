using System.Threading.Tasks;
using DiplomBackendASPNet.Models;
namespace DiplomBackendASPNet.Hubs.Clients
{
    public interface IChatClient
    {
        Task ReceiveMessage(ChatMessage message);
    }
}
