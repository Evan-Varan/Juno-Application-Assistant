using OpenAI;
using OpenAI.Chat;
using JobHelperApi.Models;
using System.Text.Json;
using System.Net.Http.Json;
using JobHelperApi.Services;
using JobHelperApi.Resources;
using Xceed.Words.NET;

namespace JobHelperApi.Services;

public class CoverLetterService
{
    private readonly OpenAIClient client;

    public CoverLetterService(OpenAIClient oAIC)
    {
        client = oAIC;
    }
    public async Task<CoverLetterResult> CoverLetterTextAsync(JobParseResult jobParseResult, string resumeText)
    {
        var system = Prompts.coverLetterSystemPrompt;

        var user =
        $"{Prompts.coverLetterUserPrompt}\n" +
        $"Job Title: {jobParseResult.Title}\n" +
        $"Company: {jobParseResult.Company}\n" +
        $"Description:\n{jobParseResult.Description}\n" +
        $"Tech Stack: {string.Join(", ", jobParseResult.TechStack.Select(t => t.Name))}\n" +
        "And here is the tailored resume for the job listing:\n" +
        resumeText;


        //ChatGPT Request
        var coverChatRequest = new ChatRequest(
            model: "gpt-4.1-mini",
            messages: new[]
            {
                new Message(Role.System, system ),
                new Message(Role.User, user)
            }
        );

        var coverResult = await client.ChatEndpoint.GetCompletionAsync(coverChatRequest);

        var raw = coverResult.FirstChoice.Message.Content?.ToString();

        //Remove code fences if present
        var cleaned = raw.Replace("```json", "").Replace("```", "");

        //Deserialize to a strongly-typed object (CoverLetterResult Model)
        return JsonSerializer.Deserialize<CoverLetterResult>(
            cleaned!,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
        );
    }
}