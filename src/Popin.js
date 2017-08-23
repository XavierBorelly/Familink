import { Alert, Platform } from 'react-native';
import { labelPopInSignIn,
  button1LabelPopInSignIn,
  labelPopInForgotPassword,
  button1LabelPopInForgotPassword,
  labelPopInUpdateProfile,
  button1LabelPopInUpdateProfile,
  labelPopInDeleteContact,
  button1LabelPopInDeleteContact,
  labelActionPopinTitle,
  buttonLabelCancel,
} from './Util';

// Fonction privée qui construit une popin d'information, (pas d'actions a prendre)
function buildInformativePopin(titleString, infoString, okString)
{
  Alert.alert(
    titleString, infoString,
    [
      { text: okString },
    ],
  );
}

// Fonction privée qui construit une popin d'action (on peut accepter ou décliner l'action)
function buildActionPopin(infoString, declineString, okString, action)
{
  if (Platform.OS === 'android')
  {
    Alert.alert(
      labelActionPopinTitle, infoString,
      [
        { text: declineString },
        { text: '' },
        { text: okString, onPress: () => action() },
      ],
      { cancelable: false },
    );
  }

  if (Platform.OS === 'ios')
  {
    Alert.alert(
      labelActionPopinTitle, infoString,
      [
        { text: declineString },
        { text: okString, onPress: () => action() },
      ],
      { cancelable: false },
    );
  }
}

// --------- Si dessous les fonctions à utiliser pour faire apparaître une popin au choix ---------

export function showSignInPopIn()
{
  buildInformativePopin(labelPopInSignIn, button1LabelPopInSignIn);
}

export function showInformativePopin(titleString, infoString)
{
  buildInformativePopin(titleString, infoString);
}

export function showForgotPasswordPopIn(action)
{
  buildActionPopin(labelPopInForgotPassword, buttonLabelCancel,
    button1LabelPopInForgotPassword, action);
}

export function showUpdateProfilePopIn(action)
{
  buildActionPopin(labelPopInUpdateProfile, buttonLabelCancel,
    button1LabelPopInUpdateProfile, action);
}

export function showDeleteContactPopIn(action)
{
  buildActionPopin(labelPopInDeleteContact, buttonLabelCancel,
    button1LabelPopInDeleteContact, action);
}
