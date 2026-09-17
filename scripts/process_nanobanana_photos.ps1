Add-Type -AssemblyName System.Drawing

$brainDir = "C:\Users\monte\.gemini\antigravity-ide\brain\8118e70d-2037-4ce2-9030-c2116055e08f"
$projectDir = "C:\Users\monte\Projeto de Jardy-ONG"

function Resize-And-Save-Jpg($srcPath, $destPath, $targetWidth, $targetHeight, $quality = 88) {
    $src = [System.Drawing.Bitmap]::FromFile($srcPath)
    $dest = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $g.DrawImage($src, 0, 0, $targetWidth, $targetHeight)
    $g.Dispose()
    $src.Dispose()

    $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)

    $dir = Split-Path $destPath
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }

    $dest.Save($destPath, $encoder, $encoderParams)
    $dest.Dispose()
    $encoderParams.Dispose()
}

function Create-Photo-Svg($jpgPath, $svgPath, $width, $height, $title = "") {
    $bytes = [System.IO.File]::ReadAllBytes($jpgPath)
    $base64 = [Convert]::ToBase64String($bytes)
    $svgContent = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 $width $height" width="$width" height="$height" preserveAspectRatio="xMidYMid slice" role="img" aria-label="$title">
  <defs>
    <linearGradient id="photo_overlay" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(15, 36, 57, 0.05)" />
      <stop offset="100%" stop-color="rgba(15, 36, 57, 0.35)" />
    </linearGradient>
  </defs>
  <image href="data:image/jpeg;base64,$base64" width="$width" height="$height" preserveAspectRatio="xMidYMid slice" />
  <rect width="$width" height="$height" fill="url(#photo_overlay)" />
</svg>
"@
    [System.IO.File]::WriteAllText($svgPath, $svgContent, [System.Text.Encoding]::UTF8)
}

# Mapping of images
$images = @(
    @{
        Key = "hero-home"
        Src = Join-Path $brainDir "hero_home_doc_1789661901486.jpg"
        DestDir = Join-Path $projectDir "assets\img\hero"
        BaseName = "hero-home"
        Title = "Transformação Territorial e Comunitária no Entorno do DF"
    },
    @{
        Key = "educacao"
        Src = Join-Path $brainDir "project_educacao_1789661927184.jpg"
        DestDir = Join-Path $projectDir "assets\img\projects"
        BaseName = "educacao"
        Title = "Educação Integral e Letramento Digital"
    },
    @{
        Key = "alimentacao"
        Src = Join-Path $brainDir "project_alimentacao_1789661956639.jpg"
        DestDir = Join-Path $projectDir "assets\img\projects"
        BaseName = "alimentacao"
        Title = "Segurança Nutricional e Horta Agroecológica"
    },
    @{
        Key = "renda"
        Src = Join-Path $brainDir "project_renda_1789661992706.jpg"
        DestDir = Join-Path $projectDir "assets\img\projects"
        BaseName = "renda"
        Title = "Inclusão Produtiva e Empreendedorismo"
    },
    @{
        Key = "comunidade"
        Src = Join-Path $brainDir "project_comunidade_1789662031928.jpg"
        DestDir = Join-Path $projectDir "assets\img\projects"
        BaseName = "comunidade"
        Title = "Território e Convivência Comunitária"
    },
    @{
        Key = "volunteers-action"
        Src = Join-Path $brainDir "volunteers_action_1789662076049.jpg"
        DestDir = Join-Path $projectDir "assets\img\volunteers"
        BaseName = "volunteers-action"
        Title = "Ação Voluntária e Cidadania Ativa"
    },
    @{
        Key = "impact-families"
        Src = Join-Path $brainDir "impact_families_1789662124603.jpg"
        DestDir = Join-Path $projectDir "assets\img\impact"
        BaseName = "impact-families"
        Title = "Famílias Acolhidas e Impacto Social Transformador"
    },
    @{
        Key = "diretoria-executiva"
        Src = Join-Path $brainDir "team_diretoria_1789662178080.jpg"
        DestDir = Join-Path $projectDir "assets\img\team"
        BaseName = "diretoria-executiva"
        Title = "Governança e Diretoria Executiva do Instituto Nova Esperança"
    }
)

foreach ($item in $images) {
    if (-not (Test-Path $item.Src)) {
        Write-Warning "Source image not found: $($item.Src)"
        continue
    }

    $base = $item.BaseName
    $dir = $item.DestDir
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }

    # Save full res 1200px
    $jpg1200 = Join-Path $dir "$base-1200.jpg"
    Resize-And-Save-Jpg $item.Src $jpg1200 1200 675 88

    # Save 768px
    $jpg768 = Join-Path $dir "$base-768.jpg"
    Resize-And-Save-Jpg $item.Src $jpg768 768 432 85

    # Save 480px
    $jpg480 = Join-Path $dir "$base-480.jpg"
    Resize-And-Save-Jpg $item.Src $jpg480 480 270 82

    # Save default jpg
    $jpgDefault = Join-Path $dir "$base.jpg"
    Copy-Item $jpg1200 $jpgDefault -Force

    # Generate SVGs with embedded photo
    $svgDefault = Join-Path $dir "$base.svg"
    Create-Photo-Svg $jpg768 $svgDefault 800 450 $item.Title

    $svg1200 = Join-Path $dir "$base-1200.svg"
    Create-Photo-Svg $jpg1200 $svg1200 1200 675 $item.Title

    $svg768 = Join-Path $dir "$base-768.svg"
    Create-Photo-Svg $jpg768 $svg768 768 432 $item.Title

    $svg480 = Join-Path $dir "$base-480.svg"
    Create-Photo-Svg $jpg480 $svg480 480 270 $item.Title

    Write-Output "Successfully generated assets for [$base] in $dir"
}
