using GoOut.Core.Interfaces.Repositories;
using GoOut.Domain;
using GoOut.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoOut.Infrastructure.Repositories
{
    public class UserRepository:IUserRepository
    {
        private readonly DataContext _dataContext;
        public UserRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public void Add(User user)
        {
            _dataContext.Users.Add(user);
        }
        public void Delete(User user)
        {
            _dataContext.Users.Remove(user);
        }
        public async Task<IEnumerable<User>> GetAll()
        {
            var user = await _dataContext.Users.ToListAsync();
            return user;
        }
        public async Task<User> GetUser(Guid id)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(item => item.Id == id);

            if (user != null)
            {
                return user;
            }
            throw new ApplicationException($"User with id: {id} does not exist");

        }
        public async Task<User> GetUserWithLiked(Guid id)
        {
            var user = await _dataContext.Users.Include(c=>c.LikedEvents).FirstOrDefaultAsync(item => item.Id == id);

            if (user != null)
            {
                return user;
            }
            throw new ApplicationException($"User with id: {id} does not exist");

        }
        public async Task<User> GetByEmail(string email)
        {
            var user=await _dataContext.Users.Include(c=>c.CreatedEvents).Include(d=>d.LikedEvents).FirstOrDefaultAsync(item=>item.Email == email);
            if(user != null)
            {
                return user;
            }
            throw new ApplicationException($"User with email: {email} does not exit");
        }
        public User UpdateUser(User item)
        {
            var user = _dataContext.Users.FirstOrDefault(i => i.Id == item.Id);
            user = item;
            _dataContext.Users.Update(user);
            return user;
        }


    }
}
