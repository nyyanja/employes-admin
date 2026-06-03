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

## Exercice 6 — InternList

**Q6.1 : ReferenceField génère quel appel HTTP pour résoudre le manager ?**
ReferenceField génère un appel GET vers :
http://localhost:3002/employees/{id}
React-Admin optimise en regroupant plusieurs appels en un seul
via getMany : http://localhost:3002/employees?id=1&id=2&id=3

**Q6.2 : Que se passe-t-il si managerId ne correspond à aucun employé ?**
ReferenceField affiche une cellule vide sans erreur visible.
Aucun crash ne se produit, le champ est simplement laissé blanc.

## Exercice 7 — InternCreate & InternEdit

**Q7.1 : Quelle méthode HTTP est émise lors de la soumission de InternCreate ?**
Une requête POST est émise vers :
http://localhost:3002/interns
avec le body contenant les données du formulaire en JSON.

**Q7.2 : Quel hook utilisez-vous pour la validation conditionnelle de remuneration ?**
On utilise useWatch de react-hook-form.
Il permet de lire en temps réel la valeur du champ isRemunerate
sans déclencher un re-render complet du formulaire.
C'est nécessaire car la validation de stipend dépend dynamiquement
de la valeur d'un autre champ.

## Exercice 8 — InternShow & ManagerCard

**Q8.1 : Différence entre useGetOne et ReferenceField ?**
ReferenceField est un composant déclaratif qui gère automatiquement
l'affichage et le cache. Il est idéal pour afficher une donnée liée
dans une liste ou une fiche.
useGetOne est un hook impératif qui donne un contrôle total sur
le chargement (états isPending, error, data). Il est préférable
quand on veut personnaliser complètement l'affichage ou faire
des traitements conditionnels sur les données.

**Q8.2 : Que se passe-t-il si useGetOne reçoit id: undefined ?**
Sans l'option enabled, useGetOne envoie quand même une requête GET
vers http://localhost:3002/employees/undefined ce qui génère une
erreur 404. L'option enabled: !!intern?.managerId empêche l'appel
tant que l'id n'est pas disponible.

## Exercice 9 — InternsByManager & DepartmentStats

**Q9.1 : Différence entre useGetList et ReferenceManyField ?**
ReferenceManyField est déclaratif et lié au contexte React-Admin.
Il affiche automatiquement les données liées mais offre peu de
contrôle sur le rendu.
useGetList est impératif et indispensable quand on veut :
- Afficher les données hors d'un contexte Resource
- Faire des calculs sur les résultats
- Personnaliser complètement le rendu comme dans InternsByManager

**Q9.2 : Comment optimiser la requête de DepartmentStats ?**
On utilise pagination: { page: 1, perPage: 1 } pour ne récupérer
qu'un seul enregistrement. React-Admin retourne le total dans le
header X-Total-Count sans charger tous les employés, ce qui
minimise la quantité de données transférées.

## Exercice 10 — QuickStatusToggle

**Q10.1 : Quelle méthode HTTP useUpdate utilise-t-il par défaut ?**
useUpdate utilise PUT par défaut, qui remplace tout l'objet.
Pour forcer PATCH et ne mettre à jour que les champs modifiés,
on passe l'option : { meta: { method: 'PATCH' } }

**Q10.2 : Pourquoi previousData est-il nécessaire ?**
previousData est nécessaire pour permettre à React-Admin de faire
un rollback optimiste en cas d'erreur. Sans lui, si la requête
échoue, l'interface ne peut pas revenir à l'état précédent.
React-Admin lève une erreur si previousData est omis.

## Exercice 11 — useCreate & Formulaire rapide

**Q11.1 : Différence entre useCreate et le composant Create ?**
Le composant Create gère automatiquement la navigation, le
formulaire et les notifications. Il est lié au routing React-Admin.
useCreate est un hook bas niveau qui permet de créer une entrée
sans changer de page, depuis n'importe quel composant, comme
dans notre modale. Il donne un contrôle total sur le flux.

**Q11.2 : Comment gérer le rechargement après useCreate ?**
On utilise le hook useRefresh de React-Admin dans le callback
onSuccess de useCreate. Il force React-Admin à recharger la liste
courante sans navigation.

## Exercice 12 — Dashboard

**Q12.1 : Les 4 appels useGetList se font-ils en parallèle ou en séquence ?**
Ils se font en parallèle. React rend le composant une seule fois
et tous les hooks sont appelés simultanément. Chaque useGetList
déclenche sa propre requête HTTP indépendamment des autres.

**Q12.2 : Pourquoi perPage: 1 est préférable à perPage: 100 ?**
On n'a besoin que du total (X-Total-Count), pas des données elles-
mêmes. perPage: 1 minimise la taille de la réponse HTTP en ne
récupérant qu'un seul enregistrement au lieu de 100, tout en
obtenant le total correct dans les headers.