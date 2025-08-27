namespace JobHelperApi.Helpers;

using JobHelperApi.Models;
using Xceed.Document.NET;
using Xceed.Words.NET;
using System.Drawing;
using XColor = Xceed.Drawing.Color; // Color.Black, etc.



public class CoverLetterCreation
{
    public static void Write(JobApplicationPackage package)
    {
        var doc = DocX.Create(Path.Combine("C:/Users/Brick/Documents/GitHub/JobHelper-Application/CoverLetterDocs", $"CoverLetter-{package.ListingInfo.Company}-{package.ListingInfo.Title}.docx"));

        doc.MarginLeft = 56; doc.MarginRight = 56; doc.MarginTop = 56; doc.MarginBottom = 56;

        var nameP = doc.InsertParagraph("Evan Varan").Bold().FontSize(17).SpacingAfter(4);
        nameP.Alignment = Alignment.center;
        
        var contact = "Cedar Park, Texas | 512-966-6064 | evan.varan@gmail.com | ";
        var contactP = doc.InsertParagraph(contact).FontSize(10);
        var linkedInLink = doc.AddHyperlink("LinkedIn", new Uri("https://www.linkedin.com/in/evan-r-varan/"));
        contactP.AppendHyperlink(linkedInLink).FontSize(10);
        
        var gitHubLink = doc.AddHyperlink("Github", new Uri("https://github.com/Evan-Varan"));
        contactP.AppendHyperlink(gitHubLink).FontSize(10).SpacingAfter(12).UnderlineStyle(UnderlineStyle.singleLine);
        contactP.Alignment = Alignment.center;

        var ruleP = doc.InsertParagraph(string.Empty);
        ruleP.InsertHorizontalLine(
            HorizontalBorderPosition.bottom,   // where to place the line relative to the paragraph
            BorderStyle.Tcbs_single,           // solid line
            6,                                 // thickness (points)
            0,                                 // space
            XColor.Black                       // line color
        );
        ruleP.SpacingAfter(14).Bold();
        ruleP.Alignment = Alignment.center;

        doc.InsertParagraph(package.CoverLetter.Date).FontSize(11);
        doc.InsertParagraph($"Dear {package.ListingInfo.Company} Hiring Team,").FontSize(11).SpacingAfter(12);

        doc.InsertParagraph(package.CoverLetter.CoverLetterText).FontSize(11).SpacingAfter(12);

        doc.InsertParagraph("Sincerely,").FontSize(11);
        doc.InsertParagraph("Evan Varan").FontSize(11).SpacingAfter(6);

        var font = new Xceed.Document.NET.Font("Times New Roman");
        foreach (var p in doc.Paragraphs)
        {
            p.Font(font);
        }

        doc.Save();
    }
}