import md5 from 'react-native-md5';

export const regexPhone = /^(0|(\\+33)|(0033))[1-9][0-9]{8}$/;
export const regexPassword = /^[0-9]{4}$/;
/* eslint-disable */
export const regexMail = /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* eslint-enable */
export const buttonLabelConnection = 'Se connecter';
export const buttonLabelForgotPassword = 'Mot de passe oublié ?';
export const buttonLabelValidateForgotPassword = 'Envoyer une demande de mot de passe';
export const buttonLabelSignIn = "S'enregistrer";
export const buttonLabelSend = 'Envoyer';
export const buttonLabelValidation = 'Valider';
export const buttonLabelModification = 'Modifier';
export const buttonLabelDelete = 'Supprimer';
export const buttonLabelUpdate = 'Modifier';
export const buttonLabelCancel = 'Annuler';

export const placeholderNameMandatory = 'Nom *';
export const placeholderFirstnameMandatory = 'Prénom *';
export const placeholderPhoneNumberMandatory = 'Numéro de téléphone *';
export const placeholderEmailMandatory = 'Email *';
export const placeholderPasswordMandatory = 'Mot de passe *';
export const placeholderPasswordConfirmMandatory = 'Confirmation de mot de passe *';
export const placeholderName = 'Nom';
export const placeholderpassword = 'Mot de passe';
export const placeholderPhoneNumber = 'Numéro de téléphone';
export const placeholderSearchbar = 'Rechercher';

export const textLLabelName = 'Nom';
export const textLabelFirstname = 'Prénom';
export const textLabelEmail = 'Email';
export const textLabelProfil = 'Profil';
export const textLabelFamilink = 'Familink';
export const textLabelUrgency = 'Urgence';

export const checkBoxLabel = 'Se souvenir de moi';

export const headerSignIn = 'Connexion';
export const headerHome = 'Accueil';
export const headerProfile = 'Mon Profil';
export const headerContact = 'Repertoire';
export const headerconfigUrgency = 'Configuration d\'urgence';
export const headerContactCreate = 'Création contact';
export const headerModifyContact = 'Modification contact';
export const headerModifySignUp = 'S\'enregistrer';
export const headerForgotPassword = 'Mot de passe oublié';
export const labelSignOut = 'Deconnexion';
export const labelPopInCall = 'Appel en cours';

export const labelInformativePopinTitle = 'Information';
export const labelActionPopinTitle = 'Êtes-vous sûr ?';
export const labelUserCreated = 'Enregistrement réussi !';
export const labelUserModified = 'Profil modifié !';

export const labelPopInSignIn = 'Rappel: votre identifiant est votre numéro de téléphone.';
export const button1LabelPopInSignIn = "OK, j'ai compris.";

export const labelPopInForgotPassword = 'Un SMS va vous être envoyé avec votre mot de passe.';
export const button1LabelPopInForgotPassword = 'Envoyer';

export const labelPopInUpdateProfile = 'Voulez-vous changer vos informations personnelles ?\nAttention, changer votre numéro de téléphone, changera votre identifiant de connection.';
export const button1LabelPopInUpdateProfile = 'OK';

export const labelPopInDeleteContact = 'Voulez-vous supprimer ce contact ?';
export const button1LabelPopInDeleteContact = 'Supprimer';

export const labelContactCreatedSuccess = 'Contact crée avec succès !';
export const labelContactCreatedFail = 'Un problème est survenu lors de la création du contact !';
export const labelContactUpdatedSuccess = 'Contact modifié avec succès !';
export const labelContactUpdatedFail = 'Un problème est survenu lors de la modification du contact !';
export const labelContactDeletedSuccess = 'Contact supprimé avec succès !';
export const labelContactDeletedFail = 'Un problème est survenu lors de la suppression du contact !';

export const keyStorageContact = '@MyContacts:key';
export const keyRememberMeCheckBox = '@MonEtat:key';
export const keyUserOnLogin = '@MonIdentifiant:key';
export const urlWs = 'https://familink.cleverapps.io';

export const labelNoContact = 'Vous n\'avez aucun contact enregistré.';
export const labelLoading = 'Chargement des données...';

export const keyStorageToken = '@TokenAuthentification:key';

export const LabelConfirmForgotPassword = 'Un E-mail vous à été envoyé pour changer votre mot de passe.';

// const labelEmergency = 'URGENCE';
// const tagFamilink = 'Familink';
// const tagEmergency = 'Urgence';

// MODULE SPECIFIQUE
/* const labelHello = 'Bonjour'
                      + user.name
                      + ', on est le '
                      + agenda.date
                      + '. Il est '
                      + date.hour
                      + '.';
  */

// Fonction de Hashage pour le gravatar
export default class Utils
{
  static MD5(s)
  {
    return md5.hex_md5(s);
  }
}
