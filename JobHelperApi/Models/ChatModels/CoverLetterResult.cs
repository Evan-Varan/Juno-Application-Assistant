namespace JobHelperApi.Models;
using System.Globalization;

public sealed class CoverLetterResult
{
    public string CoverLetterText { get; init; } = "";
    public string Date { get; init; } =  DateTime.Now.ToString("MM/dd/yyyy", CultureInfo.InvariantCulture);
}