import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { errorPopinTitle } from '../errors/ErrorStrings';
import { showInformativePopin } from '../Popin';

const $inputBorderColor = '#E0E4CC';
const $lightgrayColor = '#EEEEEE';
const $whiteColor = '#FFFFFF';

let errors = [];

const styles = StyleSheet.create({
  content: {
    backgroundColor: $lightgrayColor,
    flex: 0.8,
    width: '80%',
  },
  cell: {
    flex: 1,
  },
  text: {
    paddingLeft: 10,
    borderColor: $inputBorderColor,
    flex: 1,
    backgroundColor: $whiteColor,
  },
});

export default class ProfilePicker extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { canUpdate: false };
  }

  /* eslint-disable no-lone-blocks */
  ValidateProfile()
  {
    return (
      <View style={styles.content}>
        <View style={styles.cell}>
          <Text
            style={styles.text}
            onChangeText={text => this.setState({ name: text })}
            placeholder="Nom"
            maxLength={15}
          />
        </View>
        <View style={styles.cell}>
          <Text
            style={styles.text}
            onChangeText={text => this.setState({ firstName: text })}
            placeholder="Prenom"
            maxLength={15}
          />
        </View>
        <View style={styles.cell}>
          <Text
            style={styles.text}
            onChangeText={text => this.setState({ phone: text })}
            keyboardType="numeric"
            placeholder="Numéro de téléphone"
            maxLength={10}
          />
        </View>
        <View style={styles.cell}>
          <Text
            style={styles.text}
            onChangeText={text => this.setState({ email: text })}
            placeholder="Email"
            maxLength={50}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.cell}>
          <Button
            onPress={() =>
            {
              errors = [];
              let thereIsErrors = false;
              for (let i = 0; i < errors.length; i += 1)
              {
                if (errors[i] !== '')
                {
                  showInformativePopin(errorPopinTitle, errors[i]);
                  thereIsErrors = true;
                  break;
                }
              }
              if (!thereIsErrors)
              {
                // afficher les champs modifiables
                this.setState({ canUpdate: false });
              }
            }
            }
            title="Valider"
            color="#D35400"
            accessibilityLabel="Valider"
          />
        </View>
      </View>
    );
  }

  EditeProfile()
  {
    return (
      <View style={styles.content}>
        <View style={styles.cell}>
          <Text
            style={styles.text}
            onChangeText={text => this.setState({ name: text })}
            placeholder="Nom"
            maxLength={15}
          />
        </View>
        <View style={styles.cell}>
          <Text
            style={styles.text}
            onChangeText={text => this.setState({ firstName: text })}
            placeholder="Prenom"
            maxLength={15}
          />
        </View>
        <View style={styles.cell}>
          <Text
            style={styles.text}
            onChangeText={text => this.setState({ phone: text })}
            keyboardType="numeric"
            placeholder="Numéro de téléphone"
            maxLength={10}
          />
        </View>
        <View style={styles.cell}>
          <Text
            style={styles.text}
            onChangeText={text => this.setState({ email: text })}
            placeholder="Email"
            maxLength={50}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.cell}>
          <Button
            onPress={() =>
            {
              errors = [];
              let thereIsErrors = false;
              for (let i = 0; i < errors.length; i += 1)
              {
                if (errors[i] !== '')
                {
                  showInformativePopin(errorPopinTitle, errors[i]);
                  thereIsErrors = true;
                  break;
                }
              }
              if (!thereIsErrors)
              {
                // afficher les champs modifiables
                this.setState({ canUpdate: true });
              }
            }
            }
            title="Modifier"
            color="#D35400"
            accessibilityLabel="Modifier"
          />
        </View>
      </View>
    );
  }

  render()
  {
    const editRender = this.EditeProfile();
    const validRender = this.ValidateProfile();
    if (this.state.canUpdate === false)
    {
      return (
        <View>
          { editRender }
        </View>
      );
    }
    return (
      <View>
        { validRender }
      </View>
    );
  }
}
