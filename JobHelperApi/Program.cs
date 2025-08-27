using OpenAI;
using OpenAI.Chat;
using JobHelperApi.Models;
using System.Text.Json;


var builder = WebApplication.CreateBuilder(args);

// Register OpenAI client
var apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
if (string.IsNullOrEmpty(apiKey))
{
    Console.WriteLine("❌ OPENAI_API_KEY is missing!");
}
else
{
    Console.WriteLine("✅ OPENAI_API_KEY loaded, length = " + apiKey.Length);
}

builder.Services.AddSingleton(_ => new OpenAIClient(apiKey));
builder.Services.AddCors(p =>
    p.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();
app.UseCors();

// app.MapPost("/api/coverletter", async (OpenAIClient client, CoverLetterInput input) =>
// {
//     var chatRequest = new ChatRequest(
//         model: "gpt-4.1-mini",
//         messages: new[]
//         {
//             new Message(Role.System, "You write professional cover letters."),
//             new Message(Role.User, $"Job data: {input.JobData}\nNotes: {input.Notes}\n\nWrite a tailored cover letter.")
//         }
//     );

//     var result = await client.ChatEndpoint.GetCompletionAsync(chatRequest);

//     return Results.Ok(new { coverLetter = result.FirstChoice.Message.Content });
// });


app.MapPost("/api/jobparser", async (OpenAIClient client, JobTextInput input) =>
{
    var system = "You extract job information. Respond with JSON only using keys: title, company, description, techStack (array of strings).";
    var user   = $"Job description:\n{input.JobText}";

    var chatRequest = new ChatRequest(
        model: "gpt-4.1-mini",
        messages: new[]
        {
            new Message(Role.System, system),
            new Message(Role.User,   user)
        }
    );

    var result = await client.ChatEndpoint.GetCompletionAsync(chatRequest);

    // Just output what the model replied with
    var raw = result.FirstChoice.Message.Content?.ToString();

    // Remove code fences if present
    var cleaned = raw
        .Replace("```json", "")
        .Replace("```", "");

    // Deserialize to a strongly-typed object
    JobParseResult? job;
    try
    {
        job = JsonSerializer.Deserialize<JobParseResult>(cleaned,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
    }
    catch
    {
        return Results.UnprocessableEntity(new { error = "Model did not return valid JSON", raw });
    }

    return Results.Ok(job);
});
app.Run();
