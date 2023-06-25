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
    public class EventRepository:IEventRepository
    {
        private readonly DataContext _dataContext;
        public EventRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public void Add(Event eve)
        {
            _dataContext.Events.Add(eve);
        }
        public void Delete(Event eve)
        {
            _dataContext.Events.Remove(eve);
        }
        public async Task<IEnumerable<Event>> GetAll()
        {
            var eve = await _dataContext.Events.ToListAsync();
            return eve;
        }
        public async Task<Event> GetEvent(Guid id)
        {
            var eve = await _dataContext.Events.FirstOrDefaultAsync(item => item.Id == id);

            if (eve != null)
            {
                return eve;
            }
            throw new ApplicationException($"Event with id: {id} does not exist");

        }
        public Event UpdateEvent(Event item)
        {
            var eve = _dataContext.Events.FirstOrDefault(i => i.Id == item.Id);
            eve = item;
            _dataContext.Events.Update(eve);
            return eve;
        }
    }
}
