using OpenAI;
using OpenAI.Chat;
using JobHelperApi.Models;
using System.Text.Json;
using System.Net.Http.Json;
using JobHelperApi.Helpers;



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

var app = builder.Build();
app.UseCors();


//JOB PARSER ENDPOINT. Client will call this endpoint with the raw text input.
app.MapPost("/api/jobparser", async (OpenAIClient client, JobTextInput input) =>
{
    var system = "You extract job information. Respond with JSON only using keys: title, company, description, techStack (array of strings)."; //system role - what the AI is
    var user = $"Job description:\n{input.JobText}"; //user role - what the user types to the AI

    //ChatGPT Request
    var parseChatRequest = new ChatRequest(
        model: "gpt-4.1-mini",
        messages: new[]
        {
            new Message(Role.System, system),
            new Message(Role.User,   user)
        }
    );

    var parseResult = await client.ChatEndpoint.GetCompletionAsync(parseChatRequest);

    //Just output what the model replied with
    var raw = parseResult.FirstChoice.Message.Content?.ToString();

    //Remove code fences if present
    var cleaned = raw.Replace("```json", "").Replace("```", "");

    //Deserialize to a strongly-typed object (JobParseResult Model)
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

    // return Results.Ok(job);



    var coverSystem =
        "You write concise, professional cover letters tailored to the job. " +
        "Write 3 full paragraphs, first person, no headers or salutations. Each Paragraph should be seperated by a full empty line" +
        "Use only information provided. Do not fabricate achievements. Return strict minified JSON exactly like: {\"CoverLetterText\":\"...\"}. No markdown, no code fences, no extra text.";

    var coverUser =
        $"Job Title: {job.Title}\n" +
        $"Company: {job.Company}\n" +
        $"Description:\n{job.Description}" +
        $"Tech Stack: {job.TechStack}";


    var coverChatRequest = new ChatRequest(
        model: "gpt-4.1-mini",
        messages: new[]
        {
            new Message(Role.System, coverSystem ),
            new Message(Role.User, coverUser)
        }
    );

    var coverResult = await client.ChatEndpoint.GetCompletionAsync(coverChatRequest);

    var rawCover = coverResult.FirstChoice.Message.Content?.ToString();

    //Remove code fences if present
    var coverResultCleaned = rawCover.Replace("```json", "").Replace("```", "");

    //Deserialize to a strongly-typed object (coverLetter Model)
    CoverLetterResult? coverLetter;
    try
    {
        coverLetter = JsonSerializer.Deserialize<CoverLetterResult>(coverResultCleaned, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
    }
    catch
    {
        return Results.UnprocessableEntity(new { error = "Model did not return valid JSON", rawCover });
    }




    var package = new JobApplicationPackage
    {
        ListingInfo = job!,
        CoverLetter = coverLetter! 
    };

    CoverLetterCreation.Write(package);
    return Results.Ok(package);

});
app.Run();


