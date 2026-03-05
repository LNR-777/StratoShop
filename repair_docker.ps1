# Docker Repair Script for Windows (StratoShop)

Write-Host "Starting Docker Desktop Repair..." -ForegroundColor Cyan

# 1. Stop all Docker processes
Write-Host "Stopping Docker-related processes..."
Stop-Process -Name "Docker Desktop" -ErrorAction SilentlyContinue

# 2. Restart WSL
Write-Host "Restarting WSL..."
wsl --shutdown

# 3. Clear Docker Contexts (if any are corrupted)
Write-Host "Resetting Docker context..."
docker context use default

# 4. Clear Docker API Version override
Write-Host "Clearing API version overrides..."
[Environment]::SetEnvironmentVariable("DOCKER_API_VERSION", $null, "User")
[Environment]::SetEnvironmentVariable("DOCKER_API_VERSION", $null, "Process")

# 5. Instructions for User
Write-Host "`nRepair steps complete." -ForegroundColor Green
Write-Host "Please manually restart Docker Desktop from the Start Menu."
Write-Host "Wait until the 'Engine Running' green light appears, then try running the project again."
