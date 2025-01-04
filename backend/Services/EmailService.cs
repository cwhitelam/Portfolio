using SendGrid;
using SendGrid.Helpers.Mail;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using System.Text;

public class EmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailAsync(string name, string email, string message)
    {
        try
        {
            var apiKey = _configuration["SendGrid:ApiKey"];
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(email, name);
            var subject = $"New Contact Form Submission from {name}";
            var to = new EmailAddress(_configuration["SendGrid:ToEmail"], "Your Name");
            var plainTextContent = $"Name: {name}\nEmail: {email}\nMessage: {message}";
            var htmlContent = $"<strong>Name:</strong> {name}<br><strong>Email:</strong> {email}<br><strong>Message:</strong> {message}";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            
            Console.WriteLine($"Attempting to send email to: {to.Email}");
            var response = await client.SendEmailAsync(msg);
            
            Console.WriteLine($"SendGrid Response: {response.StatusCode}");
            Console.WriteLine($"SendGrid Headers: {response.Headers}");
            var body = await response.Body.ReadAsStringAsync();
            Console.WriteLine($"SendGrid Body: {body}");

            if (response.StatusCode != System.Net.HttpStatusCode.Accepted && response.StatusCode != System.Net.HttpStatusCode.OK)
            {
                throw new Exception($"Failed to send email. Status Code: {response.StatusCode}");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error sending email: {ex.Message}");
            Console.WriteLine($"Stack Trace: {ex.StackTrace}");
            throw; // Rethrow the exception to be caught by the controller
        }
    }
}
