using OpenAI;
using OpenAI.Chat;
using JobHelperApi.Models;
using System.Text.Json;
using System.Net.Http.Json;
using JobHelperApi.Services;
using JobHelperApi.Resources;

namespace JobHelperApi.Services
{
    public class JobParserService
    {
        private readonly OpenAIClient client;

        public JobParserService(OpenAIClient oAIC)
        {
            client = oAIC;
        }
        public async Task<JobParseResult> ParseJobAsync(JobTextInput jobText)
        {
            var system = Prompts.parseSystemPrompt;

            var user = Prompts.parseUserPrompt + jobText.JobText;

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
            return JsonSerializer.Deserialize<JobParseResult>(
                cleaned!,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
            );
        }
    }
}