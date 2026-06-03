# ZEUS PRD v2.0 — Deploy Package

## File Inclusi

| File | Descrizione | Dimensione |
|------|-------------|------------|
| `index.html` | Pagina web cais.uno/PRD_zeus | 8 KB |
| `ZEUS_PRD_v2.0.pdf` | Product Requirements Document | ~150 KB |
| `zeus-demo-video.mp4` | Video demo 35 secondi, 8 scene | 1.6 MB |

## Istruzioni Deploy su VPS cais.uno

### Metodo 1: SCP (da terminale)
```bash
# Dalla directory zeus-prd-deploy/
scp -r ./* user@cais.uno:/var/www/cais.uno/PRD_zeus/
```

### Metodo 2: FTP/SFTP
1. Connetti a cais.uno via SFTP
2. Crea directory `/var/www/cais.uno/PRD_zeus/`
3. Uploada i 3 file

### Metodo 3: Rsync
```bash
rsync -avz --progress ./ user@cais.uno:/var/www/cais.uno/PRD_zeus/
```

### Configurazione Nginx (se necessario)
Aggiungi location block:
```nginx
location /PRD_zeus {
    alias /var/www/cais.uno/PRD_zeus;
    index index.html;
    
    # Cache per video e PDF
    location ~* \.(mp4|pdf)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

### Verifica
Apri `https://cais.uno/PRD_zeus` nel browser.

## Note
- Il video è ottimizzato per web (H.264, 1920x1080, 30fps)
- Il PDF è generato con ReportLab (layout professionale CAIS)
- La pagina è responsive (mobile-friendly)
