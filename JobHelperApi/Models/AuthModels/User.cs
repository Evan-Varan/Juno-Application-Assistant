using System.ComponentModel.DataAnnotations.Schema;
namespace JobHelperApi.Models.AuthModels;

[Table("user")]
public sealed class User
{

    public int Id { get; set; } //We need to define ID in the user class but we dont need to set it.
    public string first_name { get; set; } = "";
    public string last_name { get; set; } = "";
    public string email { get; set; } = "";
    public string password { get; set; } = "";
    public DateTime created_at { get; set; } = DateTime.Now;
}