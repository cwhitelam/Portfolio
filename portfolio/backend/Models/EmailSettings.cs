namespace backend.Models;

public class EmailSettings
{
    public string SmtpUsername { get; set; } = string.Empty;
    public string SmtpPassword { get; set; } = string.Empty;
    public string ToEmail { get; set; } = string.Empty;
} 