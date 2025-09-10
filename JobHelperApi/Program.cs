using OpenAI;
using OpenAI.Chat;
using JobHelperApi.Models;
using System.Text.Json;
using System.Net.Http.Json;
using JobHelperApi.Services;
using JobHelperApi.Orchestror;

var builder = WebApplication.CreateBuilder(args);

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
builder.Services.AddScoped<JobApplicationOrchestrator>();

var app = builder.Build();
app.UseCors();


//JOB PARSER ENDPOINT. Client will call this endpoint with the raw text input.
app.MapPost("/api/jobparser", async (JobApplicationOrchestrator orchestrator, JobTextInput input) =>
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
app.Run();


public static class JobApplicationStore
{
    public static JobApplicationPackage? LastPackage { get; set; }
}