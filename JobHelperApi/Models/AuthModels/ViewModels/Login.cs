namespace JobHelperApi.Models.AuthModels;

public sealed class Login {
    public string Email { get; init; } = "";
    public string Password { get; init; } = "";   
}