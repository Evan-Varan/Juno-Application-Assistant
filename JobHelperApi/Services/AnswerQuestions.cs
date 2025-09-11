namespace JobHelperApi.Services;
using OpenAI;
using OpenAI.Chat;
using JobHelperApi.Models;
using JobHelperApi.Resources;
using System.Text.Json;
using Xceed.Words.NET;

public class AnswerQuestions
{
    private readonly OpenAIClient client;

    public AnswerQuestions(OpenAIClient oAIC)
    {
        client = oAIC;
    }
    public async Task<QuestionResult> Ask(JobApplicationPackage jobApplicationPackage, UserQuestionInput userQuestion)
    {
        var system = """
        You are an assistant that helps job applicants answer ANY additional job application questions.
        - Use ONLY the provided job listing, resume, and cover letter as background context. 
        - Always answer in the applicant’s voice, tailoring responses to highlight their skills, projects, and motivation. 
        - Never repeat entire cover letters or resumes verbatim.
        - Keep the tone eager but professional. Show passion for software as a hobby and career.
        - Vary sentence structure to sound human and avoid LLM-detection markers.
        - Use natural language, avoid clichés like 'I’m thrilled to apply' or 'this role aligns with my goals.'
        - Make the writing concise, but let it flow naturally — not too clipped or too corporate.
        - Do not include a greeting like 'Dear Hiring Team' — just the body.
        - Do not use any kind of dashes in sentence structure.
        - Keep responses focused on the specific question asked.
        - Return the answer strictly as a JSON object in this format:
        {
        "Response": "string"
        }
        """;


        var job = jobApplicationPackage.ListingInfo;
        var resumeDoc = jobApplicationPackage.Resume;
        var coverLetter = jobApplicationPackage.CoverLetter;

       var user = $"""
        Here is the applicant’s job information:
        - Job Title: {job.Title}
        - Company: {job.Company}
        - Description: {job.Description}
        - Tech Stack: {string.Join(", ", job.TechStack.Select(t => t.Name))}

        Here is the applicant’s resume:
        {resumeDoc}

        Here is the applicant’s tailored cover letter:
        {coverLetter.CoverLetterText}

        The hiring company has asked this question:

        APPLICATION QUESTION:
        {userQuestion.UserQuestion}

        Please provide a professional and specific answer to the APPLICATION QUESTION above.
        """;
        
        var questionChatRequest = new ChatRequest(
            model: "gpt-4.1-mini",
            messages: new[]
            {
                new Message(Role.System, system ),
                new Message(Role.User, user)
            }
        );

        var questionResult = await client.ChatEndpoint.GetCompletionAsync(questionChatRequest);

        var raw = questionResult.FirstChoice.Message.Content?.ToString();

        //Remove code fences if present
        var cleaned = raw.Replace("```json", "").Replace("```", "");

        //Deserialize to a strongly-typed object (CoverLetterResult Model)
        return JsonSerializer.Deserialize<QuestionResult>(
            cleaned!,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
        );
    }
}