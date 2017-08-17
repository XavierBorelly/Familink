Alert.alert(
  'Voulez-vous vraiment (action) ?', '',
  [
    {text: 'Annuler', onPress: () => console.log('Annuler Pressed')},
    {text: ''},
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ],
  { cancelable: false }
)
