Write-Host "--- StratoShop K8s Verification Helper ---" -ForegroundColor Cyan

# Check for kubectl
if (Get-Command kubectl -ErrorAction SilentlyContinue) {
    Write-Host "[OK] kubectl is installed." -ForegroundColor Green
    kubectl version --client
} else {
    Write-Host "[ERROR] kubectl is not found. Please install it to proceed with deployment." -ForegroundColor Red
    exit 1
}

# Check for cluster connection
Write-Host "`nChecking cluster connection..." -ForegroundColor Yellow
$clusterInfo = kubectl cluster-info 2> $null
if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Connected to Kubernetes cluster." -ForegroundColor Green
} else {
    Write-Host "[WARNING] No active Kubernetes cluster found. Start Docker Desktop (K8s enabled) or Minikube." -ForegroundColor DarkYellow
}

# Check for stratoshop namespace
Write-Host "`nChecking for 'stratoshop' namespace..." -ForegroundColor Yellow
$ns = kubectl get ns stratoshop --no-headers 2> $null
if ($ns) {
    Write-Host "[OK] 'stratoshop' namespace exists." -ForegroundColor Green
} else {
    Write-Host "[INFO] 'stratoshop' namespace does not exist yet. Run 'kubectl apply -f k8s/namespace.yaml' to create it." -ForegroundColor Cyan
}

Write-Host "--- End of Verification ---" -ForegroundColor Cyan
