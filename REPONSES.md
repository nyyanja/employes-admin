# Réponses aux questions

## Exercice 1 — Configuration de l'application

**Q1.1 : Que représente le dataProvider dans React-Admin ? Quel est son rôle ?**
Le dataProvider est l'adaptateur entre React-Admin et l'API backend.
Il traduit chaque action de l'interface (lister, créer, modifier, supprimer)
en requête HTTP correspondante (GET, POST, PUT, DELETE).

**Q1.2 : Quelle requête HTTP est envoyée au chargement de la liste ?**
Une requête GET est envoyée vers :
http://localhost:3002/employees?_sort=id&_order=ASC&_start=0&_end=10

## Exercice 2 — Liste des employés

**Q2.1 : Que fait la prop rowClick="edit" sur le Datagrid ?**
Elle redirige l'utilisateur vers le formulaire de modification de l'employé
lorsqu'il clique sur une ligne du tableau.

**Q2.2 : Que se passe-t-il si on passe perPage à 2 ?**
La liste n'affiche plus que 2 employés par page et une pagination
apparaît pour naviguer entre les pages suivantes.

## Exercice 3 — Création d'un employé

**Q3.1 : Que se passe-t-il si on soumet le formulaire sans remplir le prénom ?**
Un message d'erreur "Obligatoire" apparaît sous le champ prénom
et le formulaire n'est pas soumis.

**Q3.2 : Que se passe-t-il si on saisit un salaire de 500 euros ?**
Un message d'erreur apparaît indiquant que la valeur minimum est 1500.
Le formulaire n'est pas soumis tant que la valeur est invalide.

## Exercice 4 — Modification d'un employé

**Q4.1 : Quelle méthode HTTP est utilisée lors de la sauvegarde d'une modification ?**
La méthode HTTP PUT est utilisée, vers l'URL :
http://localhost:3002/employees/{id}

**Q4.2 : À quel moment useRecordContext() est-il disponible ?**
Il est disponible uniquement à l'intérieur d'un composant enfant d'un
contexte React-Admin (Edit, Show, etc.). Si l'enregistrement n'est pas
encore chargé, il retourne undefined.

## Exercice 5 — Fiche détail

**Q5.1 : Quelle différence y a-t-il entre SimpleShowLayout et TabbedShowLayout ?**
SimpleShowLayout affiche tous les champs sur une seule page verticale.
TabbedShowLayout organise les champs en plusieurs onglets cliquables,
utile quand il y a beaucoup d'informations à afficher.