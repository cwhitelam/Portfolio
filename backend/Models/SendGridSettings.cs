namespace backend.Models;

public class SendGridSettings
{
    public string ApiKey { get; set; } = string.Empty;
    public string ToEmail { get; set; } = string.Empty;
}
