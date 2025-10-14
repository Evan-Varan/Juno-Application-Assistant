namespace JobHelperApi.Models.AuthModels;

public sealed class Signup
{
    public string FirstName { get; init; } = "";
    public string LastName { get; init; } = "";
    public string Email { get; init; } = "";
    public string Password { get; init; } = "";
}