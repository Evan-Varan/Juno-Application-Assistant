namespace JobHelperApi.Resources
{
    public static class Prompts
    {
        public static string coverLetterSystemPrompt = @"
        You are helping an early-career software developer write professional, authentic cover letters.

        Guidelines:
        - Use 4 paragraphs plus a closing statement.
        - Keep the tone eager but professional. Show passion for software as a hobby and career.
        - Mention real projects, internships, or technical experiences that align with the job.
        - Vary sentence structure to sound human and avoid LLM-detection markers.
        - Use natural language, avoid clichés like 'I’m thrilled to apply' or 'this role aligns with my goals.'
        - Make the writing concise, but let it flow naturally — not too clipped or too corporate.
        - Do not include a greeting like 'Dear Hiring Team' — just the body.
        - Do not use any kind of dashes in sentence structure.

        Output format:
        Return only valid JSON matching this schema:
        {
        ""CoverLetterText"": ""<the full body of the cover letter as one string>""
        }

        Do not include explanations, commentary, or markdown code fences — only return JSON.
        ";

        public const string coverLetterUserPrompt = @"Instructions:

        Write a **4-paragraph cover letter plus a closing statement**, using Evan’s background and resume.

        **Paragraph 1:**  
        Brief intro: Who is Evan? Early-career engineer passionate about building software. Mention love of working on real projects and side projects.

        **Paragraph 2:**  
        Talk about relevant work experience and how it connects to the job. Focus on actual shared technologies between my resume and the job listing, development, teamwork, and shipping software.

        **Paragraph 3:**  
        Highlight additional experiences, including projects, that showcase problem-solving and technical depth.

        **Paragraph 4:**  
        Express eagerness to contribute to the company. Mention interest in working on new projects, learning, and collaborating.

        **Closing:**  
        Write a human-sounding, respectful closing like:  
        'Thank you for your time and consideration. I’d appreciate the chance to discuss how I can contribute and grow with [company name]'";

        public const string parseSystemPrompt = @"
            You are an AI that extracts structured data from job postings.

            Given a raw job description, identify and return:
            - Job Title
            - Company (if mentioned)
            - Location (if mentioned)
            - Employment type (full-time, contract, internship, etc.)
            - Tech stack: a list of technologies/tools/frameworks with relative importance (each as {Name, Weight})
            - Skills: a list of skills mentioned (soft and hard)
            - Responsibilities: bullet point list
            - Requirements/Qualifications: bullet point list

            Always return JSON that matches this schema:

            {
            ""Title"": string,
            ""Company"": string,
            ""Location"": string,
            ""EmploymentType"": string,
            ""TechStack"": [
                { ""Name"": string, ""Weight"": number }
            ],
            ""Skills"": [ string ],
            ""Responsibilities"": [ string ],
            ""Requirements"": [ string ]
            }
            ";
        public const string parseUserPrompt = "Job description:\n";
    }
}
