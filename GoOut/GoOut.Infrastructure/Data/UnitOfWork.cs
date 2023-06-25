using GoOut.Core.Interfaces;
using GoOut.Core.Interfaces.Repositories;
using GoOut.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GoOut.Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private DataContext _appDbContext;
        private IUserRepository _userRepository;
        private IEventRepository _eventRepository;

        public UnitOfWork(DataContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public IUserRepository UserRepository
        {
            get
            {
                if (_userRepository == null)
                {
                    _userRepository = new UserRepository(_appDbContext);
                }
                return _userRepository;
            }
            set
            {
                _userRepository = value;
            }

        }
        public IEventRepository EventRepository
        {
            get
            {
                if (_eventRepository == null)
                {
                    _eventRepository = new EventRepository(_appDbContext);
                }
                return _eventRepository;
            }
            set
            {
                _eventRepository = value;
            }

        }
        public async Task<int> SaveChangesAsync()
        {

            return await _appDbContext.SaveChangesAsync();
        }
    }
}