using OpenAI;
using OpenAI.Chat;
using JobHelperApi.Models;
using System.Text.Json;
using System.Net.Http.Json;
using JobHelperApi.Services;
using JobHelperApi.Orchestror;
using JobHelperApi.Data;
using JobHelperApi.Models.AuthModels;

// using JobHelperApi.Services.AuthServices;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;




var builder = WebApplication.CreateBuilder(args);

//listens to all ips instead of localhost
builder.WebHost.ConfigureKestrel(options =>
{
    var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
    options.ListenAnyIP(int.Parse(port));
});


// Register OpenAI client
var apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");

//Check for API Key
if (string.IsNullOrEmpty(apiKey))
{
    Console.WriteLine("❌ OPENAI_API_KEY is missing!");
}
else
{
    Console.WriteLine("✅ OPENAI_API_KEY loaded, length = " + apiKey.Length);
}

//Add OpenAI Client with API Key
builder.Services.AddSingleton(_ => new OpenAIClient(apiKey));

//Enable CORs
builder.Services.AddCors(p =>
    p.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
builder.Services.AddHttpClient();

builder.Services.AddScoped<JobParserService>();
builder.Services.AddScoped<ResumeService>();
builder.Services.AddScoped<CoverLetterService>();
builder.Services.AddScoped<ChatAPIOrchestrator>();
builder.Services.AddScoped<AnswerQuestions>();

builder.Services.AddDbContext<AuthDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


var app = builder.Build();
app.UseCors();
Console.WriteLine("Connection: " + builder.Configuration.GetConnectionString("DefaultConnection"));


//JOB PARSER ENDPOINT. Client will call this endpoint with the raw text input.
app.MapPost("/api/jobparser", async (ChatAPIOrchestrator orchestrator, JobTextInput input) =>
{
    var package = await orchestrator.BuildApplicationAsync(input);
    JobApplicationStore.LastPackage = package;
    return Results.Ok(package);

});

//Creates a new GET endpoint at /api/downloadresume
app.MapGet("/api/downloadresume", () =>
{
    var jAPack = JobApplicationStore.LastPackage;
    var filePath = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).FullName, "ResumePDFs", $"Resume-{jAPack.ListingInfo.Company}.pdf");
    var contentType = "application/pdf";
    var fileName = $"Resume-{jAPack.ListingInfo.Company}.pdf";

    return Results.File(filePath, contentType, fileName);
});

//Creates a new GET endpoint at /api/downloadcoverletter
app.MapGet("/api/downloadcoverletter", () =>
{
    var jAPack = JobApplicationStore.LastPackage;
    var filePath = Path.Combine(Directory.GetParent(Directory.GetCurrentDirectory()).FullName, "CoverLetterPDFs", $"CoverLetter-{jAPack.ListingInfo.Company}.pdf");
    var contentType = "application/pdf";
    var fileName = $"CoverLetter-{jAPack.ListingInfo.Company}.pdf";

    return Results.File(filePath, contentType, fileName);
});

app.MapPost("/api/otherquestions", async (AnswerQuestions asked, UserQuestionInput userQuestion) =>
{
    var lastPackage = JobApplicationStore.LastPackage;

    if (lastPackage == null)
        return Results.BadRequest("No job package available yet.");

    var result = await asked.Ask(lastPackage, userQuestion);
    return Results.Ok(result);
});


//Auth Enpoints
app.MapPost("/api/signup", async(AuthDbContext context, Signup signup) =>
{
    Console.WriteLine(signup.FirstName);
    Console.WriteLine(signup.LastName);
    Console.WriteLine(signup.Email);

    var hashedPassword = PasswordHelper.HashPassword(signup.Password);
    var user = new User
    {
        first_name = signup.FirstName,
        last_name = signup.LastName,
        email = signup.Email,
        password = hashedPassword,
        created_at = DateTime.Now
    };
    context.Users.Add(user);
    await context.SaveChangesAsync();

    return Results.Ok("User registered successfully");
});

app.MapPost("/api/login", async(AuthDbContext context, Login login) =>
{
    Console.WriteLine(login.Email);
    
    //Convert users table to list
    var currentUsers = await context.Users.ToListAsync();

    //sql query to filter rows to only be the one where email matches
    var userTryLoginQuery =
        from u in context.Users
        where u.email == login.Email
        select u;

    var userFound = await userTryLoginQuery.FirstOrDefaultAsync();

    bool userLoginSuccess = PasswordHelper.VerifyPassword(userFound.password, login.Password);

    if (userLoginSuccess)
    {
        Console.WriteLine("User Login Success!");
    }
    else
    {
        Console.WriteLine("User Login Fail.");
    }
    Console.WriteLine(userFound.password);

});
app.Run();
