using System.Threading.Tasks;
using DiplomBackendASPNet.Hubs.Clients;
using DiplomBackendASPNet.Models;
using Microsoft.AspNetCore.SignalR;
namespace DiplomBackendASPNet.Hubs
{
    public class ChatHub: Hub<IChatClient>
    {
        
    }
}
