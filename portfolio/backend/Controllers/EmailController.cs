using Microsoft.AspNetCore.Mvc;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmailController : ControllerBase
{
    private readonly IEmailService _emailService;
    private readonly ILogger<EmailController> _logger;

    public class EmailRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }

    public EmailController(IEmailService emailService, ILogger<EmailController> logger)
    {
        _emailService = emailService;
        _logger = logger;
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendEmail([FromBody] EmailRequest request)
    {
        try
        {
            _logger.LogInformation("Attempting to send email. Request: {@Request}", request);

            if (string.IsNullOrWhiteSpace(request.Name) || string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Message))
            {
                _logger.LogWarning("Invalid request: Missing required fields");
                return BadRequest(new { error = "Name, email, and message are required" });
            }

            var success = await _emailService.SendEmailAsync(request.Name, request.Email, request.Subject, request.Message);
            
            if (success)
            {
                _logger.LogInformation("Email sent successfully");
                return Ok(new { message = "Email sent successfully" });
            }

            _logger.LogError("Failed to send email");
            return StatusCode(500, new { error = "Failed to send email" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in SendEmail endpoint: {Message}", ex.Message);
            return StatusCode(500, new { error = $"An error occurred while sending the email: {ex.Message}" });
        }
    }
} 