# ThinkBig - Projet de Collecte de Données avec Raspberry Pi, DHT22, Blockchain, API FastAPI

## Description

Le projet ThinkBig vise à collecter des données environnementales à l'aide d'un capteur DHT22 connecté à un Raspberry Pi. Les données sont stockées de manière sécurisée dans une base de données de type blockchain (BigchainDB). De plus, un serveur FastAPI est mis en place pour fournir un endpoint API permettant d'accéder aux données stockées.

## Composants du Projet

1. **Capteur DHT22 et Raspberry Pi :** Mesure la température et l'humidité.
2. **Script Python (dht22.py) :** Récupère les données du capteur et les stocke dans BigchainDB immédiatement.
3. **Blockchain Database (BigchainDB) :** Stocke les données de manière sécurisée.
4. **Serveur FastAPI (fastapi_server.py) :** Fournit un endpoint API pour accéder aux données stockées.

## Structure du Code

```
thinkbig/
|-- data/
|   |-- bcdb.py
|   |-- dht22.py
|   `-- ...
|-- api/
|   |-- server.py
|   `-- ...
|-- .env.example
|-- README.md
|-- requirements.txt
`-- ...
```

## Configuration du Projet

1. **Matériel requis :** Raspberry Pi, capteur DHT22, et connexion Internet.
2. **Installation des dépendances :** Exécutez `pip install -r requirements.txt`.
3. **Configuration de BigchainDB :** Configurez les paramètres dans le fichier `.env` et assurez-vous que la base de données BigchainDB est accessible.
4. **Lancement du Projet :**
   - Démarrez le serveur FastAPI avec `python fastapi_server.py`.
   - Exécutez le script Python avec `python main.py` pour collecter et stocker les données.

## Utilisation de l'API FastAPI

- Accédez à l'API FastAPI à l'adresse [http://localhost:8000/data](http://localhost:8000/data) pour récupérer les dernières données stockées.

## Contribution au Projet

Si vous souhaitez contribuer, créez une nouvelle branche, effectuez vos modifications, puis soumettez une demande de tirage. Toutes les contributions sont les bienvenues !

## Auteur

[Votre Nom]

## Documentation

Consultez la documentation complète du projet pour plus de détails.

## License

Ce projet est sous licence [MIT License](LICENSE).

---

**Note :** Assurez-vous de personnaliser les sections avec les détails spécifiques de votre projet. Ajoutez des sections supplémentaires au besoin pour fournir plus d'informations aux utilisateurs du projet. Replacez `[Votre Nom]` par vos informations réelles.