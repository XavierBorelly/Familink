import { StyleSheet, Platform, Dimensions } from 'react-native';

export const appBackgroundColor = '#C0D8FF';
export const headerBackgroundColor = '#80B8FF';
export const headerBorderColor = '#5088CF';
export const headerTitleColor = '#01579B';
export const buttonColor = '#FB8C00';
export const buttonBorderColor = '#EF6C00';
export const buttonTextColor = 'white';
export const textInputFocusedBackgroundColor = '#DDFFEE';
export const textInputBorderColor = '#BBBBBB';
export const textInputBackgroundColor = '#FFFFFF';
export const textInputErrorBackgroundColor = '#FFDDEE';
export const textInputErrorBorderColor = '#e53935';
export const textColor = '#000000';

export const familinkStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appBackgroundColor,
  },

  headerContainer: {
    position: 'absolute',
    flexDirection: 'row',
    borderBottomWidth: 1.2,
    borderColor: headerBorderColor,
    top: (Platform.OS === 'ios') ? 20 : 0,
    height: 36,
    width: Dimensions.get('window').width,
    backgroundColor: headerBackgroundColor,
  },
  headerBurgerMenu: {
    width: 38,
    backgroundColor: headerBorderColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    position: 'absolute',
    left: 38,
    borderLeftWidth: 1,
    paddingLeft: 10,
    fontSize: 26,
    color: headerTitleColor,
  },
  headerText: {
    fontSize: 26,
    color: buttonTextColor,
    fontWeight: 'bold',
  },

  burgerMenuIcon: {
    width: (Platform.OS === 'ios') ? 48 : 24,
    height: (Platform.OS === 'ios') ? 48 : 24,
  },

  content: {
    backgroundColor: appBackgroundColor,
    flex: 0.8,
    width: '80%',
    borderRadius: 6,
  },

  item: {
    flex: 1,
    paddingTop: 2,
    paddingBottom: 2,
  },
  itemFocused: {

    flex: 2.4,
    paddingTop: 4,
    paddingBottom: 4,
  },

  textInput: {
    paddingLeft: 10,
    borderRadius: 6,
    borderColor: textInputBorderColor,
    flex: 1,
    backgroundColor: textInputBackgroundColor,
    borderWidth: 1,
  },
  textInputError: {
    paddingLeft: 10,
    borderRadius: 6,
    borderColor: textInputErrorBorderColor,
    flex: 1,
    backgroundColor: textInputErrorBackgroundColor,
    borderWidth: 1,
  },

  button: {
    borderRadius: 6,
    backgroundColor: buttonColor,
    flex: 1,
    borderColor: buttonBorderColor,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 28,
    color: buttonTextColor,
    fontWeight: 'bold',
  },

  pickerRow:
  {
    paddingTop: 2,
    paddingBottom: 2,
    flex: 1,
    flexDirection: 'row',
  },
  pickerItem: {
    backgroundColor: textInputBackgroundColor,
    flex: 1,
    borderColor: textInputBorderColor,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerItemFocused: {
    backgroundColor: textInputBorderColor,
    flex: 1,
    borderColor: textInputBorderColor,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerItemText: {
    fontSize: 16,
    color: textColor,
  },

  backButtonContainer:
  {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    height: 36,
    backgroundColor: headerBackgroundColor,
    borderTopWidth: 1.2,
    borderColor: headerBorderColor,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText:
  {
    width: Dimensions.get('window').width,
    textAlign: 'center',
    fontSize: 26,
  },
});
