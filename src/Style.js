import { StyleSheet, Platform, Dimensions } from 'react-native';

const appBackgroundColor = '#C0D8FF';
const headerBackgroundColor = '#80B8FF';
const headerBorderColor = '#5088CF';
const headerTitleColor = '#01579B';
const buttonColor = '#FB8C00';
const buttonBorderColor = '#EF6C00';
const buttonTextColor = 'white';
const buttonAddContactTextColor = '#45FF45';
const textInputBorderColor = '#BBBBBB';
const textInputBackgroundColor = '#FFFFFF';
const textInputErrorBackgroundColor = '#FFDDEE';
const textInputErrorBorderColor = '#e53935';
const textColor = '#000000';
const textFamilink = '#2ECC71';
const textEmergency = '#E74C3C';
const legendColor = '#454545';

export default StyleSheet.create({
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
  headerIcon: {
    width: 40,
    height: 36,
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
    position: 'absolute',
    top: (Platform.OS === 'ios') ? 56 : 36,
    bottom: 38,
    flex: 0.8,
    width: '80%',
    borderRadius: 6,
    overflow: 'hidden',
  },

  contentForgotPassword: {
    backgroundColor: appBackgroundColor,
    flex: 0.8,
    justifyContent: 'center',
    width: '80%',
    borderRadius: 6,
  },

  itemForgotPassword: {
    height: 80,
    paddingTop: 10,
    paddingBottom: 10,
  },

  itemEditContact: {
    height: 60,
    paddingTop: 4,
    paddingBottom: 4,
  },
  itemEditContactFocused: {
    height: 90,
    paddingTop: 4,
    paddingBottom: 4,
  },
  centerElement: {
    margin: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
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
  flexColumn: {
    flexDirection: 'column',
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
    borderRadius: 8,
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
    textAlign: 'center',
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
  pickerItemError: {
    backgroundColor: textInputErrorBackgroundColor,
    flex: 1,
    borderColor: textInputErrorBorderColor,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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

  bottomBar:
  {
    position: 'absolute',
    bottom: -10,
    width: Dimensions.get('window').width,
    height: 48,
    backgroundColor: headerBackgroundColor,
    borderTopWidth: 1.2,
    borderColor: headerBorderColor,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentList: {
    backgroundColor: appBackgroundColor,
    flex: 0.8,
    width: '95%',
    borderRadius: 6,
  },
  textFamilink: {
    backgroundColor: textFamilink,
  },
  textUrgency: {
    backgroundColor: textEmergency,
  },
  containerTag: {
    borderRadius: 20,
    textAlign: 'center',
    justifyContent: 'center',
    flex: 1,
    overflow: 'hidden',
  },
  textTag: {
    fontWeight: 'bold',
  },
  textItemContactContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  itemContactContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 70,
    alignItems: 'center',
    marginLeft: 10,
    margin: 2,
    borderWidth: 1,
    backgroundColor: textInputBackgroundColor,
  },
  imageContact: {
    width: 70,
    height: 70,
  },
  textContact: {
    textAlign: 'center',
    color: textColor,
  },
  abecedaire: {
    fontWeight: 'bold',
    fontSize: 25,
  },

  contentButtonAddContact: {
    flex: 0.15,
    flexDirection: 'row',
  },
  buttonAddContact: {
    marginLeft: 10,
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: buttonColor,
    borderColor: buttonBorderColor,
    borderWidth: 1.5,
  },
  buttonAddContactText: {
    fontSize: 28,
    color: buttonAddContactTextColor,
    fontWeight: 'bold',
  },
  gravatarContainer: {
    margin: 4,
  },
  legend: {
    color: legendColor,
    paddingTop: 30,
  },
});
