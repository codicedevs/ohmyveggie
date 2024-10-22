#!/bin/bash

# Configuración
MONGO_URI="mongodb+srv://agustinmacazzaga:PZuJ288k4Kyn5vW5@ohmyveggie.4xaykot.mongodb.net"
BACKUP_DIR="backups"
FECHA=$(date +\%Y-\%m-\%d)

# Crear directorio si no existe
mkdir -p $BACKUP_DIR

# Hacer el backup
mongodump --uri="$MONGO_URI" --out="$BACKUP_DIR/backup-$FECHA"

# Eliminar backups más antiguos (mantener solo los últimos 10 backups)
find $BACKUP_DIR -type d -mtime +5 -exec rm -rf {} +

# Log del proceso (opcional)
echo "Backup realizado el $FECHA" >> $BACKUP_DIR/backup_log.txt
