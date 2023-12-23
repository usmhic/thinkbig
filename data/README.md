# Data Folder - ThinkBig Project

## Description

Le dossier `data` dans le projet ThinkBig contient les scripts Python responsables de la collecte et du stockage des données provenant du capteur DHT22 sur le Raspberry Pi. Les données sont ensuite sécurisées et stockées dans la base de données BigchainDB.

## Structure du Dossier

```
thinkbig/
|-- data/
|   |-- bcdb.py
|   |-- dht22.py
|   `-- ...
`-- ...
```

## Scripts Python

### `dht22.py`

- Ce script récupère les données du capteur DHT22 (température et humidité) sur le Raspberry Pi.
- Les données sont ensuite immédiatement stockées dans la base de données BigchainDB en utilisant le script `bcdb.py`.

### `bcdb.py`

- Ce script gère l'interaction avec la base de données BigchainDB.
- Il contient des fonctions pour créer un actif (asset), créer une transaction et stocker les données dans BigchainDB.

## Configuration

- Assurez-vous que les dépendances sont installées en exécutant `pip install -r requirements.txt`.
- Configurez les paramètres spécifiques dans le fichier `.env` pour définir le pin GPIO du capteur DHT22, l'intervalle de lecture, et l'URL de BigchainDB.

## Utilisation

1. Exécutez `python dht22.py` pour lancer la collecte de données à partir du capteur DHT22.
2. Les données sont stockées dans BigchainDB immédiatement après chaque lecture.