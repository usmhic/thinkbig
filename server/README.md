# Data Folder - ThinkBig Project

## Description

Le dossier `data` dans le projet ThinkBig contient les scripts Python responsables de la collecte et du stockage des données provenant du capteur DHT11 sur le Raspberry Pi. Les données sont ensuite envoiyer via socket vers le serveur.

## Structure du Dossier

```
thinkbig/
|-- data/
|   |-- main.py
|   `-- ...
`-- ...
```

## Scripts Python

### `main.py`

- Ce script récupère les données du capteur DHT11 (température et humidité) sur le Raspberry Pi.
- Les données sont ensuite immédiatement stockées dans la base de données BigchainDB en utilisant le script `bcdb.py`.

## Configuration

- Assurez-vous que les dépendances sont installées en exécutant `pip install -r requirements.txt`.
- Configurez les paramètres spécifiques dans le fichier `.env` pour définir le pin GPIO du capteur DHT11, l'intervalle de lecture, et l'URL de BigchainDB.

## Utilisation

1. Exécutez `python main.py` pour lancer la collecte de données à partir du capteur DHT11.
2. Les données sont stockées dans BigchainDB immédiatement après chaque lecture.