using Microsoft.AspNetCore.Identity;

namespace DiplomBackendASPNet.Models
{
    public class User: IdentityUser
    {
       
        
        public string Login { get; set; }
        public string Password { get; set; }
       
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Patronymic { get; set; }
        public string DateOfBirth { get; set; }
        public string City { get; set; }
        
        
    }

  
}
