using GoOut.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoOut.Core.Interfaces.Repositories
{
   public interface IUserRepository
    {
        void Add(User user);
         void Delete(User user);
         Task<IEnumerable<User>> GetAll();
         Task<User> GetUser(Guid id);
         User UpdateUser(User item);
        Task<User> GetByEmail(string email);
        Task<User> GetUserWithLiked(Guid id);
    }
}
