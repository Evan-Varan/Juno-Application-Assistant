using Microsoft.EntityFrameworkCore;
using JobHelperApi.Models.AuthModels;

namespace JobHelperApi.Data;

/*

Class that inherits from DbContext. DbContext is the main class EF uses to talk to the database 
It opens connections, tracks model changes, runs queries, saves data. 

*/
public class AuthDbContext : DbContext
{
    /*

    “When someone creates this AuthDbContext, they must tell me how to connect to the database — 
    and I’ll give that info to the base DbContext class so it can handle everything.”
    
    */

    public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options) { }

    /*

    “There’s a table in my database that stores Login entities.”
    DbSet<Login> represents a table.
    Each property (Logins) is a collection of entities (rows) that EF Core tracks.

    Same goes for signup

    */

    public DbSet<User> Users { get; init; }
}