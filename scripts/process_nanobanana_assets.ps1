Add-Type -AssemblyName System.Drawing

$brainDir = "C:\Users\monte\.gemini\antigravity-ide\brain\8118e70d-2037-4ce2-9030-c2116055e08f"
$projectDir = "C:\Users\monte\Projeto de Jardy-ONG"

$emblemPath = Join-Path $brainDir "ine_brand_emblem_1789661881889.jpg"
if (-not (Test-Path $emblemPath)) {
    Write-Error "Emblem not found at $emblemPath"
    exit 1
}

$srcBmp = [System.Drawing.Bitmap]::FromFile($emblemPath)

function Resize-Image($src, $w, $h, $isMaskable = $false) {
    $dest = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    if ($isMaskable) {
        # Fill with dark teal background
        $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(10, 92, 70)) # #0A5C46
        $g.FillRectangle($brush, 0, 0, $w, $h)
        $brush.Dispose()
        # Draw with 12% padding
        $padX = [int]($w * 0.12)
        $padY = [int]($h * 0.12)
        $destW = $w - ($padX * 2)
        $destH = $h - ($padY * 2)
        $g.DrawImage($src, $padX, $padY, $destW, $destH)
    } else {
        $g.Clear([System.Drawing.Color]::Transparent)
        $g.DrawImage($src, 0, 0, $w, $h)
    }
    $g.Dispose()
    return $dest
}

# 1. Generate Favicons and App Icons
$sizes = @(
    @{ Name = "favicon-16x16.png"; Width = 16; Height = 16; Maskable = $false },
    @{ Name = "favicon-32x32.png"; Width = 32; Height = 32; Maskable = $false },
    @{ Name = "favicon-48x48.png"; Width = 48; Height = 48; Maskable = $false },
    @{ Name = "apple-touch-icon.png"; Width = 180; Height = 180; Maskable = $false },
    @{ Name = "icon-192.png"; Width = 192; Height = 192; Maskable = $false },
    @{ Name = "icon-512.png"; Width = 512; Height = 512; Maskable = $false },
    @{ Name = "maskable-192.png"; Width = 192; Height = 192; Maskable = $true },
    @{ Name = "maskable-512.png"; Width = 512; Height = 512; Maskable = $true }
)

foreach ($s in $sizes) {
    $outBmp = Resize-Image $srcBmp $s.Width $s.Height $s.Maskable
    $targetPath = Join-Path $projectDir $s.Name
    $outBmp.Save($targetPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $outBmp.Dispose()
    Write-Output "Generated $($s.Name)"
}

# Also save brand concept and high-res icon in assets
$brandDir = Join-Path $projectDir "assets\img\brand"
Copy-Item $emblemPath (Join-Path $brandDir "logo-concept.jpg") -Force
Write-Output "Updated logo-concept.jpg"

# 2. Build multi-resolution ICO file (favicon.ico)
$icoSizes = @(16, 32, 48)
$icoBitmaps = @()
$pngStreams = @()
foreach ($sz in $icoSizes) {
    $bmp = Resize-Image $srcBmp $sz $sz $false
    $ms = New-Object System.IO.MemoryStream
    $bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
    $pngStreams += $ms
    $icoBitmaps += $bmp
}

$icoFile = Join-Path $projectDir "favicon.ico"
$fs = [System.IO.File]::Create($icoFile)
$bw = New-Object System.IO.BinaryWriter($fs)

# ICONDIR header
$bw.Write([uint16]0) # Reserved
$bw.Write([uint16]1) # Type (1 for icon)
$bw.Write([uint16]($icoSizes.Count)) # Number of images

$offset = 6 + (16 * $icoSizes.Count)
for ($i = 0; $i -lt $icoSizes.Count; $i++) {
    $sz = $icoSizes[$i]
    $stream = $pngStreams[$i]
    $bytes = $stream.ToArray()

    $bw.Write([byte]$sz)
    $bw.Write([byte]$sz)
    $bw.Write([byte]0) # Color palette count
    $bw.Write([byte]0) # Reserved
    $bw.Write([uint16]1) # Color planes
    $bw.Write([uint16]32) # Bits per pixel
    $bw.Write([uint32]$bytes.Length) # Image size in bytes
    $bw.Write([uint32]$offset) # Offset to image data

    $offset += $bytes.Length
}

# Image data (PNG blocks)
for ($i = 0; $i -lt $icoSizes.Count; $i++) {
    $bytes = $pngStreams[$i].ToArray()
    $bw.Write($bytes)
    $pngStreams[$i].Dispose()
    $icoBitmaps[$i].Dispose()
}

$bw.Flush()
$bw.Close()
$fs.Close()
Write-Output "Generated favicon.ico (multi-resolution 16, 32, 48 PNG format)"

$srcBmp.Dispose()
