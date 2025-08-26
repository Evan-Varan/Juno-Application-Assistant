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

var app = builder.Build();

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


app.MapPost("/api/jobparser", async (OpenAIClient client, JobUrlInput input) =>
{
    var system = "You extract job information. Respond with JSON only using keys: title, company, description, techStack (array of strings).";
    var user   = $"Job link: {input.JobUrl}";

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

    return Results.Ok(new { raw });
});
app.Run();
