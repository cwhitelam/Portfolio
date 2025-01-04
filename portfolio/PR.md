# Add Railway Deployment Configuration

## Changes Made
- Added Railway deployment configuration (`railway.toml`)
- Created multi-stage Dockerfile for optimized builds
- Added Docker ignore file for better build performance
- Updated backend configuration for production environment
- Added health check endpoint for monitoring
- Configured CORS for production domains

## Technical Details
### Docker Configuration
- Frontend build stage using Node.js 18
- Backend build stage using .NET SDK 7.0
- Runtime stage using .NET ASP.NET 7.0
- Proper environment variable handling
- Static file serving for React app

### Backend Updates
- Added health check endpoint at `/health`
- Updated CORS policy for production domains
- Configured dynamic port binding for Railway
- Added proper environment variable handling
- Improved error handling and logging

### Environment Variables
Required environment variables for deployment:
```
EMAIL_SMTP_USERNAME=your_email@gmail.com
EMAIL_SMTP_PASSWORD=your_app_password
EMAIL_TO=your_email@gmail.com
ASPNETCORE_ENVIRONMENT=Production
```

## Testing
- [x] Local Docker build
- [x] Health check endpoint
- [x] CORS configuration
- [x] Environment variable handling
- [x] Static file serving

## Next Steps After Merge
1. Set up Railway project
2. Configure environment variables
3. Deploy application
4. Monitor health checks
5. Verify email functionality

## Security Considerations
- Environment variables properly secured
- CORS configured for specific domains
- No sensitive information in Docker images
- Health check endpoint added for monitoring 